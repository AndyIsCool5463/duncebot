module.exports.run = async (Bot,message,args) => {
  let status = args[0];
  if(!status || status != "online" || 'dnd' || 'donotdisturb' || 'away' || 'idle') return(message.channel.send("Enter Valid Status."));
  if(args[0] === "online") {
    Bot.user.setStatus('online');
    message.channel.send("Set Bot Status to: **Online**")
  }else if(status === 'dnd' || 'donotdisturb') {
    Bot.user.setStatus('dnd');
    message.channel.send("Set Bot Status to: **Do Not Disturb**")
  }else if(status === 'away') {
    Bot.user.setStatus('idle');
    message.channel.send("Set Bot Status to: **Away**")
  };

}

module.exports.help = {
    name: "changestatus"
}
