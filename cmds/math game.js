module.exports.run = async (Bot,message,args) => {
  var difficultyS = args[0];
  if(!args[0]) {
    return(message.channel.send("Enter a Difficulty"));
  }
  function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};
if(difficultyS === "1" || "2") {
  let number1 = getRandomInt(20)
}
console.log(number1)
}

module.exports.help = {
    name: "mathg"
}
