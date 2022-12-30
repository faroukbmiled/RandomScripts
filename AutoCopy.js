// ==UserScript==
// @name         Auto copy example
// @namespace    github.com
// @version      1.5
// @description  Copies the first 3/5 and 16-digit numbers found on the page to the clipboard
// @author       Ryuk
// @match        *://altenens.is/forums/*
// @grant        clipboardWrite
// ==/UserScript==


(function() {
    'use strict';

    const elements = document.querySelectorAll('*');

    let found3DigitNumber = false;
    let found16DigitNumber = false;
    let found5DigitNumber = false;
    let matches16 = null;
    let matches3 = null;
    let matches5 = null;

    for (let element of elements) {
        if (!found16DigitNumber) {
            const regex16 = /\d{16}/g;
            matches16 = element.textContent.match(regex16);
            if (matches16) {
                console.log(matches16);
                found16DigitNumber = true;
            }
        }

        if (found16DigitNumber) {
            const regex3 = /(?<!\d)\d{3}(?!\d)/g;
            matches3 = element.textContent.substring(element.textContent.indexOf(matches16[0]) + matches16[0].length).match(regex3);
            if (matches3) {
                found3DigitNumber = true;
            }
        }

        if (found3DigitNumber) {
            const regex5 = /(?<!\d)\d{5}(?!\d)/g;
            matches5 = element.textContent.match(regex5);
            console.log(matches5);
            found5DigitNumber = true;
        }

        if (found3DigitNumber && found16DigitNumber) {
            break;
        }
    }

    if (!matches5 || !found5DigitNumber) {
        const random5DigitNumber = 27808;

        navigator.clipboard.writeText(random5DigitNumber).then(() => {
            console.log(`Const 5 ${random5DigitNumber} written to clipboard`);

            setTimeout(() => {
                navigator.clipboard.writeText(matches3[0]).then(() => {
                    console.log(`3 ${matches3[0]} written to clipboard`);

                    setTimeout(() => {
                        navigator.clipboard.writeText(matches16[0]).then(() => {
                            console.log(`16 ${matches16[0]} written to clipboard`);
                        }).catch(error => {
                            console.error(error);
                        });
                    }, 250);
                }).catch(error => {
                    console.error(error);
                });
            }, 250);
        }).catch(error => {
            console.error(error);
        });
    } else {
        navigator.clipboard.writeText(matches5[0]).then(() => {
            setTimeout(() => {
                navigator.clipboard.writeText(matches3[0]).then(() => {
                    setTimeout(() => {
                        navigator.clipboard.writeText(matches16[0]).then(() => {
                        }).catch(error => {
                            console.error(error);
                        });
                    }, 250);
                }).catch(error => {
                    console.error(error);
                });
            }, 250);
        }).catch(error => {
            console.error(error);
        });
    }
})();

