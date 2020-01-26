module.exports = async function (game, message, params) {

  var setup = game.setup;
  var config = game.config;

  var alive_players = game.findAll(x => x.isAlive());

  var alive_message = new String();
  for (var i = 0; i < alive_players.length; i++) {

    alive_message += (i + 1) + ". " + alive_players[i].member.displayName + "\n";

  };

  await message.channel.send(":pencil2: **Game statistics:**```ini\n[Gamemode] " + game.setup.setup.NAME + "\n\n[Phase] " + game.getFormattedDay() + "\n\n[Players alive] " + alive_players.length + "/" + game.players.length + "\n" + alive_message + "```\nFor time left, please use `" + config["command-prefix"] + "t`, for votes use `" + config["command-prefix"] + "vc`, for available roles, use `" + config["command-prefix"] + "rl`.");

};
