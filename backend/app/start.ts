import { App } from "./app";

const main = async () => {
  const app = new App();
  await app.init();
  app.start(3000);
};

main();
