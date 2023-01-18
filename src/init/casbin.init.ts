import { PrismaServiceFactory } from "../ioc/prismaFactory";
import { PrismaAdapter } from "casbin-prisma-adapter";

import { CasbinEnforcerService } from "@midwayjs/casbin";
import { Autoload, ILogger, IMidwayApplication, Init } from "@midwayjs/core";
import { App, Inject, Logger } from "@midwayjs/decorator";

@Autoload()
export default class CasbinInit {
  @Inject()
  enforcer: CasbinEnforcerService;

  @Inject("prisma")
  prisma: PrismaServiceFactory["prisma"];

  @Logger()
  logger: ILogger;

  @App()
  app: IMidwayApplication;

  @Init()
  async init() {
    const enforce: CasbinEnforcerService = this.enforcer;
    const adaptor = (await PrismaAdapter.newAdapter()) as any;
    // 设置enforce
    this.enforcer.setAdapter(adaptor);
    // 获取所有权限，避免初始化重复save多条相同记录的问题
    await this.enforcer.loadPolicy();

    // 授权策略
    const casbinAsync = [
      // g 角色继承
      enforce.addNamedGroupingPolicy("g", "xiaoqinvar", "MANAGER"),

      // g2 权限继承
      enforce.addNamedGroupingPolicy("g2", "/v1/user/all", "userGetApi"),

      // p 角色:权限关系
      enforce.addNamedPolicy("p", "MANAGER", "userGetApi", "GET"),
    ];
    await Promise.all(casbinAsync);
    this.logger.info("Casbin is loaded.");
  }
}
