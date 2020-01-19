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
    this.vote_start.push(member);

    var required = Math.floor(0.5 * this.players.length);
    if (this.vote_start.length > required) {

      this.start();
      return 0;

    };

    return 1;

  }

  start () {

    // Run standard setup determination, etc.
    process.game = new Game(this.client, this.config, this.players, this.setup.evaluate());
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
