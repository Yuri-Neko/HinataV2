import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => 
 {
  let url = "https://api.pexels.com/v1/search?query=" + text;

let options = {
  headers: {
    Authorization: "Bearer 563492ad6f91700001000001d57ba90d38e24922890073851d50609a"
  }
};

let res = await fetch(url, options)
let sul = await res.json()
	let listSections = []
	Object.values(sul.photos).map((v, index) => {
		let des = `\n\n
Original Photo Description
🆔 *ID:* ${v.id}
📏 *Width:* ${v.width} Original
📐 *Height:* ${v.height} Original
🔗 *Url:* ${v.url}
📸 *Photographer:* ${v.photographer}
🌐 *Photographer Url:* ${v.photographer_url}
🆔 *Photographer ID:* ${v.photographer_id}
🎨 *Avg Color:* ${v.avg_color}
👍 *Liked:* ${v.liked ? v.liked : 'Gak ada'}
🖼️ *Alt:* ${v.alt}
🔗 *Url:* ${Object.values(v.src).join('\n\n')}
`
	listSections.push([index + ' ' + cmenub + ' ' + v.alt.toUpperCase(), [
          [('original photo').toUpperCase(), usedPrefix + 'get ' + v.src.original, des],
          [('large2x photo').toUpperCase(), usedPrefix + 'get ' + v.src.large2x, des],
          [('large photo').toUpperCase(), usedPrefix + 'get ' + v.src.large, des],
          [('medium photo').toUpperCase(), usedPrefix + 'get ' + v.src.medium, des],
          [('small photo').toUpperCase(), usedPrefix + 'get ' + v.src.small, des],
          [('portrait photo').toUpperCase(), usedPrefix + 'get ' + v.src.portrait, des],
          [('landscape photo').toUpperCase(), usedPrefix + 'get ' + v.src.landscape, des],
          [('tiny photo').toUpperCase(), usedPrefix + 'get ' + v.src.tiny, des]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Pexels Search 🔎 ' + htka, `⚡ Silakan pilih Pexels Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `☂️ Pexels Search Disini ☂️`, listSections, m)
}
handler.help = ['pexels']
handler.tags = ['internet']
handler.command = /^(pexels)$/i

export default handler