import { controller, httpGet } from "inversify-express-utils";
import { FooService } from "../services/foo.service";

@controller("/foo")
export class FooController {
  constructor(private fooService: FooService) {}

  @httpGet("/")
  public async foo() {
    return this.fooService.hello();
  }
}
