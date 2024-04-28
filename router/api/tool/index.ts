import type { DefaultState, Context } from "koa";
import Router from "koa-router";

const toolRouter = new Router<DefaultState, Context>({
    prefix:"/tool"
});


export {toolRouter}