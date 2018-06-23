const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client()
const fs = require('fs')
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
    console.log(`[Załadowano] ${f}`)
    client.commands.set(props.help.name, props)
  })
})
client.on("message", async message => {
if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(message.author.bot) return;

  let prefix = config.prefix
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
    let commandfile = client.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(client ,message,args);
  if(command == 'help'){
   let help = new Discord.RichEmbed()
        .setAuthor("List of Commands")
        .setColor(config.embed_color)
        .addField("Info", `${client.commands.filter(cmd => cmd.help.category === 'info').map(cmd => `\`${cmd.help.name}\``).join(", ")}`, true)
        .addField("Utility", `${client.commands.filter(cmd => cmd.help.category === 'util').map(cmd => `\`${cmd.help.name}\``).join(", ")}`, true)
    message.channel.send({embed: help})
  }
});
client.login(process.env.TOKEN)
