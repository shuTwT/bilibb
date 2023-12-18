import v1Router from "./v1"
import type Koa from "koa"
export default (app:Koa)=>{
    app.use(v1Router.routes).use(v1Router.allowedMethods())
}