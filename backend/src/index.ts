import "source-map-support/register";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./di";
import { json, urlencoded } from "body-parser";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "./errors/http.error";

function bootstrap() {
  const server = new InversifyExpressServer(container, null, {
    rootPath: "/api",
  });

  server.setConfig((app) => {
    app.use(json());
    app.use(urlencoded({ extended: true }));
  });

  server.setErrorConfig((app) => {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof HttpError) {
        res.statusCode = err.statusCode;
        res.json({ message: err.message });
        return;
      }

      console.log(err);

      res.statusCode = 500;
      res.json({ message: "Interval Server Error!", error: err });
    });
  });

  const app = server.build();

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}

bootstrap();
