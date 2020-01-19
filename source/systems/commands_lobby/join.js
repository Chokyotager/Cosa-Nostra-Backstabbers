var game = require("../game.js");
var auxils = require("../auxils.js");

module.exports = async function (message, params, config) {

  if (process.game) {
    await message.channel.send(":x: There is already a game in progress.");
    return null;
  };

  // Lobby
  if (!process.lobby) {

    process.lobby = new game.templates.Lobby(message.client, config);
    process.lobby.join(message.member);

    await message.channel.send(":exclamation: **" + message.member.displayName + "** has started a new game. Enter `" + config["command-prefix"] + "start` to start the game and `" + config["command-prefix"] + "join` to join.");

  } else {

    if (process.lobby.isInGame(message.member)) {
      await message.channel.send(":x: You are already in the game! Enter `" + config["command-prefix"] + "quit` to leave.");
      return null;
    };

    process.lobby.join(message.member);
    message.channel.send(":exclamation: **" + message.member.displayName + "** has joined the game. There " + auxils.vocab("is", process.lobby.players.length) + " now **" + process.lobby.players.length + "** player" + auxils.vocab("s", process.lobby.players.length) + ".");

  };

};
