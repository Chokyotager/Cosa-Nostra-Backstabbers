var fs = require("fs");
var auxils = require("../auxils.js");
var setups = require("../setups.js");

var default_config = JSON.parse(fs.readFileSync(__dirname + "/../../setups/default_config.json"));

module.exports = class {

  constructor (setup="default") {

    this.setup = setups[setup];

  }

  getSetups () {
    return setups;
  }

  getSetup (identifier) {
    return setups[identifier];
  }

  getSetupMatch (name) {

    // Identify setup
    var identifiers = Object.keys(setups);

    var distances = new Array();

    // Jaro-Winkler hybrid
    for (var i = 0; i < identifiers.length; i++) {

      var distance = auxils.hybridisedStringComparison(name, identifiers[i]);
      distances.push(distance);

    };

    var best_match_index = distances.indexOf(Math.max(...distances));

    var score = distances[best_match_index];
    var setup = setups[identifiers[best_match_index]];

    return {"score": score, "setup": setup, "identifier": identifiers[best_match_index]};

  }

  setSetup (setup) {

    this.setup = setups[setup];

    return this;

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

  evaluateRange (minimum=0, maximum=Infinity) {

    var player_limits = this.setup.PLAYER_LIMITS;

    var permutations = new Object();

    for (var i = Math.max(minimum, player_limits[0]); i < Math.min(maximum, player_limits[1]) + 1; i++) {

      // Fill with fake players
      var players = new Array(i);

      var [roles, parameters] = this.setup(players);

      permutations[i.toString()] = {
        "roles": roles,
        "parameters": parameters
      };

    };

    return permutations;

  }

}
