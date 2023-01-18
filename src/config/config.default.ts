import { V1 } from "../enum/index.enum";
import { join } from "path";

import { MidwayAppInfo, MidwayConfig } from "@midwayjs/core";

export type CasbinGuardType = {
  debug: boolean;
};
export default (appInfo: MidwayAppInfo): MidwayConfig => {
  const config = Object.create({
    keys: "1673866289227_9786",
    koa: {
      port: 7001,
    },
    casbin: {
      modelPath: join(appInfo.appDir, "casbin/model.conf"),
    },
    jwtMiddlewareWhiteList: [V1.User + "/register", V1.User + "/login"],
    jwt: {
      secret: process.env.JWT_SECURT,
      expiresIn: "1d",
    },
    passport: {
      session: false,
    },
  });

  // 自定义配置项
  // casbin守卫配置
  const casbinGuardConfig: CasbinGuardType = {
    debug: false, // debug打印模式
  };
  config.casbinGuard = casbinGuardConfig;
  return config;
};
