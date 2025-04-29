import * as line from "@line/bot-sdk";
import { Bindings, LineClient, LineTextMessage, LineReplyMessageRequest } from "@/types";
import { createLineConfig } from "@/config/line";

export const createLineClient = (env: Bindings): LineClient => {
  const config = createLineConfig(env);
  return new line.messagingApi.MessagingApiClient(config);
};

export const sendReplyMessage = async (
  client: LineClient,
  replyToken: string,
  text: string
): Promise<void> => {
  const message: LineTextMessage = {
    type: 'text',
    text: text,
  };

  const replyMessageRequest: LineReplyMessageRequest = {
    replyToken: replyToken,
    messages: [message],
  };

  await client.replyMessage(replyMessageRequest);
};

export const sendPushMessage = async (
  env: Bindings,
  text: string,
  to?: string
): Promise<Response> => {
  const targetId = to || env.LINE_GROUP_ID;
  
  const response = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      to: targetId,
      messages: [
        {
          type: 'text',
          text: text
        }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('LINE API error:', error);
    throw new Error(`LINE API error: ${JSON.stringify(error)}`);
  }

  return response;
}; 