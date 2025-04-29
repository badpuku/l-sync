import { LineClient, LineEvent, LineMessageAPIResponseBase } from "@/types";
import { sendReplyMessage } from "@/services/lineClient";

export const handleTextMessage = async (
  client: LineClient,
  event: LineEvent
): Promise<LineMessageAPIResponseBase | undefined> => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  const { replyToken, message: { text } = {} } = event;
  const sourceInfo = event.source.type === "group" ? event.source.groupId : event.source.userId;
  
  const responseText = `${text}と言われましても（${sourceInfo}）`;
  
  await sendReplyMessage(client, replyToken, responseText);
}; 