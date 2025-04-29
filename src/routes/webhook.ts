import { Hono } from "hono";
import * as line from "@line/bot-sdk";
import { Bindings } from "../types";
import { createLineClient } from "../services/lineClient";
import { getMiddlewareConfig } from "../config/line";
import { processWebhookEvent } from "../handlers/messageHandler";
import { logger } from "../utils/logger";

export const webhookRouter = new Hono<{ Bindings: Bindings }>();

// LINE Webhookのエンドポイント
webhookRouter.post('/', async (c) => {
  const client = createLineClient(c.env);
  line.middleware(getMiddlewareConfig(c.env));

  try {
    const events: line.WebhookEvent[] = await c.req.json().then((data) => data.events);

    await Promise.all(
      events.map(async (event: line.WebhookEvent) => {
        try {
          await processWebhookEvent(client, event);
        } catch (err: unknown) {
          logger.error("Webhook処理中にエラーが発生しました", err);
          return c.status(500);
        }
      }),
    );

    return c.status(200);
  } catch (error) {
    logger.error("Webhookリクエスト処理中にエラーが発生しました", error);
    return c.status(500);
  }
}); 