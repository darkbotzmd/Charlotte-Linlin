const jimp_1 = require('jimp')

module.exports = {
  name: "setppgc", 
  cmd: ['setppgc'],
  category: 'group',
  start: async(mom, m, { command, prefix, text, quoted, mime }) => {
    if (!quoted) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
    if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
    if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
    try {
      let media = await mom.downloadAndSaveMediaMessage(quoted)
      let { img } = await pepe(media)
      await mom.query({
        tag: 'iq',
        attrs: {
	      to: m.from,
	      type:'set',
	      xmlns: 'w:profile:picture'
	    },
	    content: [
	      {
	        tag: 'picture',
	        attrs: { type: 'image' },
            content: img
	      }
	    ]
	  })
	  m.reply(`Admin telah mengganti Icon Group!`)
	} catch (e) {
	  console.log(e)
	  m.reply(`Terjadi kesalahan, coba lagi nanti.`)
    }
  },
  isGroup: true,
  isAdmin: true,
  isBotAdmin: true
}

async function pepe(media) {
  const jimp = await jimp_1.read(media)
  const min = jimp.getWidth()
  const max = jimp.getHeight()
  const cropped = jimp.crop(0, 0, min, max)
  return {
	img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
	preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
  }
}