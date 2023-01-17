import { UserVo } from "../vo/user.vo";

import { CasbinEnforcerService } from "@midwayjs/casbin";
import { Guard, IGuard, ILogger } from "@midwayjs/core";
import { Inject, Logger } from "@midwayjs/decorator";

@Guard()
export class CasbinGuard implements IGuard {
  @Inject()
  casbinEnforcerService: CasbinEnforcerService;

  @Logger()
  logger: ILogger;

  async canActivate(ctx, clz, methodName) {
    if (!ctx.state.user) return false;

    const user: UserVo = ctx.state.user;
    const username = user.username;
    this.logger.info(clz);
    this.logger.info(methodName);
    // return await this.casbinEnforcerService.enforce(ctx.user, "USER_ROLES", "read");
    return false;
  }
}
