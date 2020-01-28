// I know I probably should have these
// stored as methods to the class;
// but I want to keep them separate
// because partial classes in JS suck

var auxils = require("../auxils.js");
var format = require("./__formatter.js");
var texts = require("./text/texts.js");

var pinMessage = require("./pinMessage.js");
var getVoteConfiguration = require("./getVoteConfiguration.js");

var Discord = require("discord.js");

module.exports = async function (game, broadcast) {

  var config = game.config;

  var log = game.getLogChannel();
  var sendable = texts.opening;

  if (game.isDay()) {

    var day_vote_message = "\n" + getVoteConfiguration(game);

  } else {
    var day_vote_message = new String();
  };

  sendable = sendable.replace(new RegExp("{;day_vote_message}", "g"), day_vote_message);

  var message = await log.send(format(game, sendable));

  pinMessage(message);

};
