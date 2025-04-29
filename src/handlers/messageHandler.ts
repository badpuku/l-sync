import { LineClient, LineEvent } from "@/types";
import { handleTextMessage } from "@/services/messageService";

export const processWebhookEvent = async (
  client: LineClient,
  event: LineEvent
): Promise<void> => {
  try {
    await handleTextMessage(client, event);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('メッセージ処理エラー:', err);
    }
    throw err;
  }
}; 