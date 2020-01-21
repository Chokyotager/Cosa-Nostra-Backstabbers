var game = require("../game.js");
var auxils = require("../auxils.js");

module.exports = async function (message, params, config) {

  var member = message.member;

  if (process.game) {
    await message.channel.send(":x: There is already a game in progress.");
    return null;
  };

  // Lobby
  if (!process.lobby) {
    await message.channel.send(":x: There is no lobby.");
    return null;
  };

  if (!process.lobby.players.some(x => x.id === member.id)) {
    await message.channel.send(":x: You have not joined this game! Please use `" + config["command-prefix"] + "j` to join!");
    return null;
  };

  if (process.lobby.players.length < 3) {
    await message.channel.send(":x: Too few people. You need at least **3** people to start a game.");
    return null;
  };

  // Add
  votes_left = process.lobby.voteStart(member);

  if (!votes_left) {

    var setup = this.setup.setup;
    await message.channel.send(":negative_squared_cross_mark: The setup **" + setup.NAME + "** can only load between **" + setup.PLAYER_LIMITS[0] + "** - **" + setup.PLAYER_LIMITS[1] +  "** players. Please change the gamemode using `!gm`.")
    return null;

  };

  if (votes_left < 1) {

    await message.channel.send(":white_check_mark: **" + member.displayName + "** has voted to start the game. **The game is starting**...");
    return null;

  };

  await message.channel.send(":white_check_mark: **" + member.displayName + "** has voted to start the game. **" + votes_left + "** vote" + auxils.vocab("s", votes_left) + " " + auxils.vocab("is", votes_left) + " left to start the game.");

};
