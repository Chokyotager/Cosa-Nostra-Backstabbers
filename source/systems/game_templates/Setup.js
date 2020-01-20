var fs = require("fs");
var auxils = require("../auxils.js");
var setups = require("../setups.js");

var default_config = JSON.parse(fs.readFileSync(__dirname + "/../../setups/default_config.json"));

module.exports = class {

  constructor (setup="default") {

    this.setup = setups[setup];

  }

  setSetup (setup) {

    this.setup = setups[setup];

  };

  getAvailableSetups () {

    return Object.keys(setups);

  }

  evaluate (players) {

    // Check compatibility
    if (this.setup.PLAYER_LIMITS[0] > players.length || this.setup.PLAYER_LIMITS[1] < players.length) {
      return null;
    };

    var [roles, game_parameters] = this.setup(players);

    // Load in roles, cryptographically shuffle

    if (!game_parameters.playing) {
      game_parameters.playing = new Object();
    };

    game_parameters.playing.roles = auxils.cryptographicShuffle(roles);

    return auxils.objectOverride(default_config, game_parameters);

  }

}
