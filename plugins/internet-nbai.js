import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
if (!text) return m.reply("Input query\nExample: .nbai hello")
await m.reply(wait)
try {
// Contoh penggunaan
let input = await ChatGpt(text)
let filteredTexts = filterJSONInput(input);
let result = (JSON.parse(filteredTexts[1]).text);
await m.reply(result)
} catch (e) {
await m.reply(eror)
}
}
handler.help = ["nbai"]
handler.tags = ["internet"]
handler.command = /^(nbai)$/i
export default handler

/* New Line */
async function ChatGpt(query) {
  const url = "https://154.40.59.105:3006/api/chat-process";
  const headers = {
    "Content-Type": "application/json",
    "Referer": "https://f1.nbai.live/",
    "accept": "application/json, text/plain, */*",
  };

  const body = JSON.stringify({
    prompt: query,
    options: {}
  });

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body
    });

      return await response.text();
}

function filterJSONInput(input) {
  const regex = /{(?:[^{}]|(?:\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\}))*}/g;
  const matches = input.match(regex);

  const filteredTexts = matches.filter(text => {
    try {
      JSON.parse(text);
      return true;
    } catch (error) {
      return false;
    }
  });

  return filteredTexts;
}
