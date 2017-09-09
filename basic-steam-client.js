const SteamUser = require("steam-user");												//steam-user module for main steam client functions
const SteamTotp = require("steam-totp");												//steam-totp module for two factor auth
const SteamCommunity = require("steamcommunity");										//steamcommunity module for logging onto http://steamcommunity.com/
const TradeOfferManager = require("steam-tradeoffer-manager");							//steam-tradeoffer-manager module for handling trades

var colors = require("colors");															//colors module for coloured console outputs

const client = new SteamUser();
const community = new SteamCommunity();
const manager = new TradeOfferManager({
	steam: client,
	community: community,
	language: "en"
});

const logOnOptions = {																	//setting up our account "logOnOptions"
	accountName: "your-username",
	password: "your-password",
	twoFactorCode: SteamTotp.generateAuthCode("your-sharedscret")						//generates your Steam Guard Code for you		!ONLY you have SteamAuthenticator enabled!
																						//view README.md for a tutorial on how to get your 'secrets'
};

client.logOn(logOnOptions);																//make your account log in using the "logOnOptions" we just set up
client.on("loggedOn", () => {															//if our account logged on the client
	console.log("Logged into Steam".green);												//OUTPUTS in console (in green): "Logged into Steam"
	
	client.gamesPlayed(["Boosting Hours", 20, 70, 50, 9480, 300, 40, 130, 10, 730]);	//"in Non-steam game Boosting Hours" and farming hours for appIDs: 20, 70, 50, 9480, 300, 40, 130, 10, 730
	console.log("Boosting our hours on chosen games ...".yellow);
	
	client.setPersona(SteamUser.Steam.EPersonaState.Snooze);							//setting the accounts state to Snooze (also shows a message saying you are 'Sleeping' to whoever messages you on steam while farming hours
	console.log("Set state to Snooze".blue);
});

client.on("webSession", (sessionid, cookies) => {										//if our account is connected to http://steamcommunity.com/
	manager.setCookies(cookies);														
	community.setCookies(cookies);														
	community.startConfirmationChecker(10000, "your-indentity-secret");					//start checking for trade offers to accept every 10,000 milliseconds (1 s = 1000 ms) 		!ONLY you have SteamAuthenticator enabled!
});

client.on("friendRelationship", (steamid, relationship) => {							//handling incoming relationship		and create a [callback] for his SteamID		and create a [callback] for your relationship with the steamid
    if (relationship === 2) {															//if your relationship with [steamid]'s is 'not friends'
		client.getSteamLevels([steamid], function(results) {							//get [steamid]'s SteamLevel and create a [callback] "function(results)"
		
		if (results[steamid] <= 6) {													//if the result of [steamid]'s level is lower or equal 6
			console.log([steamid] + "'s" + "Steam Level is too low.".red);				//OUTPUTS: "[steamid]'s Stem Level is too low."
			client.removeFriend(steamid);												//ignore [steamid]'s request
		}
		if (results[steamid] > 6) {														//if the result of [steamid]'s level is greater than 6
			client.addFriend(steamid);													//accept [steamid]'s request
			console.log("Friendrequest Accepted. - SteamID: ".yellow + [steamid]);		
			client.chatMessage(steamid, "Note: You have been accepted by Ruben Van Opstal's SteamBot.");		//message [steamid]
			}
			
    	});
	}
});

manager.on("newOffer", (offer) => {														//when the tradeoffer-manager receives a new offer 		and saves the tradeoffer-ID as a [callback]
	if (offer.itemsToGive.length === 0) {												//if the items you need to give away equals 0
		offer.accept((err, status) => {													//accept the offer 		and save [callback] = error		and [callback] status
			if (err) {																			//if an error occurred
				console.log(err);																//OUTPUTS: "[error]"
			} else {																			//else (if no error)
				console.log(`Donation accepted. Status: ${status}.`);					//OUTPUTS: "Donation accepted. Status: [tradeoffer-status].
			}
		});
	} else {																			//else (if) items you need to give is not equal to 0
		offer.decline((err) => {														//decline the offer		and save [callback] to error
			if (err) {																			//if an error occurred
				console.log(err);																//OUTPUTS: "[error]"
			} else {																			//else (if no error)
				console.log("Tradeoffer declined (wanted our items).".red);
			}
		});
	}
});

client.on("friendMessage", function(steamid, message) {																			//when you receive a message from any SteamFriend		and create a [callback] for his SteamID		and create a [callback] for the message he sent to you
        if (message === "invite") {																								//if [steamid]'s message is equal to "invite"
            client.getSteamLevels([steamid], function(results) {																//get [steamid]'s SteamLevel 	and create a [callback] "function(results)" to store the number
            console.log("Level: ".yellow, results);																				//OUTPUTS: "Level: [level]"
                if (results[steamid] > 10) {																					//if the results of [steamid] is greater than 10
                    client.inviteToGroup(steamid, "103582791458129100");														//invite [steamid] to [groupID64]		tutorial on how to get groupID64 in README.md
                    console.log("Invited ".green + steamid.getSteam3RenderedID() + " to the group!".green);				
                } else {																										//if the result of [steamid]'s level is not greater or equal than 10
					console.log(steamid.getSteam3RenderedID() + " not invited to the group due to lower steam level.".red);
				}
            });
        } else {																												//if [steamid]'s message is not equal to "invite"
			console.log("Friend message from " + steamid.getSteam3RenderedID() + ": " + message);								//OUTPUTS: "Friend message from [steamid]: (message)"
		}
});

/*
client.on("friendMessage#76561198281849949", function(steamid, message) {									//when you receive a message from SteamFriend with SteamID: "76561198281849949"			and create a [callback] for the message he sent to you
	console.log("Friend message from " + steamid.getSteam3RenderedID() + ": " + message);					//OUTPUTS: "Friend message from [steamid]: (message)"
});
*/
