module.exports = async function (message, params, config) {

  if (params.length < 1) {
    await message.channel.send(":x: Wrong syntax! Use `" + config["command-prefix"] + "_gamemode <gamemode>` instead!");
    return null;
  };

  if (!process.lobby) {

    await message.channel.send(":x: There is no lobby.");
    return null;

  };

  var gamemode = params[0].toLowerCase();
  process.lobby.setup.setSetup(gamemode);

  await message.channel.send(":ok: Gamemode set to **" + gamemode + "**.");

};
