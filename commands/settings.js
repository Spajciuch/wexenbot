const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
    var firebase = require('firebase');
var database = firebase.database();
        database.ref(`/ustawienia/${message.guild.id}/prefix`).once('value')
      .then(prefix => {
        database.ref(`/ustawienia/${message.guild.id}/admin`).once('value')
        .then(admin => {
            database.ref(`/ustawienia/${message.guild.id}/jest`).once('value')
            .then(jest => {
              database.ref(`/ustawienia/${message.guild.id}/everyone`).once('value')
              .then(everyone => {
      if(!args[0]) {
        const embed = {
     "title": 'Settings on ' + message.guild.name,
     "description": "All settings:",
     "color": config.neoney_color,
     "footer": {
       "icon_url": config.avatar_url,
       "text": "weXen"
     },
     "fields": [
       {
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
    message.channel.send({ embed })
      } else if(args[0] == 'prefix') {
        if(!message.member.hasPermission('MANAGE_GUILD')) return eval(config.no_permissions);
        if(args[1] == '') return message.reply('You didn\'t specify a prefix!')
        const prefixo = args.shift()
        firebase.database().ref('ustawienia/' + message.guild.id).set({
        prefix: args.join(" "),
        jest: jest.val(),
        admin: admin.val(),
        everyone: everyone.val()
      });
        message.channel.send(`New prefix is \`${args.join(" ")}\``);
      } else if(args[0] == 'util') {
       if(!message.member.hasPermission('MANAGE_GUILD')) return message.react(client.guilds.get("438388747088822292").emojis.get("464156534587260958"));
        if(args[1] == 'on') {
              firebase.database().ref('ustawienia/' + message.guild.id).set({
        admin: true,
        jest: jest.val(),
        prefix: prefix.val(),
        everyone: everyone.val()
      });
          message.channel.send('Util commands are now `on`!');
        } else if(args[1] == 'off') {
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
      } else if(args[0] == "everyone") {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.react(client.guilds.get("438388747088822292").emojis.get("464156534587260958"));
        if(args[1] == 'on') {
              firebase.database().ref('ustawienia/' + message.guild.id).set({
        admin: admin.val(),
        jest: jest.val(),
        prefix: prefix.val(),
        everyone: true
      });
          message.channel.send('Everyone and here alert is now `on`!');
        } else if(args[1] == 'off') {
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
module.exports.help = {
  name: "settings",
  category: "info"
}const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
    var firebase = require('firebase');
var database = firebase.database();
        database.ref(`/ustawienia/${message.guild.id}/prefix`).once('value')
      .then(prefix => {
        database.ref(`/ustawienia/${message.guild.id}/admin`).once('value')
        .then(admin => {
            database.ref(`/ustawienia/${message.guild.id}/jest`).once('value')
            .then(jest => {
              database.ref(`/ustawienia/${message.guild.id}/everyone`).once('value')
              .then(everyone => {
      if(!args[0]) {
        const embed = {
     "title": 'Settings on ' + message.guild.name,
     "description": "All settings:",
     "color": config.neoney_color,
     "footer": {
       "icon_url": config.avatar_url,
       "text": "weXen"
     },
     "fields": [
       {
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
    message.channel.send({ embed })
      } else if(args[0] == 'prefix') {
        if(!message.member.hasPermission('MANAGE_GUILD')) return eval(config.no_permissions);
        if(args[1] == '') return message.reply('You didn\'t specify a prefix!')
        const prefixo = args.shift()
        firebase.database().ref('ustawienia/' + message.guild.id).set({
        prefix: args.join(" "),
        jest: jest.val(),
        admin: admin.val(),
        everyone: everyone.val()
      });
        message.channel.send(`New prefix is \`${args.join(" ")}\``);
      } else if(args[0] == 'util') {
       if(!message.member.hasPermission('MANAGE_GUILD')) return message.react(client.guilds.get("438388747088822292").emojis.get("464156534587260958"));
        if(args[1] == 'on') {
              firebase.database().ref('ustawienia/' + message.guild.id).set({
        admin: true,
        jest: jest.val(),
        prefix: prefix.val(),
        everyone: everyone.val()
      });
          message.channel.send('Util commands are now `on`!');
        } else if(args[1] == 'off') {
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
      } else if(args[0] == "everyone") {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.react(client.guilds.get("438388747088822292").emojis.get("464156534587260958"));
        if(args[1] == 'on') {
              firebase.database().ref('ustawienia/' + message.guild.id).set({
        admin: admin.val(),
        jest: jest.val(),
        prefix: prefix.val(),
        everyone: true
      });
          message.channel.send('Everyone and here alert is now `on`!');
        } else if(args[1] == 'off') {
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
module.exports.help = {
  name: "settings",
  category: "info"
}
