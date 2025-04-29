import { Hono } from "hono";
import { Bindings } from "@/types";
import { sendPushMessage } from "@/services/lineClient";
import { logger } from "@/utils/logger";
import { createErrorResponse, createSuccessResponse } from "@/utils/helpers";

export const pushRouter = new Hono<{ Bindings: Bindings }>();

// プッシュメッセージ送信API
pushRouter.post("/", async (c) => {
  try {
    const { message, to } = await c.req.json();
    const text = message || "push message のテスト";

    await sendPushMessage(c.env, text, to);
    logger.info(`プッシュメッセージを送信しました: ${text}`);

    return createSuccessResponse();
  } catch (error) {
    logger.error("プッシュメッセージ送信中にエラーが発生しました", error);
    return createErrorResponse(`プッシュメッセージ送信エラー: ${error instanceof Error ? error.message : String(error)}`);
  }
}); 