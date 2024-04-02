import { LiveTCP, WSOptions } from "bilibili-live-ws";
import { ModRoom } from "./modules/ModRoom";
import log4js from "../utils/log4js";
import { Msg, Resolver, resolver } from "./resolver";

/**
 * 扩展连接实例
 */
export class BLiveTCP extends LiveTCP {
  /**
   * 房间模块
   */
  private readonly room: ModRoom;
  /**
   * 钩子
   */
  public hook: any;
  /**
   * 当前房间在线人数
   */
  public rankNum:number=0
  constructor(roomid: number, opts?: WSOptions) {
    super(roomid, opts);
    this.room = new ModRoom(this);
    this.on("open", (data) => {
      log4js.info("Connection is established");
    });
    this.on("live", () => {
      this.on("heartbeat", (online) => {
      });
    });
    this.on("msg", async (data: Msg<any>) => {
      if (data.cmd in resolver) {
        await resolver[data.cmd].call(this,roomid + "", data);
      } 
    });
    this.on("error", (e) => {
      log4js.error(e);
    });
  }
}
