// ==UserScript==
// @name        Click on most recent link altenens
// @namespace   None
// @match *://link/*
// @version     4.0
// @author      Ryuk
// @grant       window.focus
// @grant       unsafeWindow
// @description Opens the link with the "A moment ago" time element in a new tab and focuses on the window
// ==/UserScript==


(function() {
    'use strict';
    let lastCheckedDataTimeValue = null;

    function fetchAndCheckData() {
        fetch('*://link/*', { cache: 'no-store' })
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(data, 'text/html');
                let timeElements = doc.querySelectorAll('time.u-dt:not([class*=" "])');
                let targetTimeElement = Array.from(timeElements).find(element => element.textContent === 'A moment ago');
                if (targetTimeElement) {
                    let dataTimeValue = targetTimeElement.getAttribute('data-time');
                    if (dataTimeValue === lastCheckedDataTimeValue) {
                        console.log('The data has not changed, link will not be clicked.');
                    } else {
                        console.log('The data has changed, link will be clicked.');
                        lastCheckedDataTimeValue = dataTimeValue;
                        let linkElement = targetTimeElement.closest('a');
                        if (linkElement) {
                            window.open(linkElement.href, '_blank');
                        }
                    }
                }
                fetchAndCheckData();
            });
    }
    fetchAndCheckData();
})();





