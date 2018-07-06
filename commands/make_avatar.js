const Discord = require('discord.js')
module.exports.run = async (client, message, args, config) => {
    if(args[0] == "-adv") {
        const applyText = (canvas, text, font) => {
            const ctx = canvas.getContext('2d');
            // Declare a base size of the font
            let fontSize = 700;
          
            do {
                // Assign the font to the context and decrement it so it can be measured again
                ctx.font = `${fontSize -= 10}px "${font}"`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 310);
          
            // Return the result to use in the actual canvas
            return ctx.font;
          };
          const json = JSON.parse('{\n "' + args.slice(1).join(" ").replace(/: +/g, '": "').replace(/, +/g, '", "') + '"\n}');
          const Canvas = require('canvas')
          const snekfetch = require('snekfetch')
          const canvas = Canvas.createCanvas(1024, 1024);
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = json.bg_color
          ctx.fillRect(0, 0, 1024, 1024)
          ctx.beginPath();
          ctx.lineWidth="15";
          ctx.strokeStyle=json.stroke_color
          ctx.rect(0,0,canvas.width,canvas.height);
          ctx.stroke();
          let font = "Dosis"
          font = json.font
          if(!font) {
            font = "Dosis"
          }
          const text = json.text
        
          ctx.fillStyle = json.text_color
          ctx.font = applyText(canvas, text, font)
          ctx.textBaseline = "middle";
          ctx.textAlign="center";
          ctx.fillText(text, canvas.width/2, canvas.height/2)
        
          const attachment = new Discord.Attachment(canvas.toBuffer(), 'avatar.png');
        
        message.channel.send(`I've tried... ${message.member}`, attachment);
    } else {
  const applyText = (canvas, text, font) => {
    const ctx = canvas.getContext('2d');
  
    // Declare a base size of the font
    let fontSize = 700;
  
    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px "${font}"`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 310);
  
    // Return the result to use in the actual canvas
    return ctx.font;
  };
  function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}
function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}
  const Canvas = require('canvas')
  const snekfetch = require('snekfetch')
  const canvas = Canvas.createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = args[0];
  ctx.fillRect(0, 0, 1024, 1024)
  ctx.beginPath();
  ctx.lineWidth="15";
  ctx.strokeStyle=invertColor(args[0]);
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.stroke();
  let font = "Dosis"
  font = args.slice(1).join(" ").split(" | ")[1]
  if(!font) {
    font = "Dosis"
  }
  const text = args.slice(1).join(" ").split(" | ")[0]

  ctx.fillStyle = invertColor(args[0], true);
  ctx.font = applyText(canvas, text, font)
  ctx.textBaseline = "middle";
  ctx.textAlign="center";
  ctx.fillText(text, canvas.width/2, canvas.height/2)

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'avatar.png');

message.channel.send(`I've tried... ${message.member}`, attachment);
    }
}
module.exports.help = {
  name: "make_avatar",
  category: "fun"
}
