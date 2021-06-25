import { Container } from "inversify";

// Controllers
import "./controllers/foo.controller";

export const container = new Container({ autoBindInjectable: true });
