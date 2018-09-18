module.exports.run = async (Bot,message,args) => {
  const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
};
if (message.content.startsWith(">" + "eval")) {
if(message.author.id !== "0859738556d31d34de4c7cf532000218") return;
try {
  const code = args.join(" ");
  let evaled = eval(code);

  if (typeof evaled !== "string")
    evaled = require("util").inspect(evaled);

  message.channel.send(clean(evaled), {code:"xl"});
} catch (err) {
  message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
}
};
}

module.exports.help = {
    name: "eval",
    description: "says Fuck you to person mentioned.",
    usage:"[@User]",
    requriredPerms: "MANAGE_MESSAGES, ADMINISTRATOR"
}
