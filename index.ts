import { env } from "config/env";
import { Server } from "config/server";

const server = new Server(env.get("PORT"));
server.listen();
