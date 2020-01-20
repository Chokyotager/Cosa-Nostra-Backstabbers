var auxils = require("../auxils.js");

module.exports = async function (message, params, config) {

  if (!process.game || !["playing"].includes(process.game.state)) {
    await message.channel.send(":x: No game in progress.");
    return null;
  };

  var game = process.game;

  message.channel.send(":ok: Forcing fastforward.");

  game.fastforward();

};
