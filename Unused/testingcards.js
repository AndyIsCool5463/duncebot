//const api = "http://api.openweathermap.org/data/2.5/weather?q=Moscow&APPID=0859738556d31d34de4c7cf532000218";
//const api = "https://jsonplaceholder.typicode.com/posts";
const api = "https://api.darksky.net/forecast/5572bf6d9e27530b7536665e9100e7c5/37.8267,-122.4233"
const YQL = require('yql');
const snekfetch = require('snekfetch');
const request = require('request');
const Discord = require('discord.js');
const argv = require('yargs').argv;
const http = require('http');
module.exports.run = async (Bot,message,args) => {
  let deck

  }
module.exports.help = {
    name: "weather",
    description: "Displays weather",
    usage: ">weather [city]",
    requriredPerms: "MANAGE_MESSAGES, ADMINISTRATOR"
}
