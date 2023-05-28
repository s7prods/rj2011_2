

document.querySelector('#SEO').remove();


globalThis.appInstance_ = {};

export function delay(timeout = 0) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export function addCSS(css, el = null, adopt = false) {
    if ((el === null || adopt) && ('adoptedStyleSheets' in document)) {
        const style = new CSSStyleSheet;
        style.replace(css);
        (el || document).adoptedStyleSheets.push(style);
        return style;
    } else {
        let EL = document.createElement('style');
        EL.innerHTML = css;
        (el || document.head || document.documentElement).append(EL);
        return EL;
    }
}


setTimeout(function () {
    if (!location.origin.includes('127.0.0.1')) return;
    const el = document.createElement('div');
    el.id = 'tip-in_developing';
    el.innerHTML = '开发中内容，请以实际上线为准';
    addCSS(`#tip-in_developing {` +
        `position: fixed;` +
        `left: 10px;` +
        `bottom: 10px;` +
        `border: 1px solid;` +
        `padding: 5px;` +
        `background: white;` +
        `font-size: small;` +
        `color: grey;` +
        `pointer-events: none;` +
        `z-index: 1001;` +
        `}`, el);
    (document.body || document.documentElement).append(el);
});


import { createCrLoadTip } from './load_tip.js';
const load_tip = createCrLoadTip();
globalThis.appInstance_.load_tip = load_tip;
load_tip.update('Loading...');


load_tip.update('Requesting module: vue');
// import { createApp } from 'vue';
const { createApp } = await import('vue');



load_tip.update('Loading userdata');

let db_name = null;
try {
    // updateLoadStat('Loading userdata');
    db_name = (await import('./userdata.js')).db_name;
}
catch (error) {
    throw error;
}


load_tip.update('Registering Service Worker');
navigator.serviceWorker.register('./sw.js');



// break long tasks
await delay();

// updateLoadStat('Loading Vue Application');
load_tip.update('Fetching Main Application');
const Vue_App = (await import('@/components/App/app.js')).default;


load_tip.update('Waiting: interrupt');
// break long tasks
await delay(100);


// updateLoadStat('Creating Vue application');
load_tip.update('Creating Application Object');
const app = createApp(Vue_App);
// break long tasks
await delay(10);
// updateLoadStat('Loading Element-Plus');
load_tip.update('Requesting module: element-plus');
{
    const element = await import('element-plus');
    const { zhCn } = await import('element-plus/locale/zh-cn.js');

    app.use(element.default, {
        locale: zhCn,
    })
}
load_tip.update('Waiting: interrupt');
// break long tasks
await delay();
// updateLoadStat('Creating app instance');
load_tip.update('Configuration...');
globalThis.appInstance_.app = app;
app.config.unwrapInjectedRef = true;
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-');
app.config.compilerOptions.comments = true;

// app.mount('#app');

// updateLoadStat('Finding #app');
load_tip.update('Finding #app');
const myApp = document.getElementById('app');
console.assert(myApp); if (!myApp) throw new Error('FATAL: #app not found');

// break long tasks
await delay(10);

// break long tasks
await delay(10);
load_tip.update('Requesting module: speedTest.js');
const { testAndRun } = await import('./speedTest.js');
try {
    load_tip.update('Running auto speed-test');
    const r = await testAndRun(await (await fetch('assets/app/speedtest-data')).json(), {
        dtGet(key) { return userdata.get('config', key) },
        dtSet(key, value) { return userdata.put('config', value, key) },
        
    });
    console.info('Speed-test runned successfully with result', r);
} catch (error) { console.warn('Failed to run speed-test:', error) };

// break long tasks
await delay(10);
load_tip.update('Requesting module: activation.js');
const { check: checkActivationStatus, oobe: runOOBE } = await import('./activation.js');
{
    load_tip.update('Checking activation status');
    const result = await checkActivationStatus();
    await delay(100);
    if (!result) {
        load_tip.update('Waiting: user (OOBE)');
        try {
            if (!await runOOBE()) {
                throw new Error('OOBE Error')
            }
        } catch (error) {
            throw error
        }
    }
}
// break long tasks
await delay(10);

// build app
{
    let perf = 0;
    for (; perf < 101;) {
        load_tip.update(`Building application (${perf}%)`);
        const rnd = Math.random() * 1000000;
        await delay(Math.floor(rnd % 100) + 150);
        perf += Math.floor(rnd % 25);
    }
}

// updateLoadStat('Mounting application to document');
load_tip.update('Mounting application to document');
app.mount(myApp);
// break long tasks
await delay(10);

// updateLoadStat('Waiting');
load_tip.update('Waiting: interrupt');
await delay();



load_tip.update('Requesting module: init.js');
await import('./init.js');
load_tip.update('Requesting module: stat.js');
await import('./stat.js');
document.querySelector('.loading-content').remove();
window.removeEventListener('error', global_error_handler);
load_tip.done();


import('./hashchange.js').then(function (data) {
    function hashchange_handler(ev) {
        canGoDetector();

        let hash = location.hash;

        for (const i in data.default) {
            if (hash.startsWith(i)) return data.default[i].apply(globalThis.appInstance_.instance, [hash, app, ev]);
        }

        // check if it's the default app
        if (hash === '#/') {
            globalThis.appInstance_.instance.$data.current_page = 'main';
            return
        }
        if (hash === '' || hash === '#') {
            globalThis.appInstance_.instance.$data.current_page = 'main';
            history.replaceState('', document.title, '#/');
            return;
        }

        // run the default handler
        globalThis.appInstance_.instance.$data.current_page = '404';

    }
    globalThis.addEventListener('hashchange', hashchange_handler);
    setTimeout(hashchange_handler);
}).catch(function (error) { console.error('[hashchange_handler]', error) });




function canGoDetector() {
    globalThis.appInstance_.instance.canGo = {
        back: (globalThis.navigation || {}).canGoBack !== false,
        forward: (globalThis.navigation || {}).canGoForward !== false,
    } // let old devices can use go and back
}
globalThis.setInterval(canGoDetector, 5000);

    

