import Router from "koa-router"
import prisma from "../../lib/prisma"
import { parseQuery, str2num } from "../utils"

const analysisRouter=new Router({
    prefix:"/analysis"
})

export default analysisRouter