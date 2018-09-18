const fs = require("fs");
//var gm = require('gm');
const fse = require('fs-extra');
const Jimp = require('jimp');
module.exports.run = async (Bot,message,args) => {
  let image = 'C:/Users/WILLIAM/Desktop/Node.js Projects/Duncebot2/cmds/images/beach2.png';
  var delay = ( function() {
  var timer = 0;
  return function(callback, ms) {
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
  };
})();


Jimp.read('C:/Users/WILLIAM/Desktop/Node.js Projects/Duncebot2/cmds/images/beach2.png')
  .then(beach2 => {
    return beach2
      .quality(100) // set JPEG quality
      .write(`C:/Users/WILLIAM/Desktop/Node.js Projects/Duncebot2/userProf/${userID}/user.png`); // save
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
            attachment: `C:/Users/WILLIAM/Desktop/Node.js Projects/Duncebot2/userProf/${userID}/user.png`,
            name: 'user.png'

          }
        ]});
    }, 5000 ); // end delay


}

module.exports.help = {
    name: "fsw_d"
}
