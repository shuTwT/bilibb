import path from "node:path"
import Router from "koa-router";
import ejs from "ejs";
import { str2num, parseQuery, getTemplate } from "../../api/utils.js";
import {createSSRApp,defineAsyncComponent} from "vue"
import {renderToString} from "vue/server-renderer"
import type { Context, DefaultState } from "koa";

const biliRouter =new Router<DefaultState, Context>({prefix:"/bili"})



biliRouter.get('/',async(ctx,next)=>{
    const template='bili/bili'
    const App=defineAsyncComponent(()=>import('../../../../template/bili/App.vue'))
    const app=createSSRApp(App)
    
    const html = await renderToString(app)
    console.log(html)
    ctx.body=ejs.render(getTemplate(template,'ejs'),{
        html
    })
})

export {biliRouter}