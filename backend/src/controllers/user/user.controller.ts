import cuid from "cuid";
import { controller, httpGet } from "inversify-express-utils";

@controller("/users")
export class UserController {
  @httpGet("/")
  public async getNewUserId() {
    return {
      id: `user-${cuid()}-${process.pid}-${Math.floor(
        Math.random() * 10000
      )}-${Date.now()}`,
    };
  }
}
