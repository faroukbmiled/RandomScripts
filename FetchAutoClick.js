// ==UserScript==
// @name        Click on most recent link altenens
// @namespace   None
// @match *://altenens.is/forums/*
// @version     4.0
// @author      Ryuk
// @grant       window.focus
// @grant       unsafeWindow
// @require     https://code.jquery.com/jquery-3.6.3.min.js
// @description Opens the link with the "A moment ago" time element in a new tab and focuses on the window
// ==/UserScript==

(function() {
    'use strict';
    let targetTimeElement = null;
    let dataTimeValue = null;
    let lastCheckedDataTimeValue = null;
    setInterval(() => {
        fetch('linkhere')
            .then(response => response.text())
            .then(data => {
            var $ = jQuery;
            let timeElements = $(data).find('time.u-dt:not([class*=" "])');
            for(let i=0; i< timeElements.length;i++){
                if(timeElements[i].textContent === 'A moment ago'){
                    targetTimeElement = timeElements[i];
                    break;
                }
            }
            if(targetTimeElement) {
                dataTimeValue = targetTimeElement.getAttribute('data-time');
                if (dataTimeValue === lastCheckedDataTimeValue) {
                    console.log('The data has not changed, link will not be clicked.');
                } else {
                    console.log('The data has changed, link will be clicked.');
                    lastCheckedDataTimeValue = dataTimeValue;
                    const linkElement = targetTimeElement.closest('a');
                    if(linkElement) {
                        linkElement.setAttribute('target','_blank');
                        linkElement.click();
                    }
                }
            }
        });
    }, 700);
})();
