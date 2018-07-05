const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
    const Canvas = require('canvas')
    const snekfetch = require('snekfetch')
    const { body: bg } = await snekfetch.get(args[0]);
    const background = await Canvas.loadImage(bg);
    const canvas = Canvas.createCanvas(background.width, background.height);
    const ctx = canvas.getContext('2d');
    var text = args.slice(1).join(' ')
    var textTop = text.split(" | ")[0];
    var textBottom = text.split(" | ")[1];
 
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  const middle = canvas.width / 2

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    function applyText(canvas, text) {
        const ctx = canvas.getContext('2d');
      
        // Declare a base size of the font
        let fontSize = 900;
      
        do {
            // Assign the font to the context and decrement it so it can be measured again
            ctx.font = `${fontSize -= 10}px Impact`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while(ctx.measureText(text).width > canvas.width - 10 || ctx.measureText("█").width * 2 > canvas.height / 4)
      
        // Return the result to use in the actual canvas
        return ctx.font;
      };

  
    // Slightly smaller text placed above the member's display name


    function drawStroked(canvas, text, x, y, baseline) {
            ctx.font = applyText(canvas, text);
            ctx.strokeStyle = 'black';
            ctx.textAlign="center"; 
            ctx.lineWidth = 3;
            ctx.textBaseline = baseline;
            ctx.strokeText(text, x, y);
            ctx.fillStyle = 'white';
            ctx.fillText(text, x, y);
    }
    drawStroked(canvas, textTop.toUpperCase(), middle, 5, "top");
    drawStroked(canvas, textBottom.toUpperCase(), middle, canvas.height - 5, "bottom");
  
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'meme.png');
  
    message.channel.send(`Your meme!`, attachment);
}
module.exports.help = {
  name: "meme",
  category: "fun"
}