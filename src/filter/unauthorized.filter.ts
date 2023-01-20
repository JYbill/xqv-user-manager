import Res from "../vo/res.vo";

import { HttpStatus, MidwayHttpError, httpError } from "@midwayjs/core";
import { Catch } from "@midwayjs/decorator";
import { Context } from "@midwayjs/koa";

@Catch(httpError.UnauthorizedError)
export default class UnAuthorizedFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.logger.error(err);
    ctx.status = HttpStatus.UNAUTHORIZED;
    ctx.body = Res.error("认证失败或jwt超时", HttpStatus.UNAUTHORIZED);
  }
}
