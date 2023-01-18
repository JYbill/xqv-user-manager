import { CasbinGuardType } from "../config/config.default";
import { UserVo } from "../vo/user.vo";

import { CasbinEnforcerService } from "@midwayjs/casbin";
import { Guard, IGuard, ILogger } from "@midwayjs/core";
import { Config, Inject, Logger } from "@midwayjs/decorator";
import { Context } from "@midwayjs/koa";

@Guard()
export class CasbinGuard implements IGuard {
  @Inject()
  casbinEnforcerService: CasbinEnforcerService;

  @Logger()
  logger: ILogger;

  @Config("casbinGuard")
  casbinGuard: CasbinGuardType;

  async canActivate(ctx: Context, clz, methodName) {
    if (!ctx.state.user) return false;

    const enforcer = this.casbinEnforcerService;
    const user = ctx.state.user;
    const httpMethod = ctx.method;
    const uri = ctx.url;

    if (this.casbinGuard.debug) {
      this.logger.info("user: ");
      this.logger.info(user);
      this.logger.info("url: ");
      this.logger.info(uri);
      this.logger.info("method: ");
      this.logger.info(httpMethod);
    }

    // 鉴权
    const hasPermission = await enforcer.enforce(user, uri, httpMethod);

    // 鉴权结果
    if (this.casbinGuard.debug) {
      this.logger.info("casbin guard permission res: " + hasPermission);
    }
    return hasPermission;
  }
}
