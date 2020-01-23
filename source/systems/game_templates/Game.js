var executable = require("../executable.js");

var Actions = require("./Actions.js");
var Player = require("./Player.js");
var Timer = require("./Timer.js");

var auxils = require("../auxils.js");
var flavours = require("../flavours.js");
var fs = require("fs");

var base_perms = JSON.parse(fs.readFileSync(__dirname + "/../base_perms.json"));

module.exports = class {

  constructor (client, config, members, setup, setup_object) {

    // Game instance is destroyed upon game completion
    this.config = JSON.parse(JSON.stringify(config));
    this.config["base-perms"] = base_perms;
    this.config = auxils.objectOverride(this.config, setup);

    this.client = client;

    this.players = new Array();

    this.actions = new Actions().init(this);

    this.trial_vote_operations = new Array();

    this.players_tracked = members.length;

    this.period_log = new Object();

    this.intro_messages = new Array();

    this.channels = new Object();

    this.setup = setup_object;

    // Refer to setup
    this.period = 0;
    this.steps = 0;
    this.state = "pre-game";

    // WORK IN PROGRESS
    this.flavour_identifier = this.config["playing"]["flavour"];

    this.voting_halted = false;

    var roles = this.config["playing"]["roles"];

    // Define players
    for (var i = 0; i < members.length; i++) {

      var player = new Player(this, members[i], roles[i]);
      this.players.push(player);

    };

    this.players.sort(function(a, b) {

      if (a.member.displayName < b.member.displayName) { return -1; };
      if (a.member.displayName > b.member.displayName) { return 1; };

      return 0;

    });

    this.initialiseCNBGame();

  }

  async initialiseCNBGame () {

    await this.createGameChannels();
    await executable.misc.lockLobby(this);
    this.timer = new Timer(this);

  }

  setChannel (name, channel) {

    // This.channels stores SPECIAL channels,
    // not the private ones
    // not the logging ones either

    this.channels[name] = {id: channel.id, name: channel.name, created_at: channel.createdAt};

  };

  getChannel (name) {
    var guild = this.getGuild();

    if (!this.channels[name]) {
      return undefined;
    };

    return guild.channels.get(this.channels[name].id);
  }

  getPlayerById (id) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].id === id) {
        return this.players[i];
      };
    };
    return null;
  }

  getPlayerByIdentifier (identifier) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].identifier === identifier) {
        return this.players[i];
      };
    };
    return null;
  }

  getPlayer (argument) {
    // Flexible

    if (argument instanceof Player) {
      return argument;
    };

    var id = this.getPlayerById(argument);
    var identifier = this.getPlayerByIdentifier(argument);

    return id || identifier;

  }

  getAlive () {
    // Count number alive
    var count = new Number();
    for (var i = 0; i < this.players.length; i++) {
      count += this.players[i].status.alive ? 1 : 0;
    };

    return count;
  }

  getAlivePlayers () {

    var alive = new Array();

    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].status.alive) {
        alive.push(this.players[i]);
      };
    };

    return alive;

  }

  toggleVote (voter, voted_against) {
    // Post corresponding messages

    if (this.voting_halted) {
      return false;
    };

    var no_lynch_vote = voted_against === "nl";
    var voted_no_lynch = this.isVotingNoLynch(voter.identifier);

    var magnitude = voter.getVoteMagnitude();

    if (no_lynch_vote) {

      // NL vote is independent
      var has_voted = this.votesFrom(voter.identifier).length > 0;

      if (has_voted) {
        return false;
      };

      var before_votes = this.getNoLynchVoteCount();

      // Count NL vote
      if (voted_no_lynch) {
        // Remove no-lynch vote
        this.clearNoLynchVotesBy(voter.identifier);
        executable.misc.removedNolynch(this, voter);
      } else {
        this.addNoLynchVote(voter.identifier, magnitude);
        executable.misc.addedNolynch(this, voter);
      };

      var after_votes = this.getNoLynchVoteCount();

      this.__checkLynchAnnouncement("nl", before_votes, after_votes);

    } else {

      if (voted_no_lynch) {
        return false;
      };

      var already_voting = voted_against.isVotedAgainstBy(voter.identifier);

      if (!already_voting && this.votesFrom(voter.identifier).length >= this.getLynchesAvailable()) {
        // New vote, check if exceeds limit
        return false;
      };

      var before_votes = voted_against.countVotes();

      var toggle_on = voted_against.toggleVotes(voter.identifier, magnitude);

      var after_votes = voted_against.countVotes();

      if (toggle_on) {
        // New vote
        // OLD SYSTEM: uses IDs directly
        executable.misc.addedLynch(this, voter, voted_against);
      } else {
        executable.misc.removedLynch(this, voter, voted_against);
      };

      this.__checkLynchAnnouncement(voted_against.identifier, before_votes, after_votes);

    };

    if (this.hammerActive()) {
      this.__checkLynchHammer();
    };

    return true;

  }

  getVotesBy (identifier) {

    var ret = new Array();

    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].isVotedAgainstBy(identifier)) {
        ret.push(this.players[i]);
      };
    };

    return ret;

  }

  votesFrom (identifier) {
    // Get everyone someone is voting against

    var roles = new Array();

    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].isVotedAgainstBy(identifier)) {
        roles.push(this.players[i]);
      };
    };

    return roles;

  }

  __checkLynchAnnouncement (identifier, before, after) {

    var role = this.getPlayerByIdentifier(identifier);

    if (identifier === "nl") {
      var required = this.getNoLynchVotesRequired();
    } else {
      var required = this.getVotesRequired() - role.getVoteOffset();
    };

    // !this.config["game"]["lynch"]["top-voted-lynch"] && !this.hammerActive()
    if (!this.hammerActive() && !this.config["game"]["lynch"]["top-voted-lynch"]) {

      if (before < required && after >= required) {
        // New lynch
        identifier === "nl" ? executable.misc.nolynchReached(this) : executable.misc.lynchReached(this, role);
      } else if (before >= required && after < required) {
        identifier === "nl" ? executable.misc.nolynchOff(this) : executable.misc.lynchOff(this, role);
      };

    };

  }

  __checkLynchHammer () {

    var no_lynch_votes = this.getNoLynchVoteCount();

    if (no_lynch_votes >= this.getNoLynchVotesRequired()) {
      this.fastforward();
      return true;
    };

    // Checks for all potential hammers
    for (var i = 0; i < this.players.length; i++) {
      var votes = this.players[i].countVotes();
      var required = this.getVotesRequired() - this.players[i].getVoteOffset();

      if (votes >= required) {
        // Execute the player
        //var success = this.lynch(this.players[i]);

        // Fastforward cycle
        this.fastforward();
        return true;

      };

    };

    return false;

  }

  clearAllVotesBy (identifier) {
    // Clears all the votes on other people
    // by id specified

    var cleared = false;

    for (var i = 0; i < this.players.length; i++) {
      cleared = cleared || this.players[i].clearVotesBy(identifier);
    };

    return cleared;

  }

  clearVotes (edit_trial=false) {
    // Clear ALL votes
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].clearVotes();
    };

  }

  isAlive (id) {
    var alive = this.getAlivePlayers();

    for (var i = 0; i < alive.length; i++) {
      if (alive[i].id === id) {
        return true;
      };
    };

    return false;

  }

  save () {
    return null;
  }

  async step (adjust_to_current_time=true) {
    // Synced with Timer class
    // Should return next date

    // this.config.time.day

    this.voting_halted = true;

    var addition = this.state === "pre-game" ? 0 : 1;

    if (adjust_to_current_time) {

      this.current_time = new Date();

      var time = new Date();

      this.next_action = calculateNextAction(time, this.period + addition, this.config);

    } else {
      this.current_time = new Date(this.next_action);
      this.next_action = calculateNextAction(this.next_action, this.period + addition, this.config);
    };

    if (this.state === "pre-game") {

      this.postPrimeLog();

      for (var i = 0; i < this.players.length; i++) {
        this.players[i].start();
      };

      await new Promise(function(resolve, reject) {
        setTimeout(function () {
          resolve();
        }, 8000);
      });

      this.__routines();
      this.__start();
      this.cycle();

      // Periodic updates are handled in roles/postRoleIntroduction
      // because of async issues

      // Player routines in start
      //this.__playerRoutines();

      this.execute("postcycle", {period: this.period});

    } else if (this.state === "playing") {

      // Print period in private channel
      await this.messagePeriodicUpdate(1);

      // Handles actions,
      // closes trial votes, etc.
      // i.e. dawn/dusk time
      await this.precycle();

      this.steps += 1;
      this.period += 1;

      // Create period log
      this.__routines();

      // Broadcast
      var broadcast = this.getBroadcast(-1, true);
      await executable.misc.postNewPeriod(this, broadcast);

      // Win check
      this.checkWin();

      if (this.state === "ended") {
        return null;
      };

      // Open Mafia chat, create votes, routine stuff
      this.cycle();

      // Player routines - configurable
      await this.__playerRoutines();

      this.execute("postcycle", {period: this.period});

    } else {

      return null;

    };

    this.voting_halted = false;

    return this.next_action;

    function calculateNextAction (time, period, config) {
      var divided = period % 2;

      // Clone time obj
      time = new Date(time);

      if (divided === 0) {
        time.setMinutes(time.getMinutes() + config["time"]["day"]);
      } else {
        time.setMinutes(time.getMinutes() + config["time"]["night"]);
      };

      return time;

    };

  }

  async precycle () {

    this.clearPeriodPins();

    if (this.period % 2 === 0) {

      // Dusk
      this.checkLynches();
      this.clearVotes();

    };

    this.execute("cycle", {period: this.period});
    this.enterDeathMessages();
    this.sendMessages();

  }

  async messagePeriodicUpdate (offset=0) {
    await this.messageAll("~~                                              ~~    **" + this.getFormattedDay(offset) + "**", "permanent");
  }

  async messageAll (message, pin=false) {
    for (var i = 0; i < this.players.length; i++) {

      await new Promise(function(resolve, reject) {
        setTimeout(function () {
          resolve();
        }, 100)
      });

      if (this.players[i].isAlive()) {

        var channel = this.players[i].getPrivateChannel();

        if (pin === "period") {

          this.sendPeriodPin(channel, message);

        } else if (pin === "permanent") {

          this.sendPin(channel, message);

        } else {

          this.players[i].getPrivateChannel().send(message);

        };
      };
    };
  }

  cycle () {
    if (this.period % 2 === 0) {

      this.day();

    } else {

      this.night();

    };

  }

  day () {
    // Executed at the start of daytime

    if (this.config["game"]["mafia"]["night-only"]) {
      executable.misc.lockMafiaChat(this);
    } else {
      executable.misc.openMafiaChat(this);
      executable.misc.postMafiaPeriodicMessage(this);
    };

    executable.misc.openMainChats(this);

  }

  night () {
    // Executed at the start of nighttime

    // Lynch players
    executable.misc.openMafiaChat(this);
    executable.misc.postMafiaPeriodicMessage(this);

    if (!this.config["game"]["town"]["night-chat"]) {
      executable.misc.lockMainChats(this);
    } else {
      executable.misc.openMainChats(this);
    };


  }

  createPeriodPin (message) {

    var log = this.getPeriodLog();

    var result = executable.misc.pinMessage(message);

    if (result) {

      var jx = {
        "message": message.id,
        "channel": message.channel.id,
        "pin_time": new Date()
      };

      //log.pins.push(jx);

    };

    return result;

  }

  createPin (message) {

    var result = executable.misc.pinMessage(message);

    return result;

  }

  async sendPeriodPin (channel, message) {

    var out = await channel.send(message);
    this.createPeriodPin(out);

  }

  async sendPin (channel, message) {

    var out = await channel.send(message);
    this.createPin(out);

  }

  checkLynches () {

    // Find players who will be lynched

    var lynchable = new Array();

    for (var i = 0; i < this.players.length; i++) {

      if (!this.players[i].isAlive()) {
        continue;
      };

      var votes = this.players[i].countVotes();
      var required = this.getVotesRequired() - this.players[i].getVoteOffset();

      var top_voted_lynch = this.config["game"]["lynch"]["top-voted-lynch"] && votes >= this.config["game"]["lynch"]["top-voted-lynch-minimum-votes"];

      if (votes >= required || top_voted_lynch) {
        // Execute the player
        //var success = this.lynch(this.players[i]);

        lynchable.push({player: this.players[i], score: votes - required, votes: votes});

      };

    };

    var lynches_available = this.getLynchesAvailable();

    lynchable = auxils.cryptographicShuffle(lynchable);

    lynchable.sort(function (a, b) {
      return b.score - a.score;
    });

    var lynched = new Array();
    var no_lynch_votes = this.getNoLynchVoteCount();
    var top_voted_lynch = this.config["game"]["lynch"]["top-voted-lynch"];

    // Check no-lynch
    if (no_lynch_votes < this.getNoLynchVotesRequired() || top_voted_lynch) {

      while (lynchable.length > 0 && lynches_available > lynched.length) {

        var score = lynchable[0].score;
        var votes = lynchable[0].votes;
        var target = lynchable[0].player;

        // Checks popularity of no lynch votes
        if (votes <= no_lynch_votes) {
          break;
        };

        // Encased in loop in event of > 2 lynches available and second-ups are tied
        if (lynchable.filter(x => x.score === score).length > (lynches_available - lynched.length) && !this.config["game"]["lynch"]["tied-random"]) {
          // Stop further lynch
          break;
        };

        var success = this.lynch(target);

        if (success) {
          lynched.push(target);
        };

        lynchable.splice(0, 1);

      };

    };

    // Successful lynches go into lynched
    // Broadcast the lynches in the main channel

    //executable.misc.broadcastMainLynch(this, lynched);

  }

  lynch (role) {

    var success = executable.misc.lynch(this, role);

    // Add lynch summary
    if (success) {
      this.silentKill(role, "__lynched__");
    };

    return success;

  }

  kill (role, reason, secondary_reason, broadcast_position_offset=0) {

    // Secondary reason is what the player sees
    // Can be used to mask death but show true
    // reason of death to the player killed
    this.silentKill(...arguments);

    if (this.getPeriodLog() && this.getPeriodLog().trial_vote) {
      this.clearAllVotesFromAndTo(role.identifier);
      this.__checkLynchHammer();
    };

  }

  silentKill (role, reason, secondary_reason, broadcast_position_offset=0) {

    // Work in progress, should remove emote
    /*
    if (this.getPeriodLog() && this.getPeriodLog().trial_vote) {
      executable.misc.removePlayerEmote(this, role.identifier);
    };
    */

    // Secondary reason is what the player sees
    // Can be used to mask death but show true
    // reason of death to the player killed
    this.execute("killed", {target: role.identifier});
    executable.misc.kill(this, role);
    this.primeDeathMessages(role, reason, secondary_reason, broadcast_position_offset);

  }

  modkill (id) {

    var role = this.getPlayerById(id);

    if (role === null) {
      return false;
    };

    role.getPrivateChannel().send(":exclamation: You have been removed from the game by a moderator.");

    executable.admin.modkill(this, role);
    return true;

  }

  primeDeathMessages (role, reason, secondary, broadcast_position_offset=0) {
    this.addDeathBroadcast(role, reason, broadcast_position_offset);

    if (secondary) {
      this.addDeathMessage(role, secondary);
    } else {
      this.addDeathMessage(role, reason);
    };

  }

  enterDeathMessages (offset=0) {
    var log = this.getPeriodLog(offset);


    // {role, reason}
    var registers = Array.from(log.death_messages);

    var messages = new Object();

    for (var i = 0; i < registers.length; i++) {

      var identifier = registers[i].role;

      if (!messages[identifier]) {
        messages[identifier] = new Array();
      };

      messages[identifier].push(registers[i].reason);

    };

    var keys = Object.keys(messages);

    for (var i = 0; i < keys.length; i++) {
      var identifier = keys[i];
      var role = this.getPlayerByIdentifier(identifier);
      var reason = auxils.pettyFormat(messages[keys[i]]);

      var message = executable.misc.getDeathMessage(this, role, reason);

      this.addMessage(role, message);
    };

  }

  enterDeathBroadcasts (offset=0) {
    // Enters in from log.death_broadcasts
    var log = this.getPeriodLog(offset);

    var registers = Array.from(log.death_broadcasts);

    registers.sort((a, b) => a.position_offset - b.position_offset);

    var unique = new Array();

    for (var i = 0; i < registers.length; i++) {
      if (!unique.includes(registers[i].role)) {
        unique.push(registers[i].role);
      };
    };

    var cause_of_death_config = this.config["game"]["cause-of-death"];
    var exceptions = cause_of_death_config["exceptions"];

    var hide_day = (cause_of_death_config["hide-day"] && this.isDay());
    var hide_night = (cause_of_death_config["hide-night"] && !this.isDay());

    for (var i = 0; i < unique.length; i++) {

      var role = this.getPlayerByIdentifier(unique[i]);

      var reasons = new Array();

      for (var j = 0; j < registers.length; j++) {

        if (registers[j].role === unique[i]) {

          var exempt = false;

          // TODO: fix
          for (var k = 0; k < exceptions.length; k++) {
            if (registers[j].reason.includes(exceptions[k])) {
              exempt = true;
              break;
            };
          };

          if (hide_day || hide_night || exempt) {
            reasons.push(registers[j].reason);
          };

        };

      };

      if (reasons.length < 1) {
        reasons.push("found dead");
      };

      var reason = auxils.pettyFormat(reasons);

      var message = executable.misc.getDeathBroadcast(this, role, reason);

      this.addBroadcastSummary(message, offset);

    };

    this.uploadPublicRoleInformation(unique);

  }

  uploadPublicRoleInformation (role_identifiers, ignore_cleaned=true) {

    var display = new Array();

    for (var i = 0; i < role_identifiers.length; i++) {
      var player = this.getPlayerByIdentifier(role_identifiers[i]);

      if (!player.misc.role_cleaned) {
        display.push(player);
      };

    };

    //executable.roles.uploadPublicRoleInformation(this, display);

  }

  addDeathBroadcast (role, reason, position_offset=0) {

    var log = this.getPeriodLog();

    log.death_broadcasts.push({role: role.identifier, reason: reason, position_offset: position_offset});

  }

  addBroadcastSummary (message, offset=0) {
    var log = this.getPeriodLog(offset);

    log.summary.push({message: message, time: new Date()});
  }

  addDeathMessage (role, reason) {
    var log = this.getPeriodLog();

    log.death_messages.push({role: role.identifier, reason: reason});
  }

  addMessage (role, message) {
    var log = this.getPeriodLog();

    log.messages.push({message: message, recipient: role.identifier, time: new Date()});
  }

  addMessages (roles, message) {
    for (var i = 0; i < roles.length; i++) {
      this.addMessage(roles[i], message);
    };
  }

  getBroadcast (offset=0, enter=false) {

    if (enter) {
      this.enterDeathBroadcasts(offset);
    };

    // Get the summary broadcast

    var log = this.getPeriodLog(offset);

    var broadcasts = log.summary;

    if (broadcasts.length < 1) {
      return undefined;
    } else {
      var concat = new Array();

      for (var i = 0; i < broadcasts.length; i++) {
        concat.push(broadcasts[i].message);
      };

      return concat.join("\n\n");
    };

  }

  async sendMessages (offset=0) {

    // Actually sends messages

    var log = this.getPeriodLog(offset);

    var messages = log.messages;

    for (var i = 0; i < messages.length; i++) {

      var message = messages[i].message;

      executable.misc.sendIndivMessage(this, messages[i].recipient, message);

      await new Promise(function(resolve, reject) {
        setTimeout(function () {
          resolve();
        }, 80);
      });

    };

  }

  clearPeriodPins (offset=0) {
    // Clears the pinned messages in the period log

    var log = this.getPeriodLog();
    var pins = log.pins;

  }

  getGuildMember (id) {

    var guild = this.client.guilds.get(this.config["server-id"]);
    var member = guild.members.get(id);

    return member;

  }

  __start () {

    this.state = "playing";

    executable.misc.postGameStart(this);

    if (!this.isDay() && !this.config["game"]["town"]["night-chat"]) {

      executable.misc.lockMainChats(this);

    } else {

      executable.misc.openMainChats(this);

    };

  }

  __routines () {
    // Check day night cycles, also used on referesh
    // Should not put post functions in here,
    // only administrative junk

    var trials = Math.max(this.config["game"]["minimum-trials"], Math.ceil(this.config["game"]["lynch-ratio-floored"] * this.getAlive()));

    // Clear fast forward votes
    this.fast_forward_votes = new Array();

    for (var i = 0; i < this.trial_vote_operations.length; i++) {
      var operation = this.trial_vote_operations[i].operation;
      trials = auxils.operations[operation](trials, this.trial_vote_operations[i].amount);
    };

    // Clear TV operations
    this.trial_vote_operations = new Array();

    this.period_log[this.period.toString()] = {
      "trials": trials,
      "summary": new Array(),
      "death_broadcasts": new Array(),
      "death_messages": new Array(),
      "messages": new Array(),
      "trial_vote": null,
      "no_lynch_vote": new Array(),
      "period": this.period,
      "pins": new Array()
    };

  }

  addTrialVoteOperation (operation, amount) {

    var allowed = ["addition", "subtraction", "multiplication", "division", "modulo", "max", "min"];

    if (!allowed.includes(operation)) {
      var err = new Error("Operation " + operation + " is not allowed!");
      throw err;
    };

    this.trial_vote_operations.push({operation: operation, amount: amount})

  }

  async __playerRoutines () {
    for (var i = 0; i < this.players.length; i++) {
      await new Promise(function(resolve, reject) {
        setTimeout(function () {
          resolve();
        }, 100);
      });
      this.players[i].__routines();
    };
  }

  getLynchesAvailable (offset=0) {
    var log = this.getPeriodLog(offset);
    return log.trials;
  }

  getPeriodLog (offset=0) {
    return this.period_log[(this.period + offset).toString()];
  }

  getVotesRequired () {

    var alive = this.getAlive();

    // Floored of alive
    //return 1;
    return Math.max(this.config["game"]["minimum-lynch-votes"], Math.floor(alive / 2) + 1);

  }

  getNoLynchVotesRequired () {

    var alive = this.getAlive();

    // Ceiled of alive
    return Math.max(this.config["game"]["minimum-nolynch-votes"], Math.ceil(alive / 2));

  }

  setPresence (presence) {
    executable.misc.updatePresence(this, presence);
  }

  getFormattedDay (offset=0) {

    var period = this.period + offset;

    var numeral = Math.ceil(0.5 * period);

    var flavour = this.getGameFlavour();

    if (flavour && flavour.info["step-names"]) {
      var step_names = flavour.info["step-names"];
      var step = this.getStep() + offset;

      var index = step % step_names.length;

      return step_names[index] + " " + numeral;
    };

    if (period % 2 === 0) {
      return "Day " + numeral;
    } else {
      return "Night " + numeral;
    };

  }

  format (string) {
    return executable.misc.__formatter(string);
  }

  addAction () {
    // Inherits
    return this.actions.add(...arguments);
  }

  execute () {
    this.actions.execute(...arguments);
  }

  getPlayerMatch (name) {

    var guild = this.client.guilds.get(this.config["server-id"]);
    var distances = new Array();

    for (var i = 0; i < this.players.length; i++) {

      var member = guild.members.get(this.players[i].id);

      if (member === undefined) {
        distances.push(-1);
        continue;
      };

      var nickname = member.displayName;
      var username = member.user.username;

      // Calculate Levenshtein Distance
      // Ratio'd

      var s_username = auxils.hybridisedStringComparison(name.toLowerCase(), username.toLowerCase());
      var s_nickname = auxils.hybridisedStringComparison(name.toLowerCase(), nickname.toLowerCase());

      var distance = Math.max(s_username, s_nickname);
      distances.push(distance);

    };

    // Compare distances
    var best_match_index = distances.indexOf(Math.max(...distances));

    var score = distances[best_match_index];
    var player = this.players[best_match_index];

    return {"score": score, "player": player};

  }

  find (key, value) {

    for (var i = 0; i < this.players.length; i++) {

      if (typeof key === "function") {
        var condition = key(this.players[i]);

        if (condition) {
          return this.players[i];
        };

      } else {

        if (this.players[i][key] === value) {
          return this.players[i];
        };

      };

    };

    return undefined;

  }

  findAll (key, value) {

    var ret = new Array();

    for (var i = 0; i < this.players.length; i++) {

      if (typeof key === "function") {
        var condition = key(this.players[i]);

        if (condition) {

          ret.push(this.players[i]);

        };

      } else if (this.players[i][key] === value) {

          ret.push(this.players[i]);

        };

    };

    return ret;

  }

  exists (key, value) {
    return this.find(key, value) !== undefined;
  }

  checkWin () {
    executable.wins.checkWin(this);
  }

  endGame () {

    console.log("Game ended!");

    // End the game
    this.state = "ended";

    executable.misc.removeAllPlayerRoles(this.getGuild(), this.config);
    executable.conclusion.openChats(this);

    process.resetStatus();

    // Remove the process
    delete process.game;

  }

  getGuild () {
    return this.client.guilds.get(this.config["server-id"]);
  }

  postWinLog() {
    if (this.win_log) {
      executable.misc.postWinLog(this, this.win_log.faction, this.win_log.caption);
    } else {
      console.warn("The win log has not been primed!");
    };
  }

  primeWinLog (faction, caption) {
    this.win_log = {faction: faction, caption: caption};
  }

  getNewLogChannel () {
    return this.getChannel(this.config["channels"]["log-channel"]);
  }

  getLogChannel () {
    return this.getChannel(this.config["channels"]["game-channel"]);
  }

  getMainChannel () {
    return this.getChannel(this.config["channels"]["game-channel"]);
  }

  getWhisperLogChannel () {
    return this.getChannel(this.config["channels"]["game-channel"]);
  }

  getPeriod () {
    return this.period;
  }

  getStep () {
    return this.steps;
  }

  isDay () {
    return this.getPeriod() % 2 === 0;
  }

  setWin (role) {
    executable.misc.postWinMessage(role);
    role.setWin();
  }

  setWins (roles) {
    for (var i = 0; i < roles.length; i++) {
      this.setWin(roles[i]);
    };
  }

  async createGameChannels () {
    return await executable.misc.createGameChannels(this, ...arguments);
  }

  postPrimeLog () {
    executable.misc.postPrimeMessage(this);
  }

  substitute (id1, id2) {

    var player = this.getPlayerById(id1);
    player.substitute(id2);

  };

  clearPreemptiveVotes () {
    for (var i = 0; i < this.players.length; i++) {
      this.players[i].clearPreemptiveVotes();
    };
  }

  loadPreemptiveVotes (clear_cache=true) {

    var lynches = this.getLynchesAvailable();

    for (var i = 0; i < this.players.length; i++) {

      var player = this.players[i];
      var votes = player.getPreemtiveVotes();

      if (!player.isAlive()) {
        continue;
      };

      var amount = Math.min(lynches - this.votesFrom(player.identifier).length, votes.length);
      var successes = new Array();

      for (var j = 0; j < votes.length; j++) {

        // Check if player is votable
        var current = this.getPlayerByIdentifier(votes[i]);

        var already_voted = current.isVotedAgainstBy(player.identifier);
        var alive = current.isAlive();

        if (alive && !already_voted) {
          this.toggleVote(player, current);

          successes.push(current);

          if (successes.length >= amount) {
            break;
          };

        };

      };

      if (successes.length > 0) {
        executable.misc.sendPreemptMessage(player, successes);;
      };

    };

    if (clear_cache) {
      this.clearPreemptiveVotes();
    };

  }

  getGameFlavour () {
    var config = this.config;

    var flavour_identifier = this.flavour_identifier;

    if (!flavour_identifier) {
      // No flavour
      return null;
    };

    var flavour = flavours[flavour_identifier];

    if (!flavour) {
      console.warn("Invalid flavour " + flavour_identifier + "! Defaulting to no flavour.");
      return null;
    };

    return flavour;
  }

  addFastForwardVote (identifier) {

    if (this.votedFastForward(identifier)) {
      return null;
    };

    this.fast_forward_votes.push(identifier);
  }

  removeFastForwardVote (identifier) {

    if (!this.votedFastForward(identifier)) {
      return null;
    };

    this.fast_forward_votes = this.fast_forward_votes.filter(x => x !== identifier);
  }

  votedFastForward (identifier) {
    return this.fast_forward_votes.includes(identifier);
  }

  async fastforward () {

    this.voting_halted = true;

    return await this.timer.fastforward();

  }

  checkFastForward () {
    // Wrt to the configuration

    var alive_count = this.getAlive();

    var minimum = Math.ceil(alive_count * this.config["game"]["fast-forwarding"]["ratio"]);

    var ff_votes = this.fast_forward_votes;

    // Confirm that all players are alive
    ff_votes = ff_votes.filter(x => this.getPlayerByIdentifier(x).isAlive());

    var ratio = ff_votes.length/alive_count;
    var percentage = Math.round(ratio * 1000)/10;

    if (ff_votes.length >= minimum) {
      // Fast forward the game
      this.addBroadcastSummary("The game has been **fastforwarded** with __" + percentage + "%__ of alive players voting for such last cycle.");
      this.fastforward();
    };

  }

  checkRole (condition) {

    if (typeof condition === "function") {
      // Check
      return this.exists(condition);
    } else if (typeof condition === "string") {

      condition = condition.toLowerCase();

      // Check separately
      var cond1 = this.exists(x => x.isAlive() && x.role_identifier === condition);
      var cond2 = this.exists(x => x.isAlive() && x.role.alignment === condition);
      var cond3 = this.exists(x => x.isAlive() && x.role.class === condition);

      var cond4 = false;

      if (condition.includes("-")) {
        condition = condition.split("-");
        var cond4 = this.exists(x => x.isAlive() && x.role.alignment === condition[0] && x.role.class === condition[1]);
      };

      return cond1 || cond2 || cond3 || cond4;

    } else {
      return null;
    };

  }

  checkRoles (conditions) {

    var ret = false;

    for (var i = 0; i < conditions.length; i++) {
      ret = ret || this.checkRole(conditions[i]);
    };

    return ret;
  }

  getNoLynchVoters () {

    var ret = new Array();
    var no_lynch_vote = this.getPeriodLog()["no_lynch_vote"];

    // {identifier, magnitude}

    for (var i = 0; i < no_lynch_vote.length; i++) {
      ret.push(no_lynch_vote[i].identifier);
    };

    return ret;

  }

  getNoLynchVoteCount () {

    var count = new Number();
    var no_lynch_vote = this.getPeriodLog()["no_lynch_vote"];

    for (var i = 0; i < no_lynch_vote.length; i++) {
      count += no_lynch_vote[i].magnitude;
    };

    return count;

  }

  addNoLynchVote (identifier, magnitude) {
    var no_lynch_vote = this.getPeriodLog()["no_lynch_vote"];

    no_lynch_vote.push({identifier: identifier, magnitude: magnitude});
  }

  clearNoLynchVotesBy (identifier) {

    var no_lynch_vote = this.getPeriodLog()["no_lynch_vote"];

    var cleared = false;

    for (var i = no_lynch_vote.length - 1; i >= 0; i--) {
      if (no_lynch_vote[i].identifier === identifier) {
        no_lynch_vote.splice(i, 1);
        cleared = true;
      };
    };

    return cleared;

  }

  clearNoLynchVotes () {
    this.getPeriodLog()["no_lynch_vote"] = new Array();
  }

  isVotingNoLynch (identifier) {
    return this.getNoLynchVoters().includes(identifier);
  }

  hammerActive () {

    var trials_available = this.getTrialsAvailable();

    return this.config["game"]["lynch"]["allow-hammer"] && (trials_available < 2);

  }

  getTrialsAvailable () {

    var period_log = this.getPeriodLog();
    return period_log ? period_log["trials"] : Math.max(this.config["game"]["minimum-trials"], Math.ceil(this.config["game"]["lynch-ratio-floored"] * this.getAlive()));

  }

  clearAllVotesOn (identifier) {
    var player = this.getPlayerByIdentifier(identifier);

    player.clearVotes();
  }

  clearAllVotesFromAndTo (identifier) {

    // Stops votes to and from player
    this.clearNoLynchVotesBy(identifier);
    this.clearAllVotesBy(identifier);
    this.clearAllVotesOn(identifier);

  }

};
