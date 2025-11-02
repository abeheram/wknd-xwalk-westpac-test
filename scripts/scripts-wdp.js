require.config({
    paths: {
        'scriptjs': 'https://main--wknd-xwalk-westpac-test--abeheram.aem.live/scripts/scripts.js',
        'franklinjs': 'https://main--wknd-xwalk-westpac-test--abeheram.aem.live/scripts/lib-franklin.js'
    }
});
define([], function () {
    "use strict";
    function main(){
        return  require(['scriptjs','franklinjs'],function(){
            "use strict";
       });
    }
    return {
        wdp:main
    }
});