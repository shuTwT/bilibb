declare module "*.vue"{
    import {defineComponent} from "vue"
    const Component: ReturnType<typeof defineComponent>;
    export default Component
}

declare module "koa2-connect"{
    const k2c:any
    export default k2c
}