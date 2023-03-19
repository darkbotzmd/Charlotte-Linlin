const jimp_1 = require('jimp')
require('../../settings')

module.exports = {
  name: "setppbot",
  cmd: ['setppbot'],
  category: 'owner',
  start: async(mom, m, { prefix, command, text, quoted, mime }) => {
    if (!quoted) return m.reply(`Kirim/m.reply Image Dengan Caption ${prefix + command}`)
    if (!/image/.test(mime)) return m.reply(`Kirim/reply Image Dengan Caption ${prefix + command}`)
    if (/webp/.test(mime)) return m.reply(`Kirim/reply Image Dengan Caption ${prefix + command}`)
    try {
      let media = await quoted.download()
      let botNumber = await mom.user.jid
      let { img } = await pepe(media)
      await mom.query({
      tag: 'iq',
	  attrs: {
	    to: botNumber,
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
	  return global.mess("done", m)
	  } catch (e) {
	    console.log(e)
	    return global.mess("error", m)
	  }
    },
  isOwner: true
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