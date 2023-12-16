import fetch from "node-fetch";
/**
 *
 * @returns
 */
export const getConf = async (roomid: number, cookie: string) => {
  const raw: any = await fetch(
    `https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo?id=${roomid}`,
    {
      headers: {
        cookie: cookie,
      },
      //credentials:'include'
    }
  ).then((w) => w.json());
  console.log(raw)
  const {
    data: {
      token: key,
      host_list: [{ host }],
    },
  } = raw;
  const address = `wss://${host}/sub`;
  return { key, host, address, raw };
};
