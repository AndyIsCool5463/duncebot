module.exports.run = async (Bot,message,args) => {
  let msg = await message.channel.send("Generating Avatar...");
  if(!message.guild.iconURL) return msg.edit("No icon for the Server");
   await message.channel.send({files: [
    {
        attachment: message.guild.iconURL,
        name: "icon.png"
    }
  ]});
  msg.delete();
}
module.exports.help = {
    name: "icon"
}
