const Discord = require('discord.js');
const botSettings = require('./botsettings.json');
const Bot = new Discord.Client();
const fs = require("fs");
// const weather = require('weather-js');
const mysql = require("mysql");
//const sqlite3 = require("sqlite3");
const prefix = botSettings.prefix;
//const YouTube = require("simple-youtube-api");
//const youtube = new YouTube('AIzaSyB81t3CbxngSdgCWRvUlBj5uFfHCrj8klU');
Bot.commands = new Discord.Collection();
Bot.mutes = require("./mutes.json");

fs.readdir("./cmds/", (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log("No Commands to load!");
    return;
  }
  console.log(`Loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded`);
    Bot.commands.set(props.help.name, props);
  });
});

// Logs Bot into Discord API
Bot.login(botSettings.token);

Bot.on("ready", async () => {
  console.log(`${Bot.user.username} has started, with ${Bot.users.size} users, in ${Bot.channels.size} channels of ${Bot.guilds.size} guilds.`);
  console.log(`Ready to recive commands.`)
  // Bot.user.setStatus('dnd');
  Bot.user.setActivity(`Hosting ${Bot.guilds.size} with ${Bot.users.size} members`);
  Bot.user.setUsername("DunceBot");
  Bot.setInterval(() => {
    for( let i in Bot.mutes) {
      let time = Bot.mutes[i].time;
      let guildId = Bot.mutes[i].guild;
      let guild = Bot.guilds.get(guildId);
      let member = guild.members.get(i);
      let mutedRole = guild.roles.find(r => r.name === "Bad Boys(Muted)");
      if(!mutedRole) continue;

      if(Date.now() > time) {
        console.log(`${i} is now able to be unmuted`)
        member.removeRole(mutedRole);
        delete Bot.mutes[i];

        fs.writeFile("./mutes.json", JSON.stringify(Bot.mutes), err => {
          if(err) throw err;
          console.log(`I have unmuted ${member.user.tag}.`);
        });
      }
    }
  }, 5000);

    try {
      let link = await Bot.generateInvite(["ADMINISTRATOR"]);
      console.log(link);
    } catch (e) {
        console.log(e.stack);
    }
});
var con = mysql.createConnection({
  host:"localhost",
  port:"2000",
  user:"root",
  password:"root",
  database:"xpdb"
})

con.connect(err => {
  if(err) throw err;
  console.log("Conected to database")
})

function generateXP() {
  let min = 5;
  let max = 30;
  return Math.floor(Math.random() * (max - min + 1) + 10)
};
Bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  // mysq
  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
    if(err) throw err;

    let sql;

    if(rows.length < 1) {
        sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${generateXP()})`;
    } else {
      let xp = rows[0].xp;
      sql = `UPDATE xp SET xp = ${xp + generateXP()} WHERE id = '${message.author.id}'`;
    }
    con.query(sql)
  })
    // end muyslq
  let messageArray = message.content.split(' ');
      let command = messageArray[0]
      let args = messageArray.slice(1);

      let cmd = Bot.commands.get(command.slice(prefix.length));
      if (cmd) cmd.run(Bot, message, args, con);
});



const queue = new Map();


Bot.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;


	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
  let prefix = ">";

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`âœ… Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('ðŸ†˜ I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === `skip`) {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === `stop`) {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === `volume`) {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === `np`) {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`ðŸŽ¶ Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === `queue`) {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('â¸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === `resume`) {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('â–¶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`âœ… **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`ðŸŽ¶ Start playing: **${song.title}**`);
}
