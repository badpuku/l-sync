import { ExportedHandlerScheduledHandler } from "@cloudflare/workers-types";
import { sendPushMessage } from "../services/lineClient";
import { Bindings } from "../types";

export const handleScheduled: ExportedHandlerScheduledHandler = async (event, env, ctx) => {
  // スケジュール実行時に何かアクションを起こしたい場合はここに実装
  // 例: 定期的なメッセージ送信
  // ctx.waitUntil(
  //   sendPushMessage(env as Bindings, "定期実行メッセージです")
  //     .catch(error => console.error("スケジュール送信エラー:", error))
  // );
  
  ctx.waitUntil(console.log("スケジュールタスク実行:", new Date().toISOString()));
}; 