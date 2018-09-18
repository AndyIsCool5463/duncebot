//const api = "http://api.openweathermap.org/data/2.5/weather?q=Moscow&APPID=0859738556d31d34de4c7cf532000218";
//const api = "https://jsonplaceholder.typicode.com/posts";
//const api = "https://api.darksky.net/forecast/5572bf6d9e27530b7536665e9100e7c5/37.8267,-122.4233"
//const YQL = require('yql');
const snekfetch = require('snekfetch');
const request = require('request');
const Discord = require('discord.js');
const argv = require('yargs').argv;
module.exports.run = async (Bot,message,args) => {
  let deckcount = args[0];
  if(!deckcount) return(message.channel.send("Enter Number"));
  if(deckcount === "NEIN1") {
    message.channel.send("Phew.... the bomb didnt explode!");
  } else if(deckcount === "NEIN2") {
    message.channel.send("ALLAU AKBAR");
  } else if(deckcount !== "NEIN1" || "NEIN2") return(message.channel.send("SHOTS FIRED I REPEAT SHOTS FIRED"));
  }
module.exports.help = {
    name: "testcommand",
    description: "Tests My knolegshittygrigr SSSSSTRRRRRRRROOOOOOOOOOOOOOOOOKKKKKKKKEEEEEEEEEE",
    usage: ">weather [city]",
    requriredPerms: "MANAGE_MESSAGES, ADMINISTRATOR"
}
