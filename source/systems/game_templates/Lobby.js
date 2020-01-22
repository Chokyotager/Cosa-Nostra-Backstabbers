var Game = require("./Game.js");
var Setup = require("./Setup.js");

module.exports = class {

  constructor (client, config) {

    this.client = client;
    this.config = config;
    this.guild = this.client.guilds.find(x => x.id === config["server-id"]);

    this.players = new Array();
    this.vote_start = new Array();

    this.setup_votes = new Object();

    this.setup = new Setup();

    this.createTimeout();

  }

  voteSetup (identifier, member) {

    var keys = Object.keys(this.setup_votes);

    for (var i = 0; i < keys.length; i++) {

      this.setup_votes[keys[i]] = this.setup_votes[keys[i]].filter(x => x !== member.id);

    };

    if (!keys.includes(identifier)) {

      this.setup_votes[identifier] = new Array();

    };

    this.setup_votes[identifier].push(member.id);

    keys.push(identifier);

    // Find the most voted setup

    var vote_count = new Array();
    for (var i = 0; i < keys.length; i++) {
      vote_count.push(this.setup_votes[keys[i]].length);
    };

    var max_votes = Math.max(...vote_count);

    if (this.setup_votes[identifier].length === max_votes) {
      // Favour the latest vote
      this.setup.setSetup(identifier);
      return [this.setup_votes[identifier].length, identifier, this.setup_votes[identifier].length];
    };

    // Otherwise, find best
    var best_identifier = keys[vote_count.indexOf(max_votes)];

    this.setup.setSetup(best_identifier);
    return [this.setup_votes[identifier].length, best_identifier, this.setup_votes[best_identifier].length];

  };

  resetSetupVotes () {

  }

  join (member) {

    this.players.push(member);

    var role = this.guild.roles.find(x => x.name === this.config["permissions"]["player"]);
    member.addRole(role);

    return this;

  }

  leave (member) {

    var keys = Object.keys(this.setup_votes);

    for (var i = 0; i < keys.length; i++) {

      this.setup_votes[keys[i]] = this.setup_votes[keys[i]].filter(x => x !== member.id);

    };

    this.players = this.players.filter(x => x.id !== member.id);

    var role = this.guild.roles.find(x => x.name === this.config["permissions"]["player"]);
    member.removeRole(role);

    return this;

  }

  isInGame (member) {

    return this.players.some(x => x.id === member.id);

  }

  voteStart (member) {

    var is_in_game = this.players.some(x => x.id !== member.id);
    var is_voting = this.vote_start.some(x => x.id === member.id);

    if (this.setup.setup.PLAYER_LIMITS[0] > this.players.length || this.setup.setup.PLAYER_LIMITS[1] < this.players.length) {
      return null;
    };

    var required = Math.floor(0.35 * this.players.length);

    if (is_voting) {

      return required - this.vote_start.length + 1;

    };

    this.vote_start.push(member);

    if (this.vote_start.length > required) {

      this.start();
      return 0;

    };

    return required - this.vote_start.length + 1;

  }

  createTimeout () {

    var timeout_time = this.config["timeout"];
    var lobby = this;

    this.timeout = setTimeout(async function () {

      var config = lobby.config;

      var lobby_channel = lobby.guild.channels.find(x => x.name === config["channels"]["lobby"]);
      lobby_channel.send(":negative_squared_cross_mark: The game took too long to start and has been cancelled. Please use `" + config["command-prefix"] + "join` to start a new game.");

      lobby.destroy();

    }, timeout_time * 60 * 1000);

  }

  start () {

    var setup = this.setup.evaluate(this.players);

    if (!setup) {
      return null;
    };

    clearTimeout(this.timeout);

    // Run standard setup determination, etc.
    process.game = new Game(this.client, this.config, this.players, setup);
    delete process.lobby;

  }

  destroy () {

    // Clear timeout
    clearTimeout(this.timeout);

    var role = this.guild.roles.find(x => x.name === this.config["permissions"]["player"]);

    for (var i = 0; i < this.players.length; i++) {

      this.players[i].removeRole(role);

    };

    delete process.lobby;

  }

};
