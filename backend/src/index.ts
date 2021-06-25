import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./di";
import { json, urlencoded } from "body-parser";

function bootstrap() {
  const server = new InversifyExpressServer(container, null, {
    rootPath: "/api",
  });

  server.setConfig((app) => {
    app.use(json());
    app.use(urlencoded({ extended: true }));
  });

  const app = server.build();

  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`Server listening on ${port}`);
  });
}

bootstrap();
