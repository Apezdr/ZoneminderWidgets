
# ZoneminderWidgets
Widgets for Zoneminder used primarily on the Montage screens.

Hoping to make some folks who look this over, have a bit of a more customized experience with ZoneMinder. I'm going to go straight to the meat and potatoes of what I wanted to accomplish.

# TamperMonkey

### Example![Example Weather & Clock](https://github.com/Apezdr/ZoneminderWidgets/blob/main/screen-example.png?raw=true)
This shows the Weather Widget and Time widgets. There is a unpictured script that adds width options to the montage screen for the windows, managing the windows is a HUGE pain so wrote in some additional options for the middle of the road resolutions.

## Want to check it out?

### Install
Chrome Extension - [TamperMonkey Google Extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

## Addons

#### Montage Screen

 - **Weather Widget**
	 - [Weather TamperMonkey Install](https://github.com/Apezdr/ZoneminderWidgets/raw/main/zoneminderWeather.user.js)
		 - This will update itself every 20 minutes to keep within API limits
		 - The UI will check to update the "Last Updated:" field every 15 seconds giving a more dynamic feel to the UI so you can get a more accurate idea of how long it has been since it last updated.
 - **Clock Widget**
	 - [Clock TamperMonkey Install](https://github.com/Apezdr/ZoneminderWidgets/raw/main/zoneminderClock.user.js)
		 - Clock will use local computer time with localization but 24 hour time is a easy fix [zoneminderClock.user.js#L37](https://github.com/Apezdr/ZoneminderWidgets/blob/main/zoneminderClock.user.js#L37) Line 37 `dateTime.toLocaleTimeString('en-US')` if you change the locale it should do what you want. Google it  :P
 - **Width Options**
	 - [Width Options TamperMonkey Install](https://github.com/Apezdr/ZoneminderWidgets/raw/main/zoneminderWidthOptions.user.js)

### Setup

##### Weather Widget Setup: OpenWeather API Key
If using the weather widget, you'll need to update a few things to have it work for your location. First you'll need to get an API key, registration is required to get a key. Rate restrictions apply to update requests so using the widget in its current implementation is recommended. [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)

#### File reference:
[https://github.com/Apezdr/ZoneminderWidgets/blob/main/zoneminderWeather.user.js](https://github.com/Apezdr/ZoneminderWidgets/blob/main/zoneminderWeather.user.js)

#### API Key Update:
[zoneminderWeather.user.js#L46](https://github.com/Apezdr/ZoneminderWidgets/blob/main/zoneminderWeather.user.js#L46) - Update after "&appid=##########"

#### On Line 43-44 in the file see below:

    var weather = {
        get: ()=>{
            var lat = '35.2982',
                lon = '-81.0159';
                ...

#### How Do I get my coordinates?

**To get your coordinates go to the following page:** [https://openweathermap.org/](https://openweathermap.org/)
Then open your **developer toolbar** (F12) and **open the network tab**. Click the "**Preserve Log**" checkbox and **refresh the page**.
Look for the item in the list that begins with "weather?id=" and use the coord object to change your tampermonkey file to match your coordinates.
![Example Network Request](https://github.com/Apezdr/ZoneminderWidgets/blob/main/Screenshot%202023-02-20%20204830.png?raw=true)

#### Noticing your CSS Changes aren't updating?

So you just updated your CSS file in github and the changes aren't showing up in your local browser? Easy fix, just update the version number in your tampermonkey script and it will force the dependencies linked to update again. Clever little hack to fix your css woes!

All changes can be made in your browser and do not require you to fork the repo on github, however feel free to do as you wish!
