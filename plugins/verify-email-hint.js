let handler = async (m, { conn }) => {
    conn.emailotp = conn.emailotp ? conn.emailotp : {}
    let id = m.chat
    if (!(id in conn.emailotp)) throw false
    let json = conn.emailotp[id][1]
    conn.sendButton(m.chat, '```' + json.jawaban.replace(/[AIUEOaiueo]/ig, '_') + '```', author, null, [
        ['Nyerah', 'menyerah']
    ], m)
}
handler.command = /^hotp$/i

handler.limit = true

export default handler