import { join } from "path";

import { MidwayAppInfo, MidwayConfig } from "@midwayjs/core";

export default (appInfo: MidwayAppInfo): MidwayConfig => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: "1673866289227_9786",
    koa: {
      port: 7001,
    },
    casbin: {
      modelPath: join(appInfo.appDir, "casbin/casbin_rbac_abac.conf"),
    },
    jwtMiddlewareWhiteList: [],
    jwt: {
      secret: process.env.JWT_SECURT,
      expiresIn: "1d",
    },
    passport: {
      session: false,
    },
  };
};
