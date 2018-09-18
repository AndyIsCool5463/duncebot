module.exports.run = async (Bot,message,args) => {
  let msg = args[0];
  message.channel.send(msg);

}

module.exports.help = {
    name: "mic"
}
