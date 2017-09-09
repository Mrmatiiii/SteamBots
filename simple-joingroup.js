const SteamUser = require("steam-user");							//steam-user module for main steam client functions
const SteamCommunity = require("steamcommunity");					//steamcommunity module for logging onto http://steamcommunity.com/

const client = new SteamUser();
const community = new SteamCommunity();

var groupID64 = "103582791459768407";								//set up [groupID64]		tutorial on how to get groupID64 in README.md

const logOnOptions = {												//setting up our account "logOnOptions"
	accountName: "your-username",
	password: "your-password"
};

const SteamID = require("steamid");									//steamid module for more steam client functions
const groupID = new SteamID(groupID64);

client.logOn(logOnOptions);											//make your account log in using the "logOnOptions" we just set up
client.on("loggedOn", () => {										//if our account logged on the client
	console.log("Logged into Steam");								//OUTPUTS: "Logged into Steam"
	client.gamesPlayed("BOT Testing");								//"in Non-steam game BOT Testing"
	
	community.getSteamGroup(groupID, function(err, group) {			//use groupID64 	and set [callback] error	and set another [callback] group
        group.join(function(err) {									//join group with [callback] error
          if (err) console.log("Error: ", err);						//if error occurred -> OUTPUTS: "Error: [error]"
        });
    }); 
});

client.on("webSession", (sessionid, cookies) => {					//if our account is connected to http://steamcommunity.com/
    community.setCookies(cookies);									//set dumb cookies
});	
