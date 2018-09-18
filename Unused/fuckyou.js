module.exports.run = async (Bot,message,args) => {
  if(!args[0]) return(message.channel.send("Mention a user please"));
  let mentioned = message.mentions.users.first();
  if(!mentioned) return message.reply("Fuck you");
  let vulgarArray = ['Fuck you!',
  `Ur a cunt ${mentioned}`,
  `You're a Big faggot ${mentioned}`,
  `Look its ${mentioned}! He has a small penis!`,
  `You're a retard ${mentioned}`];
  let randomMatch = vulgarArray[Math.floor(Math.random() * vulgarArray.length)];
  message.channel.send(randomMatch);
}

module.exports.help = {
    name: "vulgar",
    description: "says Fuck you to person mentioned.",
    usage:"[@User]",
    requriredPerms: "MANAGE_MESSAGES, ADMINISTRATOR"
}
