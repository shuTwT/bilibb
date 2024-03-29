import { Redis } from "ioredis";

//通过sid生成用于redis保存的key
function getRedisSessionID(sid: string) {
  return `ssid:${sid}`;
}

class RedisSessionStore {
  store: Redis;
  constructor(store: Redis) {
    this.store = store;
  }

  //储存session,ttl为保存时长
  async set(sid: string, session: any, maxAge = 600000) {
    const id = getRedisSessionID(sid);
    try {
      const sessStr = JSON.stringify(session); //JSON序列化相关的两个方法都需要用(try...catch...)处理异常
      await this.store.setex(id, maxAge, sessStr); //ioredis提供的增加键值对的方法
      //await this.store.set(id, sessStr); //不设置过期时间时使用set()
    } catch (err) {
      console.error(err);
    }
  }

  //读取session
  async get(sid: string) {
    const id = getRedisSessionID(sid);
    let value = await this.store.get(id);
    if (!value) {
      return null;
    }
    try {
      const result = JSON.parse(value);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  //删除session
  async destroy(sid: string) {
    const id = getRedisSessionID(sid);
    await this.store.del(id); //ioredis提供的删除键值对的方法
  }
}

export default RedisSessionStore