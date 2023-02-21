// ==UserScript==
// @name         Zoneminder Weather
// @namespace    zoneminderWeather
// @version      0.22
// @description  Add a weather widget using openweathermap.org API, shows up on montage screen bottom right.
// @author       adamdrumm.com
// @match        http://192.168.1.39/zm/*view=montage*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1.39
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require  https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js
// @require  https://cdn.jsdelivr.net/npm/dayjs/plugin/relativeTime.js
// @resource   weatherCSS https://raw.githubusercontent.com/Apezdr/ZoneminderWidgets/main/weather.css
// @grant      GM_getResourceText
// @grant      GM_addStyle
// ==/UserScript==
const my_css = GM_getResourceText("weatherCSS");
var $ = jQuery,
    lastUpdatedDate = dayjs();
dayjs.extend(window.dayjs_plugin_relativeTime);

var $boilerplateCSS = $('<link rel="stylesheet" href="https://raw.githubusercontent.com/Apezdr/ZoneminderWidgets/main/weather.css">');
var $boilerplateHTML = $(`<div class='weather-app'>
  <div class='weather-app_main'>
    <div class='weather-app_main__information'>
      <div class='first-cont'>
        <img class='weather-app_main__information--icon' src='#'>
        <h1 class='weather-app_main__information--city'></h1>
        <h2 class='weather-app_main__information--temperature'></h2>
      </div>
      <div>
        <h3 class='weather-app_main__information--description'></h3>
      </div>
    </div>
    <div class="weather-app-footer">
       <span>Last Updated: </span><span class="last-updated"></span>
    </div>
  </div>
  <style>.weather-app_main{height:auto;}</style>
</div>`);

var weather = {
    get: ()=>{
        var lat = '35.2982',
            lon = '-81.0159';

        $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=436db116f5f79b7d1fddadddd9e4513d", function(data) {

            // Our Data
            var icon = data.weather[0].icon;
            var icon_replace = $(".weather-app_main__information--icon").attr("src");
            $(".weather-app_main__information--city").html(data.name);
            var temp = Math.round((data.main.temp));
            var description = data.weather[0].description;
            var cDescription = description.charAt(0).toUpperCase() + description.slice(1);
            lastUpdatedDate = dayjs();

            // Apply Data To Page
            $(".weather-app_main__information--icon").attr("src", icon_replace.replace("#", "https://openweathermap.org/img/wn/" + icon + "@2x.png"));
            $(".weather-app_main__information--temperature").html(temp + "°F");
            $(".weather-app_main__information--description").html(cDescription);
            $('.weather-app-footer .last-updated').html(dayjs(lastUpdatedDate).fromNow());
        })
    },
    updateLastSeen: ()=>{
        $('.weather-app-footer .last-updated').html(dayjs(lastUpdatedDate).fromNow());
    }
}

$(document).ready(()=>{
    GM_addStyle(my_css);
    $('html > head').append($boilerplateCSS);
    $('#monitors').append($boilerplateHTML);


    weather.get();
	//
    // 20 minutes
    setInterval(()=> weather.get(),1200000);
	//
	// 15 seconds
    setInterval(()=> weather.updateLastSeen(),15000);
    //weather();
});
