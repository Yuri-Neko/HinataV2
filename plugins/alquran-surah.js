import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
try {
    if (!isNumber(args[0])) throw `Contoh:\n${usedPrefix + command} 1\n\nMaka hasilnya adalah surah Al-Fatihah ayat beserta audionya, dan ayatnya 1 aja`
    let f = await fetch("https://api.alquran.cloud/v1/surah/" + args[0] + "/ar.alafasy")
    let xx = await f.json()
    
    if (args[0] && !args[1]) {
    let listSections = []
	Object.values(xx.data.ayahs).map((v, index) => {
	var cp = `*Number:* ${v.number}
*Number In Surah:* ${v.numberInSurah}
*Juz:* ${v.juz}
*Manzil:* ${v.manzil}
*Page:* ${v.page}
*Ruku:* ${v.ruku}
*Hizb Quarter:* ${v.hizbQuarter}
`
	listSections.push(["Model [ " + ++index + " ]", [
          [v.text + "\n\n", usedPrefix + "get " + v.audio, cp]
        ]])
	})
	m.reply(wait)
	return conn.sendList(m.chat, htki + " 📺 Models 🔎 " + htka, `⚡ Silakan pilih Model di tombol di bawah...\n*Teks yang anda kirim:* ${args[0]}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, "☂️ M O D E L ☂️", listSections, m)
	} else if (args[0] && args[1]) {
	if (!isNumber(args[0]) && !isNumber(args[1])) throw `Contoh:\n${usedPrefix + command} 1\n\nMaka hasilnya adalah surah Al-Fatihah ayat beserta audionya, dan ayatnya 1 aja`
    var ay = xx.data.ayahs[args[1]]
    var cy = `*Arab:* ${ay.text}`
    m.reply(wait)
m.reply(cy)
await conn.sendMessage(m.chat, { audio: { url: ay.audio }, seconds: fsizedoc, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [100,0,100,0,100,0,100] }, { quoted: m })
	}
	} catch (e) {
	throw eror
	}
}
handler.help = ['alqurans'].map(v => v + ' <no surah>')
handler.tags = ['qurans']
handler.command = /^(al)?qurans$/i

export default handler
function isNumber(x) {
    return !isNaN(x)
}