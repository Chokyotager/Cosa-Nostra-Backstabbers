var Discord = require("discord.js");
var client = new Discord.Client();
var fs = require("fs");

var [logger, version, lcn] = require("./source/init.js")();

var config = lcn.config;

var auxils = lcn.auxils;
var commands = lcn.commands;
var game = lcn.game;

var config = lcn.config;

client.options.disableEveryone = true;

var load_time = process.uptime() * 1000;

client.on("ready", function () {

  if (!client.guilds.some(x => x.id === config["server-id"])) {
    throw new Error("Invalid guild ID entered in the configuration.");
  };

  logger.log(2, "%s Cosa Nostra Backstabbers [%s] ready.", version["update-name"], version.version);

  var login_time = process.uptime() * 1000;

  lcn.executable.reset.reset(client, config);

  ready();

  process.resetStatus(client);

  if (process.is_subprocess) {
    process.send({"ready": true});
  };

  var total_load_time = process.uptime() * 1000;
  var stats = [lcn.expansions.length, lcn.expansions.map(x => x.expansion.name).join(", "), Object.keys(lcn.roles).length, Object.keys(lcn.attributes).length, Object.keys(lcn.flavours).length, Object.keys(lcn.win_conditions).length, Object.keys(lcn.commands.role).length, Object.keys(lcn.assets).length, auxils.round(load_time), auxils.round(login_time - load_time), auxils.round(total_load_time, 2)];
  logger.log(2, "\n--- Statistics ---\n[Modules]\nLoaded %s expansion(s) [%s];\nLoaded %s role(s);\nLoaded %s attribute(s);\nLoaded %s flavour(s);\nLoaded %s unique win condition(s);\nLoaded %s command handle(s);\nLoaded %s non-flavour asset(s)\n\n[Startup]\nLoad: %sms;\nLogin: %sms;\nTotal: %sms\n-------------------\nEnter \"autosetup\" for auto-setup.\nEnter \"help\" for help.\n", ...stats);

});

client.on("message", async function (message) {

  var content = message.content;

  if (content.startsWith(config["command-prefix"])) {

    var edited = content.substring(config["command-prefix"].length, content.length).split(/[ ]/g);

    var command = edited[0].toLowerCase();
    var raw_command = Array.from(edited).join(" ");

    edited.splice(0, 1);

    if (message.channel.type === "text") {

      var member = message.member;

      if (config["disabled-commands"].includes(command)) {
        message.channel.send(":x: That command has been disabled in the configuration!");
        return null;
      };

      for (var key in commands) {

        if (["admin", "game", "role", "readline"].includes(key)) {
          continue;
        };

        if (commands[key][command] !== undefined) {
          logger.log(0, "User %s [%s#%s] executed %s-type command \"%s\".", member.id, member.user.username, member.user.discriminator, key, raw_command);
          await commands[key][command](message, edited, config);
          return null;
        };

      };

      if (commands.admin[command] !== undefined) {
        // Check permissions

        if (member.roles.some(x => x.name === config["permissions"]["admin"])) {
          logger.log(2, "User %s [%s#%s] ran admin-type command \"%s\".", member.id, member.user.username, member.user.discriminator, raw_command);
          await commands.admin[command](message, edited, config);
        } else {
          logger.log(1, "User %s [%s#%s] failed to run admin-type command (due to lack of permissions) \"%s\".", member.id, member.user.username, member.user.discriminator, raw_command);
          message.channel.send(":x: You do not have sufficient permissions to use this command!");
        };

        return null;
      };

      if (commands.lobby[command] !== undefined) {
        // Run command
        logger.log(0, "User %s [%s#%s] executed lobby-type command \"%s\".", member.id, member.user.username, member.user.discriminator, raw_command);
        commands.lobby[command](message, edited, config);
        return null;
      };

    };

    if (process.game && message.channel.type === "dm") {

      // Log the command
      var log_channel = process.game.getNewLogChannel();
      log_channel.send(":exclamation: **" + message.author.username + "#" + message.author.discriminator + "**: " + message.content);

    };

    if (commands.game[command] !== undefined) {
      // Check if game is in progress
      if (process.game !== undefined) {

        var cond1 = process.game.state === "pre-game" && commands.game[command].ALLOW_PREGAME === false;
        var cond2 = process.game.state === "playing" && commands.game[command].ALLOW_GAME === false;
        var cond3 = process. game.state === "ended" && commands.game[command].ALLOW_POSTGAME === false;

        if (!cond1 && !cond2 && !cond3) {
          commands.game[command](process.game, message, edited);
        } else {

          if (cond1) {
            message.channel.send(":x: That command cannot be used in the pre-game!");
          } else if (cond2) {
            message.channel.send(":x: That command cannot be used when the game is running!");
          } else if (cond3) {
            message.channel.send(":x: That command cannot be used in the post-game!");
          };

        };

      } else {
        message.channel.send(":x: There is no game in progress!");
      };

    };

    // Run framework function
    if (commands.role[command] !== undefined) {
      // Check if game is in progress

      if (process.game !== undefined && process.game.state === "playing") {

        commands.role[command](process.game, message, edited);

      } else {
        //message.channel.send(":x: There is no game in progress!");
      };

      return null;

    };

  };

});

client.on("error", function (error) {

  logger.log("[Websocket] Websocket connection error. Not fatal. Discord.js will attempt automatic reconnection, so there is nothing to worry about unless the log stops here.");
  logger.logError(error);

});

client.on("resume", function () {

  logger.log("[Websocket] Websocket connection has been resumed.");

});

client.on("warn", function (warning) {

  logger.log(3, "[Discord.js warning] %s", warning);

});

// Ready
function ready () {

  if (!process.ready) {

    auxils.readline(client, config, commands);
    auxils.eventhandler(client, config);

    process.ready = true;

  };

};

process.resetStatus = async function (client) {

  await client.user.setPresence({
    status: "online",
    game: {name: version["update-name"] + " CNB " + version.version, type: "PLAYING"}
  });

};

client.login(config["bot-token"]);
