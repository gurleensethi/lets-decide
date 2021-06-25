import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import * as express from "express";

@injectable()
export class UserIdMiddleware extends BaseMiddleware {
  handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("user-")) {
      res.statusCode = 401;
      res.json({
        message: "Please provide a user id to continue using the API.",
      });
      return;
    }

    req.user = authorization;

    return next();
  }
}
