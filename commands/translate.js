const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
  const translate = require('google-translate-api');
    if (args[0]) {
        let from_language = "auto" // default languages
        let to_language = "en" // default languages

        var tobe_translated = "";
        if (args[0].startsWith("from:")) { // Checking if there is a from:language & to:language, this part is not optimized
            from_language = args[0].slice(5)
            tobe_translated = args.slice(1).join(" ")
            if (args[1].startsWith("to:")) {
                to_language = args[1].slice(3)
                tobe_translated = args.slice(2).join(" ")
            }
        } else if (args[0].startsWith("to:")) { // Checking if there is a to:language & from:language, Yes I check 2 times :/
            to_language = args[0].slice(3)
            tobe_translated = args.slice(1).join(" ")
            if (args[1].startsWith("from:")) {
                from_language = args[1].slice(5)
                tobe_translated = args.slice(2).join(" ")
            }
        }
        translate(tobe_translated, {from: from_language, to: to_language})
          .then(res => {
            from_language = res.from.language.iso
            if (res.from.text.value) tobe_translated = res.from.text.value
            let translateembed = new Discord.RichEmbed()
                .setTitle("Translate") // Optionnal stuff
                .setColor(config.embed_color) // Optionnal stuff
                .addField("from: " + from_language, tobe_translated)
                .addField("to: " + to_language, res.text)
                .setThumbnail("https://cdn.dribbble.com/users/1341307/screenshots/3641494/google_translate.gif") // Optionnal stuff
            message.channel.send(translateembed)
        })
        .catch(err => {
            console.log(":x: Usage: `" + config.prefix + "translate [from:iso] [to:iso] <some text>` \nThe from: and to: are optional, you can check out <http://bit.ly/ISO_codesWiki> for the iso codes\nExample: ```" + config.prefix + "translate from:en to:es Hello, can you help me?```")
        });
    } else {
        message.channel.send(":x: Usage: `" + config.prefix + "translate [from:iso] [to:iso] <some text>` \nThe from: and to: are optional, you can check out <http://bit.ly/ISO_codesWiki> for the iso codes\nExample: ```" + config.prefix + "translate from:en to:es Hello, can you help me?```")
    }
}
module.exports.help = {
  name: "translate",
  category: "info"
}
