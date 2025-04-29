import * as line from "@line/bot-sdk";
import { Bindings } from "../types";

export const createLineConfig = (env: Bindings): line.ClientConfig => {
  return {
    channelAccessToken: env.LINE_CHANNEL_ACCESS_TOKEN,
  };
};

export const getMiddlewareConfig = (env: Bindings) => {
  return { 
    channelSecret: env.LINE_CHANNEL_SECRET 
  };
}; 