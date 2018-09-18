//const api = "http://api.openweathermap.org/data/2.5/weather?q=Moscow&APPID=0859738556d31d34de4c7cf532000218";
//const api = "https://jsonplaceholder.typicode.com/posts";
const api = "https://api.darksky.net/forecast/5572bf6d9e27530b7536665e9100e7c5/37.8267,-122.4233"
//const YQL = require('yql');
const snekfetch = require('snekfetch');
const request = require('request');
const Discord = require('discord.js');
const argv = require('yargs').argv;
module.exports.run = async (Bot,message,args) => {

let apiKey = '0859738556d31d34de4c7cf532000218';
let userCity = args[0];
if(!userCity) return message.channel.send("Please enter a city or city ID");
let city = argv.f || userCity;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    //message.channel.send(`It's ${weather.main.temp} degrees in ${weather.name}!`)
    console.log(weather);
    let embed = new Discord.RichEmbed()
    .setAuthor("DunceWeather", message.author.avatarURL)
    .setDescription(`Weather in ${weather.name}`)
    .setColor("#1865e0")
    .addField("Temperature", `Currently: ${weather.main.temp}°F`)
    .addField("Humidity", weather.main.humidity)
    .addField("Country", weather.sys.country)
    .addField("Air Pressure", weather.main.pressure)
    message.channel.sendEmbed(embed);
  }
});
  }
module.exports.help = {
    name: "weather",
    description: "Displays weather",
    usage: ">weather [city]",
    requriredPerms: "MANAGE_MESSAGES, ADMINISTRATOR"
}
