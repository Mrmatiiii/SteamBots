# SteamBots
### How to get your shared secrets
You might be wondering where to find the shared secret and there are actually many tutorials depending on your device. If you are on iPhone you can try [this](http://forums.backpack.tf/index.php?/topic/45995-guide-how-to-get-your-shared-secret-from-ios-device-steam-mobile/) method, while if you are using an Android you can try [this](https://www.reddit.com/r/SteamBot/comments/3w5zwb/info_get_your_2fa_codes_from_android_no_root/) tutorial. All that you have to know is that the shared secret is used to generate your 2FA login code, while the identity secret is used for trade and market confirmations. 

### How to get a GroupID64
You do not use the URL group ID, you must check it by converting the group page to XML and thus finding the real groupID64 needed:
http://steamcommunity.com/groups/GROUP-ID-HERE/memberslistxml/?xml=1

eg: TF2's Official Group ID is 103582791430075519 as seen in http://steamcommunity.com/games/TF2/memberslistxml/?xml=1
