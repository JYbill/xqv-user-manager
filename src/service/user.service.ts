import { ProjectError } from "../filter/project.filter";
import { UserVo } from "../vo/user.vo";
import BaseService from "./base.service";
import { User } from "@prisma/client";
import * as CryptoJS from "crypto-js";

import { Inject, Provide } from "@midwayjs/decorator";
import { JwtService } from "@midwayjs/jwt";

@Provide()
export class UserService extends BaseService {
  @Inject()
  jwt: JwtService;

  /**
   * 创建用户，并返回不包含盐、密码的用户实体
   * @return {Promise<User>} 创建成功的用户信息
   */
  async createUser(user: UserVo) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const pwd = CryptoJS.SHA256(user.password + salt.toString());
    user.salt = salt.toString();
    user.password = pwd.toString();
    const createUser = await this.extendPrisma.user.create({
      data: user,
    });
    const excludeUser = this.extendPrisma.user.excludePersonal(createUser);
    return excludeUser;
  }

  /**
   * 根据用户名获取用户
   * @param username
   * @return {Promise<User>} 用户信息
   */
  async findUserByUName(username: string): Promise<User> {
    return await this.extendPrisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  /**
   * 根据id获取用户
   * @param id uid
   */
  async findUserById(id: string) {
    const findUser = await this.extendPrisma.user.findUnique({
      where: { id },
    });
    const excludeUser = this.extendPrisma.user.exclude(findUser, ["username"]);
    return excludeUser;
  }

  /**
   * 根据id获取用户（⚠️ 有密码、盐、token）
   * @param id
   * @param token web token字符串
   */
  async validateTokenByUid(id: string, token: string): Promise<boolean> {
    const findUser = await this.extendPrisma.user.findUnique({
      where: { id },
    });
    return findUser.webToken === token;
  }

  /**
   * 账号密码登陆
   * @param user
   */
  async loginByPwd(user: UserVo) {
    const findUser = await this.extendPrisma.user.findUnique({
      where: {
        username: user.username,
      },
    });
    const pwd = CryptoJS.SHA256(user.password + findUser.salt);
    // this.logger.info(pwd.toString());
    // this.logger.info(findUser);
    if (pwd.toString() !== findUser.password) {
      throw new ProjectError("账号密码错误");
    }
    // 提出隐私
    let excludeUser = this.extendPrisma.user.exclude(findUser, ["gmtCreate", "gmtModified"]);
    excludeUser = this.extendPrisma.user.excludePersonal(findUser);

    // 记录token
    const token = this.jwt.signSync(excludeUser);
    const updUser = await this.extendPrisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        webToken: token,
      },
    });
    return token;
  }
}
