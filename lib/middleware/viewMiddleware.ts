import { Context, Next } from "koa";
import ejs from "ejs"
import fs from "node:fs"
import path from "node:path"
import send from "koa-send";

export default function(
    root:string,
    {autoRender=true,extension='html',options={},map={}}:any={}
){
    return async function(ctx:Context,next:Next){
        
        function render(relPath:string,locals={}){
            const fullPath=path.resolve(root,relPath)
            return getPaths(root,relPath,extension).then((paths:any)=>{
                const suffix=paths.ext
                const state=Object.assign({},options,ctx.state||{},locals)
                state.partials = Object.assign(Object.create(null), options.partials || {})
                ctx.type='text/html'
                if(isHtml(suffix)&& !map){
                    return send(ctx,paths.rel,{
                        root:root
                    })
                }else{
                    return ejs.renderFile(paths.rel,state,{}).then(html=>{
                        ctx.body=html
                        return html
                    })
                }
            })
        }

        if(!ctx){
            return render
        }
        if(ctx.render) return next()
        ctx.render=render
        return next()
    }
}

function getPaths(abs:string,rel:string,ext:string){
    return new Promise((resolve,reject)=>{
        fs.stat(path.join(abs,rel),(err,stats)=>{
            if(err){
                reject(err)
            }else{
                if(stats.isDirectory()){
                    resolve({
                        rel:path.join(rel,`index.${ext}`),
                        ext
                    })
                }
                resolve({
                    rel,
                    ext:path.extname(rel).slice(1)
                })
            }
        })
    })
}
function isHtml(ext:string){
    return ext==='html'
}