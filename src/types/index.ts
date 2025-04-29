import * as line from "@line/bot-sdk";
import { ExportedHandlerScheduledHandler } from "@cloudflare/workers-types";

export type Bindings = {
  LINE_CHANNEL_ACCESS_TOKEN: string;
  LINE_CHANNEL_SECRET: string;
  LINE_GROUP_ID: string;
};

export type LineEvent = line.WebhookEvent;
export type LineClient = line.messagingApi.MessagingApiClient;
export type LineTextMessage = line.TextMessage;
export type LineReplyMessageRequest = line.messagingApi.ReplyMessageRequest;
export type LineMessageAPIResponseBase = line.MessageAPIResponseBase; 