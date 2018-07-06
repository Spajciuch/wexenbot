const Discord = require("discord.js"); //eslint-disable-line no-unused-vars
module.exports.run = async(client, message, args, config) => {
  const fs = require("fs");
  const unzip = require("unzip");
  const http = require("https");

  const file = fs.createWriteStream("./downloads/file.zip");
  http.get("https://fonts.google.com/download?family=" + args.join(" "), function(response) {
    response.pipe(file);
  });
  fs.createReadStream("./downloads/file.zip").pipe(unzip.Extract({ path: "./.fonts" }));
};
module.exports.help = {
  name: "addfont",
  category: "kategoria"
};