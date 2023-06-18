import fetch from "node-fetch"
let timeout = 120000
let poin = 4999
let handler = async (m, {
    conn,
    command,
    text,
    usedPrefix
}) => {
    let imgr = flaaa.getRandom()

    conn.emailotp = conn.emailotp ? conn.emailotp : {}
    let id = m.chat
    if (!text)
        return m.reply(
            `Example: ${usedPrefix + command} email`
        );
    if (id in conn.emailotp) {
        conn.sendButton(m.chat, "Masih ada OTP belum terjawab di chat ini", author, null, buttons, conn.emailotp[id][0])
        throw false
    }
    let generateOTP = (Math.floor(Math.random() * 9000) + 1000).toString();
    let res = await sendEmail(author, generateOTP, conn.user.jid.split("@")[0], text);

    let json = {
        code: generateOTP,
        soal: "Masukkan Kode OTP"
    };
    if (res.success == true) {
        let caption = `*${command.toUpperCase()}*
  ${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hotp untuk bantuan
Bonus: ${poin} XP
    `.trim()
        conn.emailotp[id] = [
            await conn.sendButton(m.chat, caption, author, `${imgr + command}`, buttons, m),
            json, poin,
            setTimeout(() => {
                if (conn.emailotp[id]) conn.sendButton(m.chat, `Waktu habis!\nOTP adalah *${json.code}*`, author, null, [
                    ["emailotp", "/emailotp"]
                ], conn.emailotp[id][0])
                delete conn.emailotp[id]
            }, timeout)
        ]
    } else {
        conn.reply(m.chat, "*『  Gagal mengirim OTP  』*", m)
    }
}
handler.help = ["emailotp"]
handler.tags = ["game"]
handler.command = /^emailotp/i

export default handler

const buttons = [
    ["Hint", "/hotp"],
    ["Nyerah", "menyerah"]
]

async function sendEmail(Name, OTP, Number, Mail) {
    try {
        return await fetch("https://send.api.mailtrap.io/api/send/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 46fae2154055e6df3901c95919531b2a",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "from": {
                        "email": "notifier@boyne.dev",
                        "name": Name
                    },
                    "to": [{
                        "email": Mail,
                        "name": Name
                    }],
                    "subject": "KODE OTP MU ( " + OTP + " )",
                    "text": "Atau klik link ini untuk memverifikasi " + await shortUrl("https://wa.me/" + Number + "?text=" + OTP),
                    "category": "Notification"
                })
            })
            .then(response => response.json())
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
}
async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    return await res.text()
}