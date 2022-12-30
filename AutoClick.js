// ==UserScript==
// @name        Click on most recent link altenens
// @namespace   https://github.com/
// @match *://altenens.is/forums/*
// @version     2.0
// @author      Ryuk
// @grant       window.focus
// @description Opens the link with the "A moment ago" time element in a new tab and focuses on the window
// ==/UserScript==

(function() {
    'use strict';

    let targetTimeElement = null;
    const timeElements = document.querySelectorAll('time.u-dt:not([class*=" "])');
    timeElements.forEach(timeElement => {
        if (timeElement.textContent === 'A moment ago') {
            targetTimeElement = timeElement;
            return;
        }
    });

    if (targetTimeElement) {
        const dataTimeValue = targetTimeElement.getAttribute('data-time');
        if (dataTimeValue === localStorage.getItem('lastCheckedDataTimeValue')) {
            console.log('The data-time value has not changed, so the link will not be clicked.');
        } else {
            console.log('The data-time value has changed, so the link will be clicked.');
            localStorage.setItem('lastCheckedDataTimeValue', dataTimeValue);
            const linkElement = targetTimeElement.closest('a');
            if (linkElement) {
                window.open(linkElement.href, '_blank');
            }
        }
    }
})();
