const axios = require("axios");

const clean = e => (e = e.replace(/(<br?\s?\/>)/gi, " \n")).replace(/(<([^>] )>)/gi, "");

async function shortener(e) {
  return e;
}

async function tiktok(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let t = await axios("https://lovetik.com/api/ajax/search", { method: "post", data: new URLSearchParams(Object.entries({ query: url })) });

      const result = {};
      result.title = clean(t.data.desc);
      result.author = clean(t.data.author);
      result.nowm = await shortener((t.data.links[0].a || "").replace("https", "http"));
      result.watermark = await shortener((t.data.links[1].a || "").replace("https", "http"));
      result.audio = await shortener((t.data.links[2].a || "").replace("https", "http"));
      result.thumbnail = await shortener(t.data.cover);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
