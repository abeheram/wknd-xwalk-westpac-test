
console.log("WDP: Starting require() call for Franklin and Analytics libs");
require(['https://main--wknd-xwalk-westpac-test--abeheram.aem.live/scripts/lib-franklin2.js','https://main--wknd-xwalk-westpac-test--abeheram.aem.live/scripts/analytics/lib-analytics2.js'], function (franklinLib, analyticsLib) {
    console.log("WDP: RequireJS callback started - libraries loaded successfully");
    console.log("WDP: Franklin lib:", franklinLib);
    console.log("WDP: Analytics lib:", analyticsLib);
//function main() {
       console.log("WDP: Starting module initialization");
       console.log("WDP: Destructuring Franklin library functions");
       const {
         sampleRUM,
         getAllMetadata,
         getMetadata,
         loadHeader,
         loadFooter,
         decorateButtons,
         decorateIcons,
         decorateSections,
         decorateBlocks,
         decorateTemplateAndTheme,
         waitForLCP,
         loadBlocks,
         loadCSS,
         buildBlock,
         readBlockConfig,
       } = franklinLib;
       console.log("WDP: Destructuring Analytics library functions");
       const {
         analyticsTrack404,
         analyticsTrackConversion,
         analyticsTrackCWV,
         analyticsTrackError,
         initAnalyticsTrackingQueue,
         setupAnalyticsTrackingWithAlloy,
       } = analyticsLib;

       console.log("WDP: Setting up global configurations");
       const LCP_BLOCKS = []; // add your LCP blocks to the list
       window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here
       
       // Define the custom audiences mapping for experience decisioning
       const AUDIENCES = {
         mobile: () => window.innerWidth < 600,
         desktop: () => window.innerWidth >= 600,
         'new-visitor': () => !localStorage.getItem('franklin-visitor-returning'),
         'returning-visitor': () => !!localStorage.getItem('franklin-visitor-returning'),
       };
       
       console.log("WDP: Adding HLX plugins");
       window.hlx.plugins.add('rum-conversion', {
         url: '/plugins/rum-conversion/src/index.js',
         load: 'lazy',
       });
       
       window.hlx.plugins.add('experimentation', {
         condition: () => getMetadata('experiment')
           || Object.keys(getAllMetadata('campaign')).length
           || Object.keys(getAllMetadata('audience')).length,
         options: { audiences: AUDIENCES },
         load: 'eager',
         url: '/plugins/experimentation/src/index.js',
       });
       console.log("WDP: HLX plugins added successfully");
       
       function getSiteRoot(level = 3, path = window.location.pathname) {
         return path.split(/[/.]/, level).join('/');
       }
       
       /**
        * Determine if we are serving content for the block-library, if so don't load the header or footer
        * @returns {boolean} True if we are loading block library content
        */
       function isBlockLibrary() {
         return window.location.pathname.includes('block-library');
       }
       
       /**
        * Convience method for creating tags in one line of code
        * @param {string} tag Tag to create
        * @param {object} attributes Key/value object of attributes
        * @param {HTMLElement | HTMLElement[] | string} children Child element
        * @returns {HTMLElement} The created tag
        */
       function createTag(tag, attributes, children) {
         const element = document.createElement(tag);
         if (children) {
           if (children instanceof HTMLElement
             || children instanceof SVGElement
             || children instanceof DocumentFragment) {
             element.append(children);
           } else if (Array.isArray(children)) {
             element.append(...children);
           } else {
             element.insertAdjacentHTML('beforeend', children);
           }
         }
         if (attributes) {
           Object.entries(attributes).forEach(([key, val]) => {
             element.setAttribute(key, val);
           });
         }
         return element;
       }
       
       function buildTabs(main) {
         const tabs = [...main.querySelectorAll(':scope > div')]
           .map((section) => {
             // section metadata not yet parsed
             const sectionMeta = section.querySelector('div.section-metadata');
             if (sectionMeta) {
               const meta = readBlockConfig(sectionMeta);
               return [section, meta.tab];
             }
             return null;
           })
           .filter((el) => !!el);
         if (tabs.length) {
           const section = document.createElement('div');
           section.className = 'section';
           const ul = document.createElement('ul');
           ul.append(...tabs
             .map(([, tab]) => {
               const li = document.createElement('li');
               li.innerText = tab;
               return li;
             }));
           const tabsBlock = buildBlock('tabs', [[ul]]);
           section.append(tabsBlock);
           tabs[0][0].insertAdjacentElement('beforebegin', section);
         }
       }
       
       /**
        * Builds all synthetic blocks in a container element.
        * @param {Element} main The container element
        */
       function buildAutoBlocks(main) {
         try {
           buildTabs(main);
         } catch (error) {
           // eslint-disable-next-line no-console
           console.error('Auto Blocking failed', error);
         }
       }
       
       function patchDemoBlocks(config) {
         if (window.wknd.demoConfig.blocks && window.wknd.demoConfig.blocks[config.blockName]) {
           const url = window.wknd.demoConfig.blocks[config.blockName];
           const splits = new URL(url).pathname.split('/');
           const [, owner, repo, , branch] = splits;
           const path = splits.slice(5).join('/');
       
           const franklinPath = `https://little-forest-58aa.david8603.workers.dev/?url=https://${branch}--${repo}--${owner}.hlx.live/${path}`;
           return {
             ...config,
             jsPath: `${franklinPath}/${config.blockName}.js`,
             cssPath: `${franklinPath}/${config.blockName}.css`,
           };
         }
         return (config);
       }
       
       async function loadDemoConfig() {
         const demoConfig = {};
         const pathSegments = window.location.pathname.split('/');
         if (window.location.pathname.startsWith('/drafts/') && pathSegments.length > 4) {
           const demoBase = pathSegments.slice(0, 4).join('/');
           const resp = await fetch(`${demoBase}/theme.json?sheet=default&sheet=blocks&`);
           if (resp.status === 200) {
             const json = await resp.json();
             const tokens = json.data || json.default.data;
             const root = document.querySelector(':root');
             tokens.forEach((e) => {
               root.style.setProperty(`--${e.token}`, `${e.value}`);
               demoConfig[e.token] = e.value;
             });
             demoConfig.tokens = tokens;
             demoConfig.demoBase = demoBase;
             const blocks = json.blocks ? json.blocks.data : [];
             demoConfig.blocks = {};
             blocks.forEach((block) => {
               demoConfig.blocks[block.name] = block.url;
             });
       
             window.hlx.patchBlockConfig.push(patchDemoBlocks);
           }
       
           if (!demoConfig.demoBase) {
             const navCheck = await fetch(`${demoBase}/nav.plain.html`);
             if (navCheck.status === 200) {
               demoConfig.demoBase = demoBase;
             }
           }
         }
         window.wknd = window.wknd || {};
         window.wknd.demoConfig = demoConfig;
       }
       
       /**
        * Decorates the main element.
        * @param {Element} main The main element
        */
       // eslint-disable-next-line import/prefer-default-export
       function decorateMain(main) {
         // hopefully forward compatible button decoration
         decorateButtons(main);
         decorateIcons(main);
         buildAutoBlocks(main);
         decorateSections(main);
         decorateBlocks(main);
       }
       
       /**
        * loads everything needed to get to LCP.
        */
       async function loadEager(doc) {
         console.log("WDP: Starting loadEager()");
         document.documentElement.lang = 'en';
         decorateTemplateAndTheme();
       
         console.log("WDP: Running eager plugins");
         await window.hlx.plugins.run('loadEager');
       
         // load demo config
         console.log("WDP: Loading demo config");
         await loadDemoConfig();
       
         const main = doc.querySelector('main');
         if (main) {
           console.log("WDP: Main element found, initializing analytics and decorating");
           await initAnalyticsTrackingQueue();
           decorateMain(main);
           await waitForLCP(LCP_BLOCKS);
         } else {
           console.log("WDP: No main element found");
         }
         console.log("WDP: loadEager() completed");
       }
       
       /**
        * Adds the favicon.
        * @param {string} href The favicon URL
        */
       function addFavIcon(href) {
         const link = document.createElement('link');
         link.rel = 'icon';
         link.type = 'image/png';
         link.href = href;
         const existingLink = document.querySelector('head link[rel="icon"]');
         if (existingLink) {
           existingLink.parentElement.replaceChild(link, existingLink);
         } else {
           document.getElementsByTagName('head')[0].appendChild(link);
         }
       }
       
       /**
        * loads everything that doesn't need to be delayed.
        */
       async function loadLazy(doc) {
         console.log("WDP: Starting loadLazy()");
         const main = doc.querySelector('main');
         console.log("WDP: Loading blocks");
         await loadBlocks(main);
       
         const { hash } = window.location;
         const element = hash ? main.querySelector(hash) : false;
         if (hash && element) {
           console.log("WDP: Scrolling to hash element:", hash);
           element.scrollIntoView();
         }
       
         if (!isBlockLibrary()) {
           console.log("WDP: Loading header and footer");
           loadHeader(doc.querySelector('header'));
           loadFooter(doc.querySelector('footer'));
         } else {
           console.log("WDP: Block library detected, skipping header/footer");
         }
       
         if (window.wknd.demoConfig.fonts) {
           console.log("WDP: Loading custom fonts");
           const fonts = window.wknd.demoConfig.fonts.split('\n');
           fonts.forEach(async (font) => {
             const [family, url] = font.split(': ');
             const ff = new FontFace(family, `url('${url}')`);
             await ff.load();
             document.fonts.add(ff);
           });
         } else {
           console.log("WDP: Loading default lazy styles");
           loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
         }
         console.log("WDP: Adding favicon and setting up RUM");
         addFavIcon(`${window.wknd.demoConfig.demoBase || window.hlx.codeBasePath}/favicon.png`);
         sampleRUM('lazy');
         sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
         sampleRUM.observe(main.querySelectorAll('picture > img'));
       
         // Mark customer as having viewed the page once
         localStorage.setItem('franklin-visitor-returning', true);
       
         console.log("WDP: Running lazy plugins");
         window.hlx.plugins.run('loadLazy');
         console.log("WDP: loadLazy() completed");
       }
       
       /**
        * loads everything that happens a lot later, without impacting
        * the user experience.
        */
       function loadDelayed() {
         // eslint-disable-next-line import/no-cycle
         window.setTimeout(() => {
           window.hlx.plugins.load('delayed');
           window.hlx.plugins.run('loadDelayed');
           return import('./delayed.js');
         }, 3000);
         // load anything that can be postponed to the latest here
       }
       
       async function loadPage() {
         console.log("WDP: Starting loadPage() function");
         console.log("WDP: Loading eager plugins");
         await window.hlx.plugins.load('eager');
         console.log("WDP: Calling loadEager()");
         await loadEager(document);
         console.log("WDP: Loading lazy plugins");
         await window.hlx.plugins.load('lazy');
         console.log("WDP: Calling loadLazy()");
         await loadLazy(document);
         console.log("WDP: Setting up analytics");
         const setupAnalytics = setupAnalyticsTrackingWithAlloy(document);
         console.log("WDP: Starting delayed loading");
         loadDelayed();
         await setupAnalytics;
         console.log("WDP: loadPage() completed successfully");
       }
       
       const cwv = {};
       
       // Forward the RUM CWV cached measurements to edge using WebSDK before the page unloads
       window.addEventListener('beforeunload', () => {
         if (!Object.keys(cwv).length) return;
         analyticsTrackCWV(cwv);
       });
       
       // Callback to RUM CWV checkpoint in order to cache the measurements
       sampleRUM.always.on('cwv', async (data) => {
         if (!data.cwv) return;
         Object.assign(cwv, data.cwv);
       });
       
       sampleRUM.always.on('404', analyticsTrack404);
       sampleRUM.always.on('error', analyticsTrackError);
       
       // Declare conversionEvent, bufferTimeoutId and tempConversionEvent,
       // outside the convert function to persist them for buffering between
       // subsequent convert calls
       const CONVERSION_EVENT_TIMEOUT_MS = 100;
       let bufferTimeoutId;
       let conversionEvent;
       let tempConversionEvent;
       sampleRUM.always.on('convert', (data) => {
         const { element } = data;
         // eslint-disable-next-line no-undef
         if (!element || !alloy) {
           return;
         }
       
         if (element.tagName === 'FORM') {
           conversionEvent = {
             ...data,
             event: 'Form Complete',
           };
       
           if (conversionEvent.event === 'Form Complete'
             // Check for undefined, since target can contain value 0 as well, which is falsy
             && (data.target === undefined || data.source === undefined)
           ) {
             // If a buffer has already been set and tempConversionEvent exists,
             // merge the two conversionEvent objects to send to alloy
             if (bufferTimeoutId && tempConversionEvent) {
               conversionEvent = { ...tempConversionEvent, ...conversionEvent };
             } else {
               // Temporarily hold the conversionEvent object until the timeout is complete
               tempConversionEvent = { ...conversionEvent };
       
               // If there is partial form conversion data,
               // set the timeout buffer to wait for additional data
               bufferTimeoutId = setTimeout(async () => {
                 analyticsTrackConversion({ ...conversionEvent });
                 tempConversionEvent = undefined;
                 conversionEvent = undefined;
               }, CONVERSION_EVENT_TIMEOUT_MS);
             }
           }
           return;
         }
       
         analyticsTrackConversion({ ...data });
         tempConversionEvent = undefined;
         conversionEvent = undefined;
         
       });
       
       console.log("WDP: About to call loadPage()");
       loadPage().then(() => {
         console.log("WDP: Page loading process completed successfully");
       }).catch((error) => {
         console.error("WDP: Error during page loading:", error);
       });
   /* }
    return {
        wdp: main
    }*/
});
console.log("WDP: Script evaluation completed - waiting for RequireJS to load dependencies");