const api = "https://jsonplaceholder.typicode.com/posts";
const snekfetch = require("snekfetch");
module.exports.run = async (Bot,message,args) => {
    snekfetch.get(api).then(console.log);
}

module.exports.help = {
    name: "json"
}
