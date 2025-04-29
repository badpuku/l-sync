import { Hono } from "hono";
import { Bindings } from "@/types";
import { webhookRouter } from "@/routes/webhook";
import { pushRouter } from "@/routes/api/push";
import { testRouter } from "@/routes/api/test";
import { handleScheduled } from "@/handlers/scheduledHandler";

const app = new Hono<{ Bindings: Bindings }>();

// ルートパスへのハンドラを追加
app.get('/', (c) => {
  return c.text('LINE Botサーバーが正常に動作しています');
});

// ルーターをマウント
app.route('/webhook', webhookRouter);
app.route('/api/v1/line/push', pushRouter);
app.route('/api/v1/test', testRouter);

export default {
  fetch: app.fetch,
  scheduled: handleScheduled,
};
