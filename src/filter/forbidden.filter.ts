import Res from "../vo/res.vo";

import { HttpStatus, MidwayHttpError, httpError } from "@midwayjs/core";
import { Catch } from "@midwayjs/decorator";
import { Context } from "@midwayjs/koa";

@Catch(httpError.ForbiddenError)
export default class ForbiddenFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    ctx.logger.error(err);
    ctx.status = HttpStatus.FORBIDDEN;
    ctx.body = Res.error("授权失败");
  }
}
