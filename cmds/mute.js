const fs = module.require("fs");
module.exports.run = async (Bot,message,args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have permissions to manage messages")

  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.reply("Specify a User or ID");

  if(toMute.id === message.author.id) return message.channel.send("You dumbfuck, you cant mute yourself.");
  if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cant mute someone thats higher than you.");

  let role = message.guild.roles.find(r => r.name === "Bad Boys(Muted)");
  if(!role) {
    try{
        role = await message.guild.createRole({
          name: "Bad Boys(Muted)",
          color: "#ff0000",
          permissions: []
        });

        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
    }catch (e) {
      console.log(e.stack);
    }
  }

  if(toMute.roles.has(role.id)) return message.channel.send("This user has already been muted");

  Bot.mutes[toMute.id] = {
    guild: message.guild.id,
    time: Date.now() + parseInt(args[2]) * 1000
  }
    await(toMute.addRole(role));
  fs.writeFile("./mutes.json", JSON.stringify(Bot.mutes, null, 4), err => {
    if(err) throw err;
    message.channel.send("I have muted this user!");
  } );


}

module.exports.help = {
    name: "mute",
    description: "Mutes user",
    usage: ">mute [@user] [Time]",
    requriredPerms: "MANAGE_MESSAGES, ADMINISTRATOR"
}
