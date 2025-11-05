
require(['https://main--wknd-xwalk-westpac-test--abeheram.aem.live/scripts/scripts.js'], function (a) {
   "use strict";
    function main(){
       console.log("WDP script loaded first time");
    }
    return {
        wdp:main
    }
});
console.log("WDP script loaded second time");