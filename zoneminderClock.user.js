// ==UserScript==
// @name         Zoneminder Clock
// @namespace    zoneminderClock
// @version      0.1
// @description  Add a clock, bottom right gray space.
// @author       Adam
// @match        http://192.168.1.2/zm/*view=montage*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1.39
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @grant        none
// ==/UserScript==
var $ = jQuery;

const clock = () => {
    let $clock = $('<h1 style="position: absolute;right: 30px;bottom: 0;text-align: right;"></h1>');

    function getTime() {
        var dateTime = new Date();
        var minutes;
        var seconds;
        var date = dateTime.toLocaleDateString('en-US');

        //   add zeros if seconds or minutes are less than 10
        if (dateTime.getMinutes() < 10) {
            minutes = '0' + dateTime.getMinutes();
        }
        else {
            minutes = dateTime.getMinutes();
        }
        if (dateTime.getSeconds() < 10) {
            seconds = '0' + dateTime.getSeconds();
        }
        else {
            seconds = dateTime.getSeconds();
        }

        $clock.html( '<div style="color: gray;font-size: 100px;">' + dateTime.toLocaleTimeString('en-US') + '</div>' +
                     '<div style="font-size: 20px;color: rgba(255,255,255,.5)">' + date + "  " + dateTime.toLocaleDateString('en-US', {weekday: 'long'}) + '</div>');
    }

    setInterval(function() {
        getTime();
    }, 1000);

    return $('#content #monitors').after($clock);
};

$(document).ready(()=>{
    clock();
})
