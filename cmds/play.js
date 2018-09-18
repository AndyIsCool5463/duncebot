//const ytdl = require('ytdl-core');
const fs = require('fs');
//const ffmpeg = require('ffmpeg');
const Discord = require('discord.js');
const opus = require('opusscript');
module.exports.run = async (Bot,message,args) => {
    let youtubelink = args[0];
    if(!youtubelink) return(message.channel.send("Enter a link"));
    // let metadata = ytdl.getInfo(youtubelink, [callback(err, info)]);
    if(ytdl.validateURL(args[0]) === false) return(message.channel.send("Enter a valid youtube link"))
    // let voiceID = message.author.voiceChannel === "General";
    var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();
    if(message.member.voiceChannel === false || undefined) {
      message.channel.send("Please Join a voice channel.");
    };
    if(ytdl.validateURL(args[0]) === true) {
    let videoID = ytdl.getURLVideoID(args[0]);
    var VC = message.member.voiceChannel;
    //ytdl(youtubelink, { filter: (format) => format.container === 'mp4'}).pipe(fs.createWriteStream('video.mp4'));
   ytdl(videoID).pipe(fs.createWriteStream('video.mp3'));
   message.channel.send("Video downloading...");
   message.channel.send("Please wait up to 20 seconds for video to download.");

    // VC.join()
    //     .then(connection => {
    //         const dispatcher = connection.playFile('C:/Users/WILLIAM/Desktop/Node.js Projects/Duncebot2/video.mp4');
    //         dispatcher.on("end", end => {VC.leave()});
    //     });
  };
  delay(function(){
    VC.join()
        .then(connection => {
            const dispatcher = connection.playFile('C:/Users/WILLIAM/Desktop/Node.js Projects/Duncebot2/video.mp3');
            dispatcher.on("end", end => {VC.leave()});
        });
}, 20000 ); // end delay
}
module.exports.help = {
    name: "play6"
}
