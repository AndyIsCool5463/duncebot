const fs = require("fs");
var canvas = require("canvas");
//const Image = require('purified-image');
const fse = require('fs-extra');
const jimp = require('jimp');
module.exports.run = async (Bot,message,args) => {
  let msgA = message.author;
  let userID = msgA.id;
  var delay = ( function() {
  var timer = 0;
  return function(callback, ms) {
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
  };
})();
  // let image = new Image(`C:/Users/WILLIAM/Desktop/Node.js Projects/Duncebot2/cmds/images/beach2.png`);
  // let text = args[0] || "undefined";
  // image
  //   .loadFont('/res/OpenSans-Regular.ttf')
  //   .draw(ctx => {
  //     ctx.fillStyle = '#000000';
  //     ctx.setFont('Open Sans Regular', 20);
  //     ctx.fillText(text, 30, 30);
  //   })
  //   .save('out.jpg')
  //   .then(() => console.log('saved'));

message.channel.send("Retriving Rank ;) Pls wait up to 20s because my pc is slow af.")
    delay(function(){
      message.channel.send({files: [
        {
          attachment: 'C:/Users/WILLIAM/Desktop/Node.js Projects/Duncebot2/out.jpg',
          name: 'loljepg.jpg'

        }
      ]});
  }, 25000 ); // end delay

}
module.exports.help = {
    name: "canvas2"
}
