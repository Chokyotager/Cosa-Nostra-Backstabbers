module.exports = async function (message, params, config) {

  if (!process.lobby) {

    await message.channel.send(":x: There is no lobby to force start.");
    return null;

  };

  process.lobby.start();

};
