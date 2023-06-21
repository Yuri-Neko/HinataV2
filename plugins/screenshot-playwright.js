import playwright from 'playwright'

import fetch from 'node-fetch'
let handler = async (m, {
    text,
    command,
    usedPrefix,
    conn
}) => {

    var salah_input = "*Example:*\n" + usedPrefix + command + " " + sgh
    if (!text) throw salah_input
    try {
        // Contoh penggunaan
        const websiteUrl = text
        let buff = await takeFullPageScreenshot(websiteUrl)
        await conn.sendFile(m.chat,
            buff, "", "*[ Result ]*\n" + text, m)
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["ssp"]
handler.tags = ['internet']
handler.command = ["ssp"]

export default handler

async function takeFullPageScreenshot(url) {
    // Meluncurkan browser Chromium menggunakan Playwright
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigasi ke halaman web yang ingin diambil tangkapan layarnya
    await page.goto(url);

    // Mengukur ukuran konten halaman dan mengatur ukuran viewport agar sesuai
    const contentSize = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
    }));
    await page.setViewportSize(contentSize);

    // Mengambil tangkapan layar lengkap (full page screenshot) ke dalam buffer
    const screenshotBuffer = await page.screenshot({
        fullPage: true,
        type: 'png', // Anda dapat mengganti tipe gambar (png, jpeg, dll.) sesuai kebutuhan
    });

    // Menutup browser
    await browser.close();

    // Mengembalikan buffer tangkapan layar
    return screenshotBuffer;
}