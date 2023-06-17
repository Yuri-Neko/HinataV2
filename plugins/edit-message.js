let handler = async (m, { conn, text, command, isBotAdmin }) => {
if (!m.quoted) throw "Reply pesan yang ingin diedit"
    if (!text) throw "Tidak ada teks"
    let hapus = m.quoted.sender ? m.message.extendedTextMessage.contextInfo.participant : m.key.participant
let bang = m.quoted.id ? m.message.extendedTextMessage.contextInfo.stanzaId : m.key.id
if (isBotAdmin) return await conn.sendMessage(m.chat, {text: text, edit: { remoteJid: m.chat, fromMe: false, id: bang, participant: hapus }})
if (!isBotAdmin) return conn.sendMessage(m.chat, {text: text, edit: m.quoted.vM.key})
}
handler.help = ["edit teks ( Reply Pesan )"]
handler.tags = ["main"]
handler.command = ["edit"]
handler.premium = true

export default handler
