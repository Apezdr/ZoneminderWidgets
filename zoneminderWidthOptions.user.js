// ==UserScript==
// @name         Zoneminder add Frame Width Options
// @namespace    zoneminderWidthOptions
// @version      0.1
// @description  Add options for width to zoneminder camera montage view.
// @author       adamdrumm.com
// @match        http://192.168.1.39/zm/*view=montage*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1.39
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @grant        none
// ==/UserScript==
var $ = jQuery;

const widthOptions = [
    "380px",
    "400px",
    "420px",
    "440px",
    "450px",
    "460px",
    "470px",
    "480px",
    "490px",
];

$(document).ready(()=>{
    const $widthElem = $('[name="width"]');

    const $elemArray = widthOptions.map((option)=>{
        return `<option value="${option}">${option}</option>`;
    })
    $widthElem.append($elemArray);
    /* Add first, then sort it */
    var options = $('option', $widthElem);
    options.detach().sort(function(a,b) {
        var at = parseInt($(a).text().replace('px',''));
        var bt = parseInt($(b).text().replace('px',''));
        return (at > bt)?1:((at < bt)?-1:0);
    });
    options.appendTo($widthElem);
});
