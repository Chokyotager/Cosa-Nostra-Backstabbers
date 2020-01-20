var Game = require("./Game.js");
var Setup = require("./Setup.js");

module.exports = class {

  constructor (client, config) {

    this.client = client;
    this.config = config;
    this.guild = this.client.guilds.find(x => x.id === config["server-id"]);

    this.players = new Array();
    this.vote_start = new Array();

    this.setup = new Setup();

  }

  join (member) {

    this.players.push(member);

    var role = this.guild.roles.find(x => x.name === this.config["permissions"]["player"]);
    member.addRole(role);

    return this;

  }

  leave (member) {

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

    if (is_voting) {

      return required - this.vote_start.length + 1;

    };

    this.vote_start.push(member);

    var required = Math.floor(0.35 * this.players.length);
    if (this.vote_start.length > required) {

      this.start();
      return 0;

    };

    return required - this.vote_start.length + 1;

  }

  start () {

    var setup = this.setup.evaluate(this.players);

    if (!setup) {
      return null;
    };

    // Run standard setup determination, etc.
    process.game = new Game(this.client, this.config, this.players, setup);
    delete process.lobby;

  }

  destroy () {

    var role = this.guild.roles.find(x => x.name === this.config["permissions"]["player"]);

    for (var i = 0; i < this.players.length; i++) {

      this.players[i].removeRole(role);

    };

    delete this;

  }

};
