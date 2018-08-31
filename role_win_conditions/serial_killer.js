module.exports = function (game) {

  game.getLogChannel().send("**Serial Killer wins.**");

  // Have to manually set the win
  var winners = game.findAll(x => x.role_identifier === "serial_killer" && x.isAlive());

  game.setWins(winners);

  /* Return true to stop the game/checks
  depending on the configuration below. */
  
  return true;

};

module.exports.STOP_GAME = true;
module.exports.STOP_CHECKS = false;

module.exports.FACTIONAL = false;

// Accepts function
// Should key in wrt to player
module.exports.ELIMINATED = ["town", "mafia"];
module.exports.SURVIVING = ["serial_killer"];
