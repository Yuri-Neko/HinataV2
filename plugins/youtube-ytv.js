import fg from "api-dylux"
import {
    youtubedl,
    youtubedlv2
} from "@bochilteam/scraper"
import fetch from "node-fetch"

let limit = 80
let handler = async (m, {
    conn,
    args,
    isPrems,
    isOwner,
    usedPrefix,
    command
}) => {
    if (!args || !args[0]) throw `✳️ Example :\n${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`
    if (!args[0].match(/youtu/gi)) throw `❎ Verify that the YouTube link`
    await m.reply(wait)
    try {
        let q = args[1] || "360p"
        let v = args[0]
        const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
        const dl_url = await yt.video[q].download()
        const title = await yt.title
        const size = await yt.video[q].fileSizeH

        if (size.split("MB")[0] >= limit) return m.reply(` ≡  *Youtube Downloader*\n\n*⚖️Size* : ${size}\n*🎞️quality* : ${q}\n\n_The file exceeds the download limit_ *+${limit} MB*\n\n*Link:*\n${await shortUrl(dl_url)}`)
        let captvid = `
 ≡  *Youtube Downloader*
  
*📌Títle* : ${title || 'Tidak terdeteksi'}
*📟 Ext* : mp4
*🎞️Quality* : ${q || 'Tidak terdeteksi'}
*⚖️Size* : ${size || 'Tidak terdeteksi'}
`.trim()
        let dls = "Downloading audio succes"
        let doc = {
            video: {
                url: dl_url
            },
            mimetype: "video/mp4",
            caption: captvid,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: v,
                    title: title,
                    body: dls,
                    sourceUrl: v,
                    thumbnail: await (await conn.getFile(yt.thumbnail)).data
                }
            }
        }

        await conn.sendMessage(m.chat, doc, {
            quoted: m
        })

    } catch {
        try {
            const {
                title,
                result,
                quality,
                size,
                duration,
                thumb,
                channel
            } = await fg.ytv(args[0])

            if (size.split("MB")[0] >= limit) return m.reply(` ≡  *Youtube Downloader*\n\n*⚖️Size* : ${size}\n*🎞️Quality* : ${quality}\n\n_The file exceeds the download limit_ *+${limit} MB*\n\n*Link:*\n${await shortUrl(result)}`)
            let captvid = `
 ≡  *Youtube Downloader*
  
*📌Títle* : ${title || 'Tidak terdeteksi'}
*📟 Ext* : mp4
*🎞️Quality* : ${quality || 'Tidak terdeteksi'}
*⚖️Size* : ${size || 'Tidak terdeteksi'}
*⏰Duration* : ${duration || 'Tidak terdeteksi'}
`.trim()
            let dls = "Downloading audio succes"
            let doc = {
                video: {
                    url: result
                },
                mimetype: "video/mp4",
                caption: captvid,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: v,
                        title: title,
                        body: dls,
                        sourceUrl: v,
                        thumbnail: await (await conn.getFile(thumb)).data
                    }
                }
            }

            await conn.sendMessage(m.chat, doc, {
                quoted: m
            })

        } catch (e) {
            await m.reply(eror)
        }
    }

}
handler.help = ["mp4", "v", ""].map(v => "yt" + v + ` <url> <without message>`)
handler.tags = ["downloader"]
handler.command = /^y(outube(mp4|vdl)|t((mp4|v)|vdl))$/i

handler.exp = 0
handler.register = false
handler.limit = true

export default handler

async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    return await res.text()
}