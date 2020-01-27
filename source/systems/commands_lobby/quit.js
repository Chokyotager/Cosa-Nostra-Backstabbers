var auxils = require("../auxils.js");

module.exports = async function (message, params, config) {

  if (process.game) {

    var game = process.game;

    if (game.players.some(x => x.id === message.author.id)) {

      await message.channel.send(":x: You are not in the current game!");
      return null;

    };

    if ((params[0] || new String()).toLowerCase() === "force") {

      game.modkill(message.author.id);
      await message.channel.send(":exclamation: Left the game.");
      return null;

    };

    await message.channel.send(":exclamation: Please use `" + config["command-prefix"] + "quit force` if you wish to exit the game.");
    return null;

  };

  if (process.lobby) {

    if (process.lobby.isInGame(message.member)) {

      process.lobby.leave(message.member);

      var addendum = process.lobby.players.length === 0 ? " Type `" + config["command-prefix"] + "join` to create a new game." : new String();

      await message.channel.send(":exclamation: **" + message.member.displayName + "** has left the lobby. **" + process.lobby.players.length + "** player" + auxils.vocab("s", process.lobby.players.length) + " remain" + auxils.vocab("!s", process.lobby.players.length) + "." + addendum);

    } else {

      await message.channel.send(":x: You cannot leave a game you are not in!");

    };

  } else {

    await message.channel.send(":x: You cannot leave a game you are not in!");

  };

  if (process.lobby.players.length === 0) {

    process.lobby.destroy();

  };

};
