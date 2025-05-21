import { ExportedHandlerScheduledHandler } from "@cloudflare/workers-types";
import { sendPushMessage } from "@/services/lineClient";
import { Bindings } from "@/types";
import { logger } from "@/utils/logger";

export const handleScheduled: ExportedHandlerScheduledHandler<Bindings> = async (event, env, ctx) => {
  const RESERVATION_SYSTEM_URL = env.RESERVATION_SYSTEM_URL || "https://yoyaku.harp.lg.jp/sapporo/";
  const ACCOUNT_INFORMATION_URL = env.ACCOUNT_INFORMATION_URL || "https://docs.google.com/spreadsheets/d/1nuvHqtouPXhKfUuETSYyQH03r42nT1j6fYexyvtmp_Y/htmlview";

  // メッセージを動的に生成
  const MONTHLY_GYM_RESERVATION_MESSAGE_DAY_20 = `【体育館抽選】\n体育館抽選の期間中です。(20~22日)\n担当のアカウントで体育館の抽選申し込みを行なってください。\n20日は抽選しているサークル数が少なく、どれぐらいの倍率か予想がつけにくいので注意が必要です。\n\n予約システム：${RESERVATION_SYSTEM_URL} \nアカウント情報：${ACCOUNT_INFORMATION_URL}`;
  const MONTHLY_GYM_RESERVATION_MESSAGE_DAY_21 = `【体育館抽選】担当のアカウントで体育館の抽選申し込みを行なってください。\n\n予約システム：${RESERVATION_SYSTEM_URL} \nアカウント情報：${ACCOUNT_INFORMATION_URL}`;
  const MONTHLY_GYM_RESERVATION_MESSAGE_DAY_22 = `【体育館抽選】本日が体育館抽選の締切日です\n体育館の抽選忘れがないか確認してください。\n\n予約システム：${RESERVATION_SYSTEM_URL} \nアカウント情報：${ACCOUNT_INFORMATION_URL}`;
  const MONTHLY_GYM_RESERVATION_MESSAGE_DAY_25 = `【抽選結果】体育館の抽選結果を確認し、確定してください。\n\n予約システム：${RESERVATION_SYSTEM_URL} \nアカウント情報：${ACCOUNT_INFORMATION_URL}`;
  
  switch (event.cron) {
    case "0 0 20 * *":
      ctx.waitUntil(
        sendPushMessage(env, MONTHLY_GYM_RESERVATION_MESSAGE_DAY_20)
          .catch(error => logger.error("スケジュール送信エラー:", error))
      );
      break;
    case "0 0 21 * *":
      ctx.waitUntil(
        sendPushMessage(env, MONTHLY_GYM_RESERVATION_MESSAGE_DAY_21)
          .catch(error => logger.error("スケジュール送信エラー:", error))
      );
      break;
    case "0 0 22 * *":
      ctx.waitUntil(
        sendPushMessage(env, MONTHLY_GYM_RESERVATION_MESSAGE_DAY_22)
          .catch(error => logger.error("スケジュール送信エラー:", error))
      );
      break;
    case "0 0 25 * *":
      ctx.waitUntil(
        sendPushMessage(env, MONTHLY_GYM_RESERVATION_MESSAGE_DAY_25)
          .catch(error => logger.error("スケジュール送信エラー:", error))
      );
      break;
    default:
      logger.info("スケジュールが見つかりませんでした。");
      break;
  }
}; 