import { Hono } from "hono";
import { Bindings } from "../../types";
import { logger } from "../../utils/logger";
import { createErrorResponse, createSuccessResponse } from "../../utils/helpers";

export const testRouter = new Hono<{ Bindings: Bindings }>();

// テスト用エンドポイント
testRouter.post("/", async (c) => {
  try {
    const { message } = await c.req.json();
    logger.info("テストメッセージを受信:", message);
    
    return createSuccessResponse();
  } catch (error) {
    logger.error("テストエンドポイントでエラーが発生しました", error);
    return createErrorResponse(`内部エラー: ${error instanceof Error ? error.message : String(error)}`);
  }
}); 