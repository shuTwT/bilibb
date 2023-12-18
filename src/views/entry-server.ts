import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";

export const render=async(
    ctx:any,
    manifest:Record<string,string[]>
):Promise<any[]>=>{
    const app=createApp();

    const renderCtx:{modules?:string[]}={}

    const renderedHtml = await renderToString(app,renderCtx);

    return [renderedHtml]
}