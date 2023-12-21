/**
 * 参考
 * https://github.com/simon300000/bilibili-live-ws
 * https://github.com/lovelyyoshino/Bilibili-Live-API/blob/master/API.WebSocket.md
 * https://github.com/Minteea/floating-live
 * https://github.com/SocialSisterYi/bilibili-API-collect
 */
import Koa from "koa";
import * as dotenv from "dotenv";
import routing from "./api/routes";
import {TCPServer} from "./service/connectService"

dotenv.config();
const allowHTTP = process.env.ALLOW_HTTP == "true" ? true : false;
const allowTCP = process.env.ALLOW_TCP == "true" ? true : false;
const port = Number.parseInt(process.env.PORT + "");

async function bootstrap() {
  if (allowTCP) await TCPServer()
  if (allowHTTP) await HTTPServer()
}


async function HTTPServer() {
  const app = new Koa()
  routing(app)
  app.listen(port, () => console.log(`started server on http://localhost:${port}`));
}

bootstrap()