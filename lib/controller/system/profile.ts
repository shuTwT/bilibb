import type { Context } from "koa";
import { body, routeConfig, z } from "koa-swagger-decorator";
import { SystemService } from "../../service/systemService";

export class ProfileController {
  systemService: SystemService;
  constructor() {
    this.systemService = new SystemService();
  }
  @routeConfig({
    method: "get",
    path: "/user/profile",
    summary: "user profile",
    tags: ["USER"],
    operationId: "UserProfile",
  })
  public profile(ctx: Context, args: any) {
    ctx.body = {
      message: "create",
      id: "123",
    };
  }
}
