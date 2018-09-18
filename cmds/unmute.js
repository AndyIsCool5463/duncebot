const fs = require('fs');
module.exports.run = async (Bot,message,args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permissions to manage messages");

  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.reply("Specify a User or ID");

  let role = message.guild.roles.find(r => r.name === "Bad Boys(Muted)");
  if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted");

  await(toMute.removeRole(role));
  delete Bot.mutes[toMute.id];
  fs.writeFile("./mutes.json", JSON.stringify(Bot.mutes), err => {
    if(err) throw err;
    console.log(`I have unmuted ${toMute.user.tag}.`);
  });
}

module.exports.help = {
    name: "unmute"
}
