var Discord = require('discord.js');
var Music = require('discord.js-musicbot-addon-v2');
var ffmpeg = require('ffmpeg');
var config = require('./config.json');
var client = new Discord.Client();
var fs = require('fs');
var Canvas = require('canvas');
var snekfetch = require('snekfetch');
var reactionrem = require('@spyte-corp/discord.js-remove-on-reaction');
client.commands = new Discord.Collection();

var firebase = require('firebase');

var config2 = {
  apiKey: "AIzaSyAuwf5sChMywJkDNHpgv9GDTWo5DWcCvlM ",
  authDomain: "wexenbot.firebaseapp.com",
  databaseURL: "https://wexenbot.firebaseio.com/",
  projectId: "wexenbot",
  storageBucket: "wexenbot.appspot.com",
  messagingSenderId: "158046768135"
};
firebase.initializeApp(config2);
var database = firebase.database();

var d = new Date();
var hour = d.getHours() + 2;
var minute = d.getMinutes();
var minute = `${minute}`.padStart(2, 0);
var time = hour + ":" + minute;
switch (new Date().getDay()) {
  case 0:
    day = " w Niedzielę";
    break;
  case 1:
    day = "w Poniedziałek";
    break;
  case 2:
    day = "we Wtorek";
    break;
  case 3:
    day = "w Środę";
    break;
  case 4:
    day = "w Czwartek";
    break;
  case 5:
    day = "w Piątek";
    break;
  case 6:
    day = "w Sobotę";
}
client.on("ready", () => {
  const channelgeneral = client.channels.find("id", "460167148883410964");
  channelgeneral.send('I\'ve just turned on!')
  client.user.setActivity(">help", {
    type: "WATCHING"
  });
  console.log('[client] Logowanie')
  console.log("[client] Wystartowano o " + time)
  console.log(`[client] Zalogowano jako: ${client.user.username}`);
  console.log("[client] Bot obsługuje " + client.users.size + " osób, " + client.channels.size + " kanałów, " + client.guilds.size + " serwerów");
  //\x1b[36m%s\x1b[0m
});
fs.readdir(`./commands/`, (err, files) => {
  if (err) console.log(err)
  let jsfile = files.filter(f => f.split(".").pop() == "js")
  if (jsfile.length <= 0) {
    console.log("Nie znaleziono komend!")
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    console.log(`[Załadowano] ${f}`)
    client.commands.set(props.help.name, props)
  })
})
client.on("message", async message => {
  var oprefix = "";
  var args = "";
  const dm = message.channel.type === 'dm'
  if (dm) return;
  database.ref(`/ustawienia/${message.guild.id}/jest`).once('value')
    .then(snapshot => {
      if (snapshot.val() !== '2') {
        firebase.database().ref('ustawienia/' + message.guild.id).set({
          admin: true,
          prefix: '>',
          jest: '2',
          everyone: true
        });
        message.channel.send('Config generated, options soon!')
      }
    })
    .catch(error => {
      firebase.database().ref('ustawienia/' + message.guild.id).set({
        admin: true,
        prefix: '>',
        jest: '2',
        everyone: true
      });
      message.channel.send('Config generated, options soon!')
    })

  if (message.author.bot) return;
  database.ref(`/ustawienia/${message.guild.id}/prefix`).once('value')
    .then(snapshot => {
      oprefix = snapshot.val()
      if (!message.content.startsWith(oprefix)) return;
      if (message.content.startsWith(config.prefix)) {
        args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      }
      if (message.content.startsWith(oprefix)) {
        args = message.content.slice(oprefix.length).trim().split(/ +/g);
      }
      const command = args.shift().toLowerCase();
      if (message.author.bot) return;
      let commandfile = client.commands.get(command);
      if (commandfile) {
        message.react(client.guilds.get("438388747088822292").emojis.get("464105258549772289"));
        commandfile.run(client, message, args, config);
      } else if (!commandfile && command !== 'settings' && command !== 'oldhelp') {
        message.react(client.guilds.get("438388747088822292").emojis.get("464107488053166101"))
      }
      if (command == 'oldhelp') {
        fs.readdir(`./commands/`, (err, files) => {
          if (err) console.log(err)
          let jsfile = files.filter(f => f.split(".").pop() == "js")

          let help = new Discord.RichEmbed()
            .setAuthor("List of Commands")
            .setFooter("weXen", config.avatar_url)
            .setTimestamp()
            .setColor(config.embed_color)
            .addField("Total commands: ", jsfile.length - 1)
            .addField("Music", '`musichelp`')
            .addField("Info", `${client.commands.filter(cmd => cmd.help.category === 'info').map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
            .addField("Utility", `${client.commands.filter(cmd => cmd.help.category === 'util').map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
            .addField("Fun", `${client.commands.filter(cmd => cmd.help.category === 'fun').map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
          message.channel.send({
              embed: help
            })
            .then(botmessage => reactionrem(message, botmessage))
        })
      }
      if (command == 'settings') {
        database.ref(`/ustawienia/${message.guild.id}/prefix`).once('value')
          .then(prefix => {
            database.ref(`/ustawienia/${message.guild.id}/admin`).once('value')
              .then(admin => {
                database.ref(`/ustawienia/${message.guild.id}/jest`).once('value')
                  .then(jest => {
                    database.ref(`/ustawienia/${message.guild.id}/everyone`).once('value')
                      .then(everyone => {
                        if (!args[0]) {
                          const embed = {
                            "title": 'Settings on ' + message.guild.name,
                            "description": "All settings:",
                            "color": config.neoney_color,
                            "footer": {
                              "icon_url": config.avatar_url,
                              "text": "weXen"
                            },
                            "fields": [{
                                "name": "Config version",
                                "value": jest.val()
                              },
                              {
                                "name": "Util commands",
                                "value": admin.val() + "\n`settings util <on|off>`"
                              },
                              {
                                "name": "Prefix",
                                "value": prefix.val() + "\n`settings prefix <prefix>`"
                              },
                              {
                                "name": "@everyone and @here alert",
                                "value": everyone.val() + "\n`settings everyone <on|off>`"
                              }
                            ]
                          };
                          message.channel.send({
                            embed
                          })
                        } else if (args[0] == 'prefix') {
                          if (!message.member.hasPermission('MANAGE_GUILD')) return eval(config.no_permissions);
                          if (args[1] == '') return message.reply('You didn\'t specify a prefix!')
                          const prefixo = args.shift()
                          firebase.database().ref('ustawienia/' + message.guild.id).set({
                            prefix: args.join(" "),
                            jest: jest.val(),
                            admin: admin.val(),
                            everyone: everyone.val()
                          });
                          message.channel.send(`New prefix is \`${args.join(" ")}\``);
                        } else if (args[0] == 'util') {
                          if (!message.member.hasPermission('MANAGE_GUILD')) return message.react(client.guilds.get("438388747088822292").emojis.get("464156534587260958"));
                          if (args[1] == 'on') {
                            firebase.database().ref('ustawienia/' + message.guild.id).set({
                              admin: true,
                              jest: jest.val(),
                              prefix: prefix.val(),
                              everyone: everyone.val()
                            });
                            message.channel.send('Util commands are now `on`!');
                          } else if (args[1] == 'off') {
                            firebase.database().ref('ustawienia/' + message.guild.id).set({
                              admin: false,
                              jest: jest.val(),
                              prefix: prefix.val(),
                              everyone: everyone.val()
                            });
                            message.channel.send('Util commands are now `off`!');
                          } else {
                            message.reply('That\'s not a valid option!');
                          }
                        } else if (args[0] == "everyone") {
                          if (!message.member.hasPermission('MANAGE_GUILD')) return message.react(client.guilds.get("438388747088822292").emojis.get("464156534587260958"));
                          if (args[1] == 'on') {
                            firebase.database().ref('ustawienia/' + message.guild.id).set({
                              admin: admin.val(),
                              jest: jest.val(),
                              prefix: prefix.val(),
                              everyone: true
                            });
                            message.channel.send('Everyone and here alert is now `on`!');
                          } else if (args[1] == 'off') {
                            firebase.database().ref('ustawienia/' + message.guild.id).set({
                              admin: admin.val(),
                              jest: jest.val(),
                              prefix: prefix.val(),
                              everyone: false
                            });
                            message.channel.send('Everyone and here alert is now `off`!');
                          } else {
                            message.reply('That\'s not a valid option!');
                          }
                        } else {
                          message.reply('That\'s not a valid option!');
                        }
                      })
                  })
              })
          })
      }


      if (command == 'username') {
        if (message.author.id !== '367390191721381890') return message.react(client.guilds.get("438388747088822292").emojis.get("464156534587260958"));
        client.user.setUsername(args.join(" "))
        console.log(`Zmieniono mój nick`)
        message.channel.send("Done")

      }
    });
});
//@everyone
client.on("message", message => {
  if (message.channel.type.toLowerCase() == 'dm') return;
  if (message.author.id == message.guild.owner.id) return
  database.ref(`/ustawienia/${message.guild.id}/everyone`).once('value')
    .then(everyone => {
      if (!everyone.val()) return;
      if (message.content.includes("@everyone") || message.content.includes("@here")) {
        let embed = new Discord.RichEmbed()
          .setTitle("Someone used @everyone or @here")
          .addField("Server", message.guild.name, true)
          .addField("Member", message.author, true)
          .addField("Channel", message.channel)
          .setColor(config.embed_color)
        message.guild.owner.send({
          embed
        });
        message.reply('Hey! Don\'t do that!')
      }
    })
  if (message.content == '<@460153151073288202>' || message.content == '<!@460153151073288202>') {
    message.channel.send('What?')
  }
})

const applyText = (canvas, text) => {
  const ctx = canvas.getContext('2d');

  // Declare a base size of the font
  let fontSize = 130;

  do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${fontSize -= 10}px Dosis`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
  } while (ctx.measureText(text).width > canvas.width - 300);

  // Return the result to use in the actual canvas
  return ctx.font;
};

client.on('guildMemberAdd', async member => {
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext('2d');

  const background = await Canvas.loadImage('./welcome-image.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#74037b';
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Slightly smaller text placed above the member's display name
  ctx.font = '28px Dosis';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Welcome to the server,', 280, 70);

  // Add an exclamation point here and below
  ctx.font = applyText(canvas, `${member.displayName}!`);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${member.displayName}!`, 318, 165);

  ctx.beginPath();
  ctx.arc(135, 124, 93, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.clip();

  const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 35, 24, 200, 200);

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

  channel.send(`Welcome to the server, ${member}!`, attachment);
});


client.login(process.env.TOKEN)

const music = new Music(client, {
  prefix: config.prefix,
  youtubeKey: config.google,
  embedColor: 16750361,
  enableQueueStat: true,
  botAdmins: [316226442721755137, 367390191721381890],
  clearOnLeave: true,
  disableVolume: true,
  djRole: "@everyone"
});