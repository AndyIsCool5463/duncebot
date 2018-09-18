const fs = require('fs');
//const imgGen = require('js-image-generator');
const Discord = require('discord.js')
//const ImageGenerator = require('random-image-creator');
module.exports.run = async (Bot,message,args) => {
  let text = args[0]
  let size = args[1]
  let color = args[2]

  message.channel.send(`http://placehold.it/${size}/${color}/773222?text=${text}`);



}

module.exports.help = {
    name: "image"
}
