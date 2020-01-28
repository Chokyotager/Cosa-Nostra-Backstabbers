// mediate the day/night cycles, set intervals

// this class is NOT meant to be serialised

var logger = process.logger;

var crypto = require("crypto");
var fs = require("fs");

var Game = require("./Game.js");
var Player = require("./Player.js");
var Actions = require("./Actions.js");

var auxils = require("../auxils.js");

module.exports = class {

  constructor (game) {

    this.day_night_mediator = null;
    this.game = game;
    this.ticks = 0;

    this.createTick();

    this.updatePresence();

    this.step();

  }

  prime () {

    var current = new Date();
    var designated = this.game.next_action;

    if (this.game.state === "ended") {
      logger.log(2, "Did not prime as game has ended.");
      return null;
    };

    var delta = designated.getTime() - current.getTime();

    if (delta < 0) {

      // Recalculate
      this.step();
      return null;

    };

    //console.log("Primer: set D/N mediator delta to: %s", delta);

    this.designated = designated;
    this.primed = current;

    var run_as = this;

    this.clearDayNightMediator();

    this.day_night_mediator = setTimeout(function () {
      run_as.step();
    }, delta);

    // IMPORTANT: Substitute time for delta

    this.updatePresence();

  }

  async step () {

    logger.log(2, "Game step activated.");
    var next_action = await this.game.step();

    // TEMP: set to not fire next step for obvious reasons


    if (next_action === null) {
      // Game ended
      this.clearDayNightMediator();
      this.updatePresence();
    } else {
      this.prime();
    };

  }

  async fastforward () {

    logger.log(2, "Fastforwarded.");
    var next_action = await this.game.step(true);

    if (next_action === null) {
      // Game ended
      this.clearDayNightMediator();
    } else {
      this.prime();
    };

  }

  tick () {

    var config = this.game.config;

    this.ticks++;

    if (this.game.state === "pre-game" || this.game.state === "playing") {
      // Tick to update small things
      this.checkPresenceUpdate();
    };

  }

  checkPresenceUpdate () {

    var current = new Date();

    var delta = (this.designated || current).getTime() - current.getTime();

    var days = delta / (24*60*60*1000);
    var hours = delta / (60*60*1000);
    var minutes = delta / (60*1000);
    var seconds = delta / 1000;

    if (hours < 1) {
      var amount = Math.ceil(30*1000 / this.tick_time);
    } else {
      var amount = Math.ceil(5*60*1000 / this.tick_time);
    };

    if (this.ticks % amount === 0) {
      this.updatePresence();
    };

  }

  async updatePresence (stagger=800) {

    var current = new Date();

    // In milliseconds
    var delta = (this.designated || current).getTime() - current.getTime();

    if (delta < 0) {
      return null;
    };

    if (stagger) {
      await new Promise(function(resolve, reject) {
        setTimeout(function () {
          resolve();
        }, stagger);
      });
    };

    if (this.game.state === "pre-game") {

      var display = "Pre-game";

      await this.game.setPresence({
        status: "online",
        game: {name: display, type: "PLAYING"}
      });

    } else if (this.game.state === "playing") {

      var display = this.game.getFormattedDay() + ": " + formatDate(delta) + " left";

      await this.game.setPresence({
        status: "online",
        game: {name: display, type: "PLAYING"}
      });

    } else {

      await process.resetStatus(this.game.client);

    };

  }

  createTick (time) {

    var config = this.game.config;

    this.clearTick();

    if (time === undefined) {
      time = config["miscellaneous"]["tick-time"];
    };

    var run_as = this;

    this.tick_time = time;
    this.tick_interval = setInterval(async function () {
      run_as.tick();
    }, time);

  }

  destroy () {

    this.clearDayNightMediator();
    this.clearTick();

  }

  clearTick () {

    if (this.tick_interval !== undefined) {
      clearInterval(this.tick_interval);
    };

  }

  clearDayNightMediator () {

    if (this.day_night_mediator) {
      clearTimeout(this.day_night_mediator);
    };

  }

};

function formatDate (epoch) {
  // Format into d, h, m, s

  var days = epoch / (24*60*60*1000);
  var hours = epoch / (60*60*1000);
  var minutes = epoch / (60*1000);
  var seconds = epoch / 1000;

  if (days >= 1) {

    var ret = Math.floor(days);
    return ret + " day" + auxils.vocab("s", ret);

  } else if (hours >= 1) {

    var ret = Math.floor(hours);
    return ret + " hour" + auxils.vocab("s", ret);

  } else {

    // Deliberate
    var ret = Math.ceil(minutes);
    return ret + " minute" + auxils.vocab("s", ret);

  };

};
