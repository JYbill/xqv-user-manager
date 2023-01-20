import { V1 } from "../enum/index.enum";
import { ProjectError } from "../filter/project.filter";
import { CasbinGuard } from "../guard/casbin.guard";
import { UserService } from "../service/user.service";
import { UserVo } from "../vo/user.vo";
import BaseController from "./base.controller";

import { Body, Controller, Get, Headers, Inject, Post, UseGuard } from "@midwayjs/decorator";
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

  @Post("/fresh")
  async fresh(@Body("freshToken") freshToken: string, @Headers("Authorization") webToken: string) {
    if (freshToken.trim().length <= 0 || webToken.trim().length <= 0) {
      throw new ProjectError("/fresh接口，参数传递有误");
    }
    webToken = webToken.replace("Bearer ", "");
    freshToken = freshToken.replace("Bearer ", "");
    const exist = await this.userService.validateTokens(freshToken, webToken);
    if (!exist) {
      throw new ProjectError("刷新token、登陆token不一致, 请联系开发人员");
    }

    const userPayload = await this.userService.parseJWT(webToken);
    return await this.userService.createToken(userPayload);
  }

  @UseGuard(CasbinGuard)
  @Get("/all")
  async getAllUsers() {
    return await this.userService.findAll();
  }
}
