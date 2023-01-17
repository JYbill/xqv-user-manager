import { V1 } from "../enum/index.enum";
import { UserService } from "../service/user.service";
import { UserVo } from "../vo/user.vo";
import BaseController from "./base.controller";

import { Body, Controller, Get, Inject, Post, Query } from "@midwayjs/decorator";
import { Validate } from "@midwayjs/validate";

@Controller(V1.User)
export class UserController extends BaseController {
  @Inject()
  userService: UserService;

  @Post("/register")
  @Validate()
  async getUser(@Body() user: UserVo) {
    this.logger.info("controller user", user);
    this.logger.info(!this.ctx.isAuthenticated() === this.ctx.isUnauthenticated());
    return "ok";
  }
}
