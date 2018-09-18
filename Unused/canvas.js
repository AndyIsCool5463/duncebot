const fs = require("fs");
var canvas = require("canvas");
module.exports.run = async (Bot,message,args) => {
let texxt = args[0];
  var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(934, 282)
  , ctx = canvas.getContext('2d');

ctx.font = '60px Impact';
ctx.rotate(0);
ctx.fillText(texxt, 451, 145);


var te = ctx.measureText(texxt);
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.color = 'rgba(139,85,107,0.5)';
ctx.beginPath();
ctx.lineTo(451, 147);
ctx.lineTo(451 + te.width, 147);
ctx.stroke();


var fs = require('fs')
  , out = fs.createWriteStream(__dirname + '/images/user.png')
  , stream = canvas.pngStream();

stream.on('data', function(chunk){
  out.write(chunk);
});

stream.on('end', function(){
  console.log('saved png');
})


message.channel.send({files: [
  {
    attachment: __dirname + '/images/user.png',
    name: 'loljepg.png'

  }
]});

}
module.exports.help = {
    name: "canvas"
}
