//By Hinata

export async function all(m) {
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
	let name = await this.getName(who)
	let chat = global.db.data.chats[m.chat]
    let { isBanned } = global.db.data.chats[m.chat]
    let { banned } = global.db.data.users[m.sender]
    let { group } = global.db.data.settings
    let setting = global.db.data.settings
    let user = global.db.data.users[m.sender]
    

    if (chat.autoReply) {
    // ketika ada yang kirim anu
    if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
        this.reply(m.chat, `${htjava} *Undang Bot ke Grup* ${htjava}
${dmenub} 7 Hari / Rp 5,000
${dmenub} 30 Hari / Rp 15,000
${dmenuf}
`.trim(), m, { mentions: [m.sender] })
await this.reply(nomorown + '@s.whatsapp.net', `Ada Yang Mau Nyulik nih :v \n\nDari: @${m.sender.split("@")[0]} \n\nPesan: ${m.text}`, m, { mentions: [m.sender] })
    }
    
    // ketika ada yang kirim anu
    if (m.mtype === 'reactionMessage') {
    let caption = `*Terdeteksi* @${who.split("@")[0]} Lagi Mengirim Reaction\n`
    this.reply(m.chat, caption, m, { mentions: this.parseMention(caption) })
        }
        
    // ketika ada yang kirim anu
    if (m.mtype === 'paymentMessage') {
    let caption = `*Terdeteksi* @${who.split("@")[0]} Lagi Meminta Uang\n`
    this.reply(m.chat, caption, m, { mentions: this.parseMention(caption) })
        }
    
    // ketika ada yang kirim anu
    if (m.mtype === 'productMessage') {
    let caption = `*Terdeteksi* @${who.split("@")[0]} Lagi Promosi\n`
    this.reply(m.chat, caption, m, { mentions: this.parseMention(caption) })
        }
    
    // ketika ada yang kirim anu
    if (m.mtype === 'orderMessage') {
    let caption = `*Terdeteksi* @${who.split("@")[0]} Lagi Meng Order\n`
    this.reply(m.chat, caption, m, { mentions: this.parseMention(caption) })
        }
        
        // ketika ada yang kirim anu
    if (m.mtype === 'pollCreationMessage') {
    let caption = `*Terdeteksi* @${who.split("@")[0]} Lagi Polling\n`
    this.reply(m.chat, caption, m, { mentions: this.parseMention(caption) })
        }
        
        // ketika ada yang kirim anu
    if (m.mtype === 'contactMessage' && m.mtype === 'contactsArrayMessage') {
    let caption = `*Terdeteksi* @${who.split("@")[0]} Lagi promosi kontak\n`
    this.reply(m.chat, caption, m, { mentions: this.parseMention(caption) })
        }
        
    
    // ketika ada yang kirim anu
    if (m.mtype === 'stickerMessage') {
    this.sendMessage(m.chat, {
          react: {
            text: '🗿',
            key: m.key
          }})
        }
    
    // ketika ada yang kirim anu
    if (m.text.includes('🗿')) {
    this.sendMessage(m.chat, {
          react: {
            text: '🗿',
            key: m.key
          }})
        }
        
    // ketika ada yang kirim anu
    
    // bot
    if (/^(aktif|w(ey|oi)|bot|ha[iy]|we|oy|p)$/i.test(m.text)) {
    let apsih = ["Kenapa",
"Ada apa",
"Naon meng",
"Iya, bot disini",
"Luwak white coffe passwordnya",
"Hmmm, kenapa",
"Apasih",
"Okey bot sudah aktif",
"2, 3 tutup botol",
"Bot aktif"]
        let caption = `*${apsih.getRandom()}* kak ${name} ( @${who.split("@")[0]} ) 🗿`
    this.reply(m.chat, caption, m, { mentions: this.parseMention(caption) })
        }
    }

    return !0
}

