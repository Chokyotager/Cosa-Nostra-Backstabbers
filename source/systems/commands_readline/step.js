module.exports = async function (client, config) {

  if (!process.game || !["pre-game", "playing"].includes(process.game.state)) {
    console.log(":No game in progress.");
    return null;
  };

  process.game.step();
  console.log("Step set.");

};
