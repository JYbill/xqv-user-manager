/**
 * @Description: 校验用户安全环境的中间件
 * @Author: 小钦var
 * @Date: 2023/1/18 18:23
 */
import { ProjectError } from "../filter/project.filter";
import { UserService } from "../service/user.service";
import { UserVo } from "../vo/user.vo";

import { HttpStatus, IMiddleware } from "@midwayjs/core";
import { Config, Middleware } from "@midwayjs/decorator";
import { Context, NextFunction } from "@midwayjs/koa";

@Middleware()
export class ValidateMiddleware implements IMiddleware<Context, NextFunction> {
  @Config("jwtMiddlewareWhiteList")
  ignoreWhiteList: string[];

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const token = ctx.headers["authorization"].split(" ")[1];
      const user: UserVo = ctx.state.user;
      const userService = await ctx.requestContext.getAsync<UserService>(UserService);
      const flag = await userService.validateTokenByUid(user.id, token);
      if (!flag) throw new ProjectError("用户token与实际存储不一致，可能密钥被盗取");
      const ret = await next();
      return ret;
    };
  }

  static getName(): string {
    return "validator";
  }

  /**
   * 忽略配置白名单
   * @param ctx
   * @returns
   */
  ignore(ctx: Context): boolean {
    return this.ignoreWhiteList.includes(ctx.path);
  }
}
