const ThunderAPI = require("thunderapi");
module.exports.run = async (Bot,message,args) => {
  const thunderAPI = new ThunderAPI();

// The player can be any in-game player. In this example,
// we'll get the profile of the player Abinavsk i, and log
// the title he set.
thunderAPI.getPlayer("Tomcat214")
  // We handle the data returned here, in this case
  // by logging the title the player has set.
  .then(user => console.log("Title:", data.title))
  // If an error occurred, we catch it here!
  .catch(err => console.error("Oh no, an error occurred!\n", err));
}
module.exports.help = {
    name: "wt"
}
