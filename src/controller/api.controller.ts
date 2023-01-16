import { UserService } from "../service/user.service";

import { Controller, Get, Inject, Query } from "@midwayjs/decorator";
import { Context } from "@midwayjs/koa";

@Controller("/api")
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get("/get_user")
  async getUser(@Query("uid") uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: "OK", data: user };
  }
}
