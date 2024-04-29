import path from "node:path"
class GenTableService {
    selectGentableById(id:number){

    }
    selectGenTableList(){

    }
    selectDbTableList(){

    }
    selectDbTableListByNames(){

    }
    selectGenTableAll(){

    }
    updateGenTable(){

    }
    deleteGenTableByIds(){

    }
    createTable(){

    }
    importGenTable(){

    }
    previewCode(){

    }
    generatorCode(){

    }
    synchDb(){

    }
    downloadCode(tableNames:string):void
    downloadCode(tableNames:string[]):void
    downloadCode(tableNames:string|string[]){

    }

    /**
     * 设置代码生成其他选项值
     * @param genTable 
     */
    setTableFromOptions(genTable:any){
        try{
            const paramsObj=JSON.parse(genTable.getOptions())
        }catch{

        }
        
    }
    /**
     * 获取代码生成地址
     */
    static getGenPath(table:any,template:string){
        const genPath:string = table.getGenPath();
        if(genPath==="/"){
            // TODO
            return process.cwd()
        }
        return process.cwd()
    }
}
