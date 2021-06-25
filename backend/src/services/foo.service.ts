import { injectable } from "inversify";

@injectable()
export class FooService {
  public hello() {
    return { msg: "Hello from Foo!" };
  }
}
