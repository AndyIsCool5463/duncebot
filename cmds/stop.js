//const ytdl = require('ytdl-core');
const fs = require('fs');
//const ffmpeg = require('ffmpeg');
const Discord = require('discord.js');
module.exports.run = async (Bot,message,args) => {
  let channel = message.member.voiceChannel;
  Bot.disconnect()
  .then(connection => console.log('Connected!'))
  .catch(console.error);
  }

module.exports.help = {
    name: "stop"
}
