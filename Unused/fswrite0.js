const fs = require("fs");
var gm = require('gm');
const fse = require('fs-extra');
const Jimp = require('jimp');
module.exports.run = async (Bot,message,args) => {
  let image = 'C:/Users/WILLIAM/Desktop/DunceBot/cmds/images/beach2.png';
  var delay = ( function() {
  var timer = 0;
  return function(callback, ms) {
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
  };
})();
  let msgA = message.author;
  let userID = msgA.id;
  const dirU = 'C:/Users/WILLIAM/Desktop/DunceBot/userProf'
  const dirUser = `C:/Users/WILLIAM/Desktop/Duncebot/userProf/${userID}`
  const desiredMode = 0o2775
  const options = {
  mode: 0o2775
}

fse.ensureDir(dirU, err => {
  console.log(err) // => null
  // dir has now been created, including the directory it is to be placed in
});

fse.ensureDir(dirUser, err => {
  console.log(err)
});

Jimp.read('C:/Users/WILLIAM/Desktop/DunceBot/cmds/images/beach2.png')
  .then(beach2 => {
    return beach2
      .quality(100) // set JPEG quality
      .write(`C:/Users/WILLIAM/Desktop/Duncebot/userProf/${userID}/user.png`); // save
  })
  .catch(err => {
    console.error(err);
  });
  Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
    // load font from .fnt file
    image.print(font, x, y, message); // print a message on an image. message can be a any type
    image.print(font, x, y, message, maxWidth); // print a message on an image with text wrapped at maxWidth
  });

  message.channel.send("Please wait.")
      delay(function(){
        message.channel.send({files: [
          {
            attachment: `C:/Users/WILLIAM/Desktop/Duncebot/userProf/${userID}/user.png`,
            name: 'user.png'

          }
        ]});
    }, 5000 ); // end delay


}

module.exports.help = {
    name: "fsw"
}
