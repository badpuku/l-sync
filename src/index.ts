import { Hono } from "hono";
import * as line from "@line/bot-sdk";

type Bindings = {
  LINE_CHANNEL_ACCESS_TOKEN: string;
  LINE_CHANNEL_SECRET: string;
  LINE_GROUP_ID: string;
};

const app = new Hono<{ Bindings: Bindings }>()

// ルートパスへのハンドラを追加
app.get('/', (c) => {
  return c.text('LINE Botサーバーが正常に動作しています');
});

const textEventHandler = async (
  client: line.messagingApi.MessagingApiClient,
  event: line.WebhookEvent,
): Promise<line.MessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  const { replyToken, message: { text } = {} } = event;

  const response: line.TextMessage = {
    type: 'text',
    text: `${text}と言われましても（${event.source.type === "group"? event.source.groupId : event.source.userId}）`,
  };

  const replyMessageRequest: line.messagingApi.ReplyMessageRequest = {
    replyToken: replyToken,
    messages: [response],
  };

  await client.replyMessage(replyMessageRequest);
};

// LINE Webhookのエンドポイント
// LINE で受け取ったメッセージをそのまま返し、groupIDを取得する
app.post('/webhook', async (c) => {
  const config: line.ClientConfig = {
    channelAccessToken: c.env.LINE_CHANNEL_ACCESS_TOKEN,
  };
  const client = new line.messagingApi.MessagingApiClient(config);
  line.middleware({ channelSecret: c.env.LINE_CHANNEL_SECRET });

  const events: line.WebhookEvent[] = await c.req.json().then((data) => data.events);

  await Promise.all(
    events.map(async (event: line.WebhookEvent) => {
      try {
        await textEventHandler(client, event);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err);
        }
        return c.status(500);
      }
    }),
  );

  return c.status(200);
});

app.post("/api/v1/line/push", async (c) => {
  try {
    const text = "push message のテスト";

    const res = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${c.env.LINE_CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        to: c.env.LINE_GROUP_ID,
        messages: [
          {
            type: 'text',
            text: text
          }
        ]
      })
    })

    if (!res.ok) {
      const error = await res.json()
      console.error('LINE API error:', error)
      return c.json({ status: 'LINE API error', message: error }, 500)
    }

    return c.json({ status: 'success' }, 200)
  } catch (error) {
    console.error('Internal server error:', error)
    return c.json({ status: 'error', message: error }, 500)
  }
})

export default app
