const Discord = require("discord.js");
module.exports.run = async(client, message, args, config) => {
  const Canvas = require("canvas");
  const snekfetch = require("snekfetch");
  const { body: bg } = await snekfetch.get("https://chopra.com/sites/default/files/field/image/ManSleeping.jpg");
  const background = await Canvas.loadImage(bg);
  const canvas = Canvas.createCanvas(background.width, background.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(470, 124, 92, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.clip();

  const { body: buffer } = await snekfetch.get(message.member.user.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 370, 26, 200, 200);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "sleep.png");

  message.channel.send(`Do you feel sleepy, ${message.member}?`, attachment);

};
module.exports.help = {
  name: "sleep",
  category: "fun"
};
