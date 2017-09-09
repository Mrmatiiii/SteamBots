# SteamBots
##
Tutorial for Windows and iOS Device
Things you need:
 - iTunes
 - iExplorer
 - Windows
 
 
Method:
Follow the method described by Brad Pitt until you come to opening the file. Instead of doing that you copy or move your file to your desktop.
In the mean time you go to C:\Program Files (x86)\Common Files\Apple\Apple Application Support               (At least, that is the path for me)
Copy the following files to your desktop as well: asl.dll, CFNetwork.dll, CoreFoundation.dll, Foundation.dll, icudt46.dll, libdispatch.dll, libicuin.dll, libicuuc.dll, libtidy.dll, libxml2.dll, objc.dll, ptheadVC2.dll, SQLite3.dll and zlib.dll along with plutil.exe.  (SOME files, in my case had icudt55.dll instead of icudt.dll, this is possible and it will still work same for zlib1.dll instead of zlib.dll)
 
 
When you copied them all to your desktop, hold SHIFT and then right click onto open space on your DESKTOP. Click on Open Command Prompt here. Then run the following command by just copying the following and pasting it in the Command Prompt (In my case by just right-clicking onto the Command Prompt window).
 
Command:
plutil -p Steamguard-STEAMID
 
 
PLEASE NOTE:
Change the word "STEAMID" to the numbers in the name of the file you exported from your backup. DON'T FORGET to leave the '-' in the command.
 
 
Here is where it gets tricky, scroll down until you get a list like this
![console](https://github.com/rubenvanopstal/SteamBots/blob/master/img.png)
 
Of course, there aren't white lines but lines of numbers. As you can see, identity_secret is the 3rd (for ME at least) value from the top (DON'T use 4!)
Again, the white lines are NUMBERS and LETTERS. In my case, identity_secret was the 3rd value so I count from the top of the lines with numbers until I get to line 3. In this picture, it is line 16.
 
That is your identity_secret. If you want to use it for backpack.tf automatic, then launch backpack.tf automatic and when it is loaded type:
 
identity_secret "THE NUMBER YOU JUST COPIED FROM THE COMMAND LINE"       in the command prompt and then hit enter. It saved your identity_secret and from now on it will automatically confirm all your confirmations. 
 
PLEASE NOTE:
It confirms ALL your confirmations, even trades NOT made by the bot!
It does take some time before the trade is confirmed, give or take 15 seconds for each confirmation.
