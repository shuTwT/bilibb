import fs from "fs";
import path from "path";
import type { Context, Next } from "koa"
import Router from "koa-router"

const router =new Router()

const ssrCtx={}

router.get('/login',async (ctx:Context,next:Next)=>{
    try {
        let template = fs.readFileSync(
          path.resolve(process.cwd(), "index.html"),
          "utf-8"
        );
        const { render } = await import("../../views/entry-server");
        const [renderedHtml] = await render(ctx, {});
        const html = template
          .replace("<!--app-html-->", renderedHtml)
        ctx.type = "text/html";
        ctx.body = html;
      } catch (e: any) {
        console.log(e.stack);
        ctx.throw(500, e.stack);
      }
})
export default router