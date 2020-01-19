var format = require("./__formatter.js");
var texts = require("./text/texts.js");

var pinMessage = require("./pinMessage.js");
var getVoteConfiguration = require("./getVoteConfiguration.js");

var Discord = require("discord.js");

module.exports = async function (game, broadcast) {

  var config = game.config;

  if (broadcast === undefined) {
    broadcast = "{#no-summary}";
  };

  var sendable = texts.new_period;
  sendable = sendable.replace(new RegExp("{;summary}", "g"), broadcast);

  if (game.isDay()) {

    var day_vote_message = "\n" + getVoteConfiguration(game);

  } else {
    var day_vote_message = new String();
  };

  sendable = sendable.replace(new RegExp("{;day_vote_message}", "g"), day_vote_message);

  var log = game.getLogChannel();
  var message = await log.send(format(game, sendable));

  pinMessage(message);

};
