import path from "node:path";
import type { GenTable } from "@prisma/client";
import log4js from "../../utils/log4js";
import prisma from "../../utils/prisma";
class GenTableService {
  async selectGentableById(id: number): Promise<GenTable | void> {
    try {
      const genTable = await prisma.genTable.findUnique({
        where: {
          tableId: id,
        },
      });
      if (genTable) {
        return genTable;
      } else {
        throw `no genTable with id ${id}`;
      }
    } catch (error) {
      log4js.error(error);
    }
  }
  selectGenTableList(genTable: GenTable) {}
  selectDbTableList(genTable: GenTable) {}
  selectDbTableListByNames(tableNames: string[]) {}
  async selectGenTableAll(): Promise<GenTable[]> {
    const genTableList = await prisma.genTable.findMany({
      include: {
        genTabColumns: {
          orderBy: {
            sort: "asc",
          },
        },
      },
    });
    return genTableList;
  }
  updateGenTable() {}
  deleteGenTableByIds() {}
  async createTable(sql:string) {
    try{
        await prisma.$queryRaw`${sql}`
    }catch(error){
        log4js.error(error)
    }
  }
  importGenTable() {}
  async previewCode(tableId:number) {
    const dataMap = new Map<string,string>()
    const table = await prisma.genTable.findUnique({
        where:{
            tableId:tableId
        }
    })
    if(table){

    }
  }
  async generatorCode(tableName:string,zip:any) {
    const genTable = await prisma.genTable.findFirst({
        where:{
            tableName:tableName
        }
    })
    if(genTable){

    }else{
        throw `no genTable width tableName ${tableName}`
    }
  }
  synchDb() {}
  downloadCode(tableNames: string): void;
  downloadCode(tableNames: string[]): void;
  downloadCode(tableNames: string | string[]) {}

  setSubTable(table:GenTable){
    const subTableName = table.subTableName
    if(subTableName!==""){
        
    }
  }
  /**
   * 设置代码生成其他选项值
   * @param genTable
   */
  setTableFromOptions(genTable: any) {
    try {
      const paramsObj = JSON.parse(genTable.getOptions());
    } catch {}
  }
  /**
   * 获取代码生成地址
   */
  static getGenPath(table: any, template: string) {
    const genPath: string = table.getGenPath();
    if (genPath === "/") {
      // TODO
      return process.cwd();
    }
    return process.cwd();
  }
}
