import Redis from "ioredis"

const redis = new Redis({
    port: Number(process.env.REDIS_PORT) || 6789,
    host: process.env.REDIS_HOST ?? '127.0.0.1'
})

export default redis