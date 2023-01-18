import { V1 } from "../enum/index.enum";
import { ProjectError } from "../filter/project.filter";
import { CasbinGuard } from "../guard/casbin.guard";
import { UserService } from "../service/user.service";
import { UserVo } from "../vo/user.vo";
import BaseController from "./base.controller";

import { Body, Controller, Get, Inject, Post, Query, UseGuard } from "@midwayjs/decorator";
import { JwtService } from "@midwayjs/jwt";
import { Validate } from "@midwayjs/validate";

@Controller(V1.User)
export class UserController extends BaseController {
  @Inject()
  userService: UserService;

  @Post("/register")
  @Validate()
  async getUser(@Body() user: UserVo) {
    const findUser = await this.userService.findUserByUName("xqv");
    if (findUser) {
      throw new ProjectError("用户名已存在");
    }
    // 注册
    const createUser = await this.userService.createUser(user);
    return createUser;
  }

  @Post("/login")
  async login(@Body() user: UserVo) {
    const findUser = await this.userService.findUserByUName(user.username);
    if (!findUser) {
      throw new ProjectError("用户名不存在");
    }
    const token = await this.userService.loginByPwd(user);
    return token;
  }

  @UseGuard(CasbinGuard)
  @Get("/all")
  async getAllUsers() {
    return "ok.";
  }
}
