const SteamUser = require("steam-user");																//steam-user module for main steam client functions
const SteamCommunity = require("steamcommunity");														//steamcommunity module for logging onto http://steamcommunity.com/

const client = new SteamUser();																			
const community = new SteamCommunity();																	

var colors = require("colors");																			//colors module for coloured console outputs
var fs = require("fs");																					//filesystem module for basic file functions

var groupID64 = "103582791459768407";																	//setting your [groupID64]		tutorial on how to get groupID64 in README.md
var Username = "a-username" + String(Math.trunc(Math.random() * 100000));								//set a username and add a random number to it chosen from 1 to 100,000
var Password = "a-password" + String(Math.trunc(Math.random() * 100));									//set a password and add a random number to it chosen from 1 to 100

const SteamID = require("steamid");																		
const groupID = new SteamID(groupID64);																	
 
client.logOn();																							//log on (anonymous) on a 'client'
client.on("loggedOn", () => {																			//if we logged on anonymously
    console.log("Logged into Steam".cyan);																//OUTPUTS in console (in cyan): "Logged into Steam"
    client.createAccount(Username, Password, "a-steam-profilename@gmail.com", function(result){			//create an with your just set up username and password 	and choose a profile name by using a fake (or real) email address		and set [callback] to "function(result)"
        if (result === 1) {																				//if result = 1 (which means that we succeeded creating the account)
			fs.appendFile("accounts.txt", Username + ":" + Password + "\n", function(err) {				//add your chosen username and password in the accounts.txt		by adding "\n" it will and the previous line of text
				if(err) {																						//if error occurred
					console.log(err);																			//OUTPUTS: "[error]"
				} else {																						//else (if no error)
					console.log(Username + ":" + Password + " - Saved.".green);							//OUTPUTS (in green): "chosen-username:chosen-password - Saved"
					client.logOff();																	//log off
					console.log("Logging off Steam".red);												//OUTPUTS (in red): "Logging off Steam"
					
					const Client = new SteamUser();														
					const Community = new SteamCommunity();												
					
					const logOnOptions = {																//
						accountName: Username,															//set your login credentials to the account we just created
						password: Password																//
					};
					
					Client.logOn(logOnOptions);															//make your account log in using the "logOnOptions" we just set up
					Client.on("loggedOn", () => {														//if our account logged on the client
						console.log("User logged into Steam".green);									//OUTPUTS in console (in green): "User logged into Steam"
					
					Client.on("webSession", (sessionid, cookies) => {									//if our account is connected to http://steamcommunity.com/
						Community.setCookies(cookies);													//setting dumb cookies
						Community.getSteamGroup(groupID, function(err, group) {							//get steamgroupID		and [callback] set to error		and a [callback] to the group
							group.join(function(err) {														//join group	and [callback] set to error
								if (err) {																		//if error occurred
									console.log("Error: ", err);												//OUTPUTS: "Error: [error]"
									process.exit(1);															//end the sequence so a new one can begin
								}																		
								if (!err) {																		//if no error occurred
									console.log("Joined Group");												//OUTPUTS: "Joined Group"
									process.exit(1);															//end the sequence so a new one can begin
								}
							});
						});
					});

					});
				}
			});
		} else {																						//else (if we couldn't create the account, which means the result was not equal to 1)
			console.log("ERROR: ".red + result);														//OUTPUTS: "ERROR: [result]"
			process.exit(1)																				//end the sequence so a new one can begin
		}
    });
});
 
client.on("webSession", (sessionid, cookies) => {														//if our account is connected to http://steamcommunity.com/
    community.setCookies(cookies);																		//setting dumb cookies
});
