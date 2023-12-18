import fs from "fs"
import path from "path"
import v1Router from "./v1"
import type Koa from "koa"
import koaConnect from "koa-connect"
import vite from "vite"
export default async (app:Koa)=>{
    const viteServer = await vite.createServer({
        root:process.cwd(),
        logLevel:'error',
        server:{
            middlewareMode:true
        }
    })

    app.use(koaConnect(viteServer.middlewares));

    app.use(async (ctx):Promise<any>=>{
        try{
            let template= fs.readFileSync(path.resolve(__dirname,'index.html'),'utf-8');
            template = await viteServer.transformIndexHtml(ctx.path,template);
            const {render}=await viteServer.ssrLoadModule('/src/entry-server.ts')
            const [renderedHtml,state] = await render(ctx,{})
            const html= template
                .replace('<!--app-html-->', renderedHtml)
                .replace('<!--pinia-state-->', state);
            ctx.type='text/html'
            ctx.body=html
            }catch(e:any){
                viteServer &&viteServer.ssrFixStacktrace(e)
                console.log(e.stack);
                ctx.throw(500,e.stack)
            }
    })

    app.use(v1Router.routes()).use(v1Router.allowedMethods())
}