
export const METHOD_METADATA = 'method';
export const PATH_METADATA = 'path';

export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'options' | 'patch';

export interface Constructor {
    new(...args: any[]): any;
    [key: string]: any;
}

export const Get = createDecorator('get');
export const Post = createDecorator('post');
export const Put = createDecorator('put');
export const Delete = createDecorator('delete');
export const Options = createDecorator('options');
export const Patch = createDecorator('patch');

function createDecorator(method: RequestMethod) {
    return function (path = '') {
        return function (target: { [key: string]: any }, key: string, descriptor: PropertyDescriptor) {
            // 附加元数据
            Reflect.defineMetadata(PATH_METADATA, path, descriptor.value); // 附加路由路径
            Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value); // 附加请求方法
        };
    };
}


export function Controller(path = '') {
    return function (target: Constructor) {
        Reflect.defineMetadata(PATH_METADATA, path, target);//附加路由前缀
    }
}
