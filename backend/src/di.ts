import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";

// Controllers
import "./controllers/foo.controller";
import "./controllers/question/question.controller";
import "./controllers/user/user.controller";
import { TYPES } from "./types";

// Middleware
import { UserIdMiddleware } from "./middleware/userId.middleware";

export const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

const prismaClient = new PrismaClient();

container.bind<PrismaClient>(TYPES.PrismaClient).toConstantValue(prismaClient);
container.bind<UserIdMiddleware>(TYPES.UserIdMiddleware).to(UserIdMiddleware);
