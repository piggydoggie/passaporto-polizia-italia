// ==UserScript==
// @name         Passaporto Tweaker
// @version      0.1
// @description  a script to understand better the availability when requesting a new passport in Italy
// @author       giorgiodalessandro@aol.com
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(() => {
        if (!window.location.href.startsWith("https://www.passaportonline.poliziadistato.it/CittadinoAction.do?codop=resultRicercaRegistiProvincia")) return undefined;
        if (!document?.getElementById('infos')?.children[2].children?.length) return undefined;

        let table = document?.getElementById('infos')?.children[2].children
        
        // the city that only fit to you
        const myCity = 'ROMA'
        // the 'places' to skip
        const toSkip = [
            "COMMISSARIATO MONTE MARIO",
            "COMMISSARIATO PRENESTINO",
            "COMMISSARIATO LIDO DI ROMA"
        ];

        for (let i = 0; i < table?.length; i++) {
            let iteration = table?.item(i);

            const rowCity = iteration?.children?.item(0)?.innerText
            const rowProvince = iteration?.children?.item(3);
            const rowAvailability = iteration?.children?.item(5);
            const rowHref = iteration?.children.item(6)?.children[0]?.getAttribute('href')?.split("data=");

            if (
                rowProvince?.innerHTML != myCity ||
                rowAvailability?.innerHTML != "Si" ||
                !rowHref ||
                !rowAvailability ||
                !!toSkip.find(e => e == rowCity)
            ) {
                document.getElementById(iteration.id).innerHTML = '';
                continue;
            }

            rowAvailability.innerHTML = rowHref[1];
        }
    }, 350)
})();
