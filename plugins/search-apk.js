import gplay from 'google-play-scraper'

let handler = async (m, { conn, text, command, usedPrefix }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
	if (!text) throw 'Input Query'
	let res = await gplay.search({ term: text })
	if (!res.length) throw `Query "${text}" not found :/`
	let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*

📰 *title:* ${v.title}
👩‍💻 *developer:* ${v.developer}
⭐️ *score:* ${v.score}
💬 *scoreText:* ${v.scoreText}
💲 *priceText:* ${v.priceText}
🆔 *appId:* ${v.appId}
📝 *summary:* ${v.summary}
🔗 *url:* ${v.url}
🖼️ *icon:* ${v.icon}
💰 *free:* ${v.free}`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
}
handler.help = ['apksearch']
handler.tags = ['tools']
handler.command = /^(ap([kp]search|(ps|k))|searchapk)$/i

export default handler
