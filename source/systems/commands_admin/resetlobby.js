module.exports = async function (message, params, config) {

  if (!process.lobby) {

    await message.channel.send(":x: There is no lobby to reset.");
    return null;

  };

  process.lobby.destroy();

  await message.channel.send(":ok: Lobby reset.")

};
