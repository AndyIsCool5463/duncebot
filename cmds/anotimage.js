const fs = require("fs");
// var gm = require('gm');
module.exports.run = async (Bot,message,args) => {
  gm("C:\Users\WILLIAM\Desktop\DunceBot\trollface.jpg")
.stroke("#ffffff")
.drawCircle(10, 10, 20, 10)
.font("Helvetica.ttf", 12)
.drawText(30, 20, "GMagick!")
.write("C:\Users\WILLIAM\Desktop\DunceBot/dummy.jpg", function (err) {
  if (!err) console.log('done');
});
//   let msg = await message.channel.send("Generating Avatar...");
//   let target = message.mentions.users.first() || message.author;
//    await message.channel.send({files: [
//     {
//         attachment: "./faggot.png",
//         name: "avatar.png"
//     }
//   ]});
//   msg.delete();
//
}

module.exports.help = {
    name: "anotimage"
}
