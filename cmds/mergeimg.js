//const mergeImages = require('merge-images');
const { Canvas } = require('canvas-constructor');
const fsn = require('fs-nextra')
module.exports.run = async (Bot,message,args) => {
  let author = message.author;
  let authorP = author.avatar;
  const image = await createCanvas();
  await message.channel.send({files: [image]})


  async function createCanvas() {
      const image = await fsn.readFile('C:/Users/WILLIAM/Desktop/Node.js Projects/Duncebot2/cmds/images/beach2.png');
      const image2 = await fsn.readFile(`C:/Users/WILLIAM/Desktop/Node.js Projects/Duncebot2/userProf/${author.id}/avatar.png`)

      return new Canvas(934, 282)
          .addImage(image, 0, 0, 934, 282)
          .addImage(image2, 0, 0, 200, 200)
          .setTextFont('28px Impact')
          .setTextAlign('center')
          .addText('Kitten!', 150, 370)
          .toBufferAsync();
  }

}

module.exports.help = {
    name: "imgm"
}
