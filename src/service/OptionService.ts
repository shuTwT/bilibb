import prisma from "../../lib/prisma";

export class OptionService{
    static async setOption(key:string,value:string){
        try{
            await prisma.options.upsert({
                where:{
                    optionName:key
                },
                update:{
                    optionValue:value,
                },
                create:{
                    optionName:key,
                    optionValue:value,
                }
            })
            return true
        }catch{
            return false
        }
    }

    static async getOption(key:string){
        try{
            const option=await prisma.options.findUnique({
                where:{
                    optionName:key
                }
            })
            return option
        }catch{
            return null
        }
    }
}