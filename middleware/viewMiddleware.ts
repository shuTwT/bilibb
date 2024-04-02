import { Context, Next } from "koa";
import ejs from "ejs";
import fs from "node:fs";
import path from "node:path";
import send from "koa-send";

export default function (
  root: string,
  { autoRender = true, extension = "html", options = {} }: any = {}
) {
  return async function (ctx: Context, next: Next) {
    async function render(relPath: string, locals = {}) {
        
      const paths = await getPaths(root, relPath, extension);

      const suffix = paths.ext;

      const state = Object.assign({}, options, ctx.state || {}, locals);
      state.partials = Object.assign(
        Object.create(null),
        options.partials || {}
      );
       
      ctx.type = "text/html";
      if (isHtml(suffix)) {
        return send(ctx, paths.rel, {
          root: root,
        });
      } else {
        const html = await ejs.renderFile(paths.rel, state, {})
          ctx.body = html;
          return html;
      }
    }

    if (!ctx.render){
        ctx.render = render;
    } 
    
    await next();
  };
}

function getPaths(abs: string, rel: string, ext: string) {
  return new Promise<{ rel: string; ext: string }>((resolve, reject) => {
    fs.stat(path.join(abs, rel), (err, stats) => {
      if (err) {
        reject(err);
      } else {
        if (stats.isDirectory()) {
          resolve({
            rel: path.resolve(abs,rel, `index.${ext}`),
            ext,
          });
        }
        resolve({
          rel:path.resolve(abs,rel),
          ext: path.extname(rel).slice(1),
        });
      }
    });
  });
}
function isHtml(ext: string) {
  return ext === "html";
}
