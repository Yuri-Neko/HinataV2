import similarity from "similarity"
import {
    createHash
} from "crypto"
import fetch from "node-fetch"

const threshold = 0.72
export async function before(m) {
    let id = m.chat
    let user = global.db.data.users[m.sender]
    if (!m.quoted)
        return !0
    this.emailotp = this.emailotp ? this.emailotp : {}
    if (!(id in this.emailotp)) return this.reply(m.chat, "*OTP ini telah berakhir!*", m)

    if (m.quoted.id == this.emailotp[id][0].id) {
        if (m.quoted.sender == this.emailotp[id][0].sender) {
            let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
            if (isSurrender) {
                clearTimeout(this.emailotp[id][3])
                delete this.emailotp[id]
                return this.reply(m.chat, "*OTP Dihapus!*", m)
            }
            let json = JSON.parse(JSON.stringify(this.emailotp[id][1]))
            // this.reply(m.chat, JSON.stringify(json, null, "\t"))
            if (m.text.toLowerCase() == json.code.toLowerCase().trim()) {
                global.db.data.users[m.sender].exp += this.emailotp[id][2]

                user.name = m.name.trim()
                user.age = 20
                user.regTime = +new Date
                user.registered = true
                let sn = createHash("md5").update(m.sender).digest("hex")

                let cap = `*${htki} ᴜsᴇʀs ${htka}*
${dmenub} *sᴛᴀᴛᴜs:* ☑️ sᴜᴄᴄᴇssғᴜʟ
${dmenub} *ɴᴀᴍᴇ:* ${m.name}
${dmenub} *ᴀɢᴇ:* ${user.age} ʏᴇᴀʀs
${dmenub} *sɴ:* ${sn}
${dmenuf}

*OTP Benar!*\n+${this.emailotp[id][2]} XP

ᴅᴀᴛᴀ ᴜsᴇʀ ʏᴀɴɢ ᴛᴇʀsɪᴍᴘᴀɴ ᴅɪᴅᴀᴛᴀʙᴀsᴇ ʙᴏᴛ, ᴅɪᴊᴀᴍɪɴ ᴀᴍᴀɴ ᴛᴀɴᴘᴀ ᴛᴇʀsʜᴀʀᴇ (. ❛ ᴗ ❛.) ${cmenua}
`
                //Sukses
                this.sendFile(m.chat, flaaa.getRandom() + "VERIFIED", "", cap, m)
                clearTimeout(this.emailotp[id][3])
                delete this.emailotp[id]
            } else if (similarity(m.text.toLowerCase(), json.code.toLowerCase().trim()) >= threshold)
                this.reply(m.chat, "*OTP hampir sama!*", m)
            else
                this.reply(m.chat, "*OTP salah!*", m)
        } else
            this.reply(m.chat, "*Bukan request OTP anda!*", m)
    }
    return !0
}
export const exp = 0