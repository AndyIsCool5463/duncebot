module.exports.run = async (Bot,message,args) => {
    message.channel.send('Pong! Your ping is `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
}

module.exports.help = {
    name: "ping"
}
