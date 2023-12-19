import log4j from 'log4js'
const levels = {
    'trace'     : log4j.levels.TRACE,
    'debug'     : log4j.levels.DEBUG,
    'info'      : log4j.levels.INFO,
    'warn'      : log4j.levels.WARN,
    'error'     : log4j.levels.ERROR,
    'fatal'     : log4j.levels.FATAL
}

// log4j配置
log4j.configure({
    appenders: {
        console: { type: 'console' },
        info: {
            type: 'file',
            filename: 'logs/all-logs.log'
        },
        error: {
            type: 'dateFile',
            filename: 'logs/log',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true      // 设置文件名称为 filename + pattern
        }
    },
    categories: {
        default: {
            appenders: [ 'console' ],
            level: 'debug'
        },
        info: {
            appenders: [ 'info', 'console' ],
            level: 'info'
        },
        error: {
            appenders: [ 'error', 'console' ],
            level: 'error'
        }
    }
})

let debugLogger = log4j.getLogger('debug')
/**
 * 日志输出 level为bug
 */
export const debug = ( content:string ) => {
    
    debugLogger.level = levels.debug
    debugLogger.debug(content)
}

let infoLogger = log4j.getLogger('info')
/**
 * 日志输出 level为info
 */
 export const info = ( content:string ) => {
    infoLogger.level = levels.info
    infoLogger.info(content)
}

let errorLogger = log4j.getLogger('error')
/**
 * 日志输出 level为error
 */
export const error = ( content:string ) => {
    errorLogger.level = levels.error
    errorLogger.error(content)
}
