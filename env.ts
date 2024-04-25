import UAParser from "ua-parser-js";
import log4js from "./utils/log4js.js";
import prisma from "./utils/prisma.js";
import { Options, SysUser } from "@prisma/client";
import { LoginUser } from "./core/model/LoginUser.js";
declare global {
  namespace globalThis {
    var env: Env;
    var native: unknown;
  }

  interface Window {}
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

declare module "koa" {
  interface DefaultState {
    [key: string]: any;
  }
  interface Context {
    log4js: typeof log4js;
    render: (relPath: string, locals?: object) => Promise<string>;
    ua: UAParser.UAParserInstance;
    getLoginUser: () => LoginUser;
  }
}

export interface DefaultOptions {
  roomId: string;
  uid: string;
  buvid: string;
  sessData: string;
  bili_ticket: string;
  bili_ticket_expires: string;
  DedeUserID: string;
  bili_jct: string;
  installed: string;
  host: string;
  [key: string]: string;
}

interface Env extends Partial<DefaultOptions> {
  readonly cookies: string;
}

interface DotEnv {
  DATABASE_URL: string;
  APP_PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_KEY_PREFIX: string;
  /** 演示模式 */
  DEMO_MODE:boolean;
  [key:string]:number|string|boolean
}

const warpperEnv = (envConf: Record<string, any>) => {
  const ret: DotEnv = {
    DATABASE_URL: "",
    APP_PORT: 3000,
    REDIS_HOST: "",
    REDIS_PORT: 6379,
    REDIS_KEY_PREFIX: "",
    DEMO_MODE:false
  };

  for (const envName of Object.keys(envConf)) {
    let realName :string|boolean|number = envConf[envName] as string;
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "APP_PORT" || envName === "REDIS_PORT") {
      realName = Number(realName);
    }
    ret[envName] = realName
    if(typeof realName==='string'){
        process.env[envName] = realName
    }else if(typeof realName === 'object'){
        process.env[envName] = JSON.stringify(realName)
    }
  }
};

export {};
