import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .gpteso hello")
await m.reply(wait)
try {
// Contoh penggunaan
let result = await gptEso(text)
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["gpteso"]
handler.tags = ["internet"]
handler.command = /^(gpteso)$/i
export default handler

/* New Line */
async function gptEso(you_qus) {
  try {
    let baseURL = "https://gpt.esojourn.org/";
    const messageChain4 = [{ role: "user", content: you_qus }];

    const response = await fetch(baseURL + "api/chat-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-code": "586-484-535D",
        "path": "v1/chat/completions",
        "Referer": baseURL
      },
      body: JSON.stringify({
        messages: messageChain4,
        stream: true,
        model: "gpt-3.5-turbo",
        temperature: 1,
        max_tokens: 2000,
        presence_penalty: 0
      })
    });

      const data = await response.text();
      return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
