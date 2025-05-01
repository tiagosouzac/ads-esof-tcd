import { Env } from "../config/env";
import { App } from "./app";

const main = async () => {
  await Env.load();
  const app = new App();
  await app.init();
  app.start(Env.get("PORT"));
};

main();
