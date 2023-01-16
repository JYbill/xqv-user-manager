import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from "./middleware/report.middleware";
import { join } from "path";

import { App, Configuration } from "@midwayjs/decorator";
import * as info from "@midwayjs/info";
import * as koa from "@midwayjs/koa";
import * as validate from "@midwayjs/validate";

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ["local"]
    }
  ],
  importConfigs: [join(__dirname, "./config")]
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
