const Discord = require('discord.js')
 const Music = require('discord.js-musicbot-addon-v2');
 var ffmpeg = require('ffmpeg');
 const config = require('./config.json')
 const client = new Discord.Client()
 const fs = require('fs')
 var firebase = require('firebase')

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
 
 client.commands = new Discord.Collection()
 var d = new Date()
 var hour = d.getHours() +2
 var minute = d.getMinutes()
 var minute = `${minute}`.padStart(2, 0)
 var time = hour + ":" + minute
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
     client.user.setActivity(">help", {type: "LISTENING"});
     console.log('[client] Logowanie')
     console.log("[client] Wystartowano o " + time)
     console.log(`[client] Zalogowano jako: ${client.user.username}`);
     console.log("[client] Bot obsługuje " + client.users.size + " osób, " +  client.channels.size + " kanałów, " + client.guilds.size + " serwerów");
 //\x1b[36m%s\x1b[0m
 });
 fs.readdir(`./commands/`,(err, files)=>{
   if(err) console.log(err)
   let jsfile = files.filter(f => f.split(".").pop() == "js")
   if(jsfile.length <= 0){
     console.log("Nie znaleziono komend!")
   }
   jsfile.forEach((f,i)=> {
     let props = require(`./commands/${f}`)
   })
 })
 client.on("message", async message => {
   const dm = message.channel.type === 'dm'
   if(!dm) {
       database.ref(`/ustawienia/${message.guild.id}/jest`).once('value')
     .then(snapshot => {
       if(snapshot.val() !== '1') {
                firebase.database().ref('ustawienia/' + message.guild.id).set({
    admin: true,
    prefix: '>',
    jest: '1'
  });
  message.channel.send('Prefix generated, options soon!')
          }
       })
    .catch(error => {
             firebase.database().ref('ustawienia/' + message.guild.id).set({
    admin: true,
    prefix: '>',
    jest: '1'
  });
  message.channel.send('Prefix generated, options soon!')
       })
   }
  
   if (message.author.bot) return;
  
  if(!dm) {
    database.ref(`/ustawienia/${message.guild.id}/prefix`).once('value')
     .then(snapshot => {
    if(!message.content.startsWith(config.prefix) && !message.content.startsWith(snapshot.val())) return;
     if(message.content.startsWith(config.prefix)) {
       const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
   const command = args.shift().toLowerCase();
         let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
           let commandfile = client.commands.get(cmd.slice(config.prefix.length));
     } else {
      const args = message.content.slice(snapshot.val().length).trim().split(/ +/g);
   const command = args.shift().toLowerCase();
         let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
           let commandfile = client.commands.get(command);
     }

 if(commandfile) commandfile.run(client, message, args, config);
   if(command == 'help'){
     fs.readdir(`./commands/`,(err, files)=>{
   if(err) console.log(err)
   let jsfile = files.filter(f => f.split(".").pop() == "js")
 
    let help = new Discord.RichEmbed()
         .setAuthor("List of Commands")
         .setColor(config.embed_color)
         .addField("Total commands: ", jsfile.length - 1)
         .addField("Music", '`musichelp`')
         .addField("Info", `${client.commands.filter(cmd => cmd.help.category === 'info').map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
         .addField("Utility", `${client.commands.filter(cmd => cmd.help.category === 'util').map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
         .addField("Fun", `${client.commands.filter(cmd => cmd.help.category === 'fun').map(cmd => `\`${cmd.help.name}\``).join(", ")}`)
    message.channel.send({embed: help})
     })
   }
 
 if(command == 'dtb'){
    database.ref(`/ustawienia/${message.guild.id}/${args[0]}`).once('value')
     .then(snapshot => message.channel.send(snapshot.val()))
    .catch(error => message.channel.send('Brak takiego pliku'))
    
 }
      if(command == 'username') {
   if(message.author.id !== '367390191721381890') return message.reply("You aren't permitted to do that!")
   client.user.setUsername(args.join(" "))
   console.log(`Zmieniono mój nick`)
   message.channel.send("Done")
  
   }
         })
  }
 });
 //@everyone
 client.on("message", message => {
   if(message.channel.type.toLowerCase() == 'dm') return;
   if(message.author.id == message.guild.owner.id) return
   if(message.content.includes("@everyone") || message.content.includes("@here")) {
     let embed = new Discord.RichEmbed()
     .setTitle("Someone used @everyone or @here")
     .addField("Server", message.guild.name,true)
     .addField("Member", message.author, true)
     .addField("Channel",message.channel)
     .setColor(config.embed_color)
     message.guild.owner.send({embed});
     message.reply('Hey! Don\'t do that!')
   }
   if(message.content == '<@460153151073288202>' || message.content == '<!@460153151073288202>') {
    message.channel.send('What?')
   }
 })
 
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
