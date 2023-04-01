

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


let db_name = null;
try {
    // updateLoadStat('Loading userdata');
    db_name = (await import('./userdata.js')).db_name;
}
catch (error) {
    throw error;
}


import { createApp } from 'vue';

// break long tasks
await delay();

// updateLoadStat('Loading Vue Application');
const Vue_App = (await import('@/components/App/app.js')).default;

// updateLoadStat('Creating Vue application');
const app = createApp(Vue_App);
// break long tasks
await delay(10);
// updateLoadStat('Loading Element-Plus');
{
    const element = await import('element-plus');
    for (const i in element) {
        if (i.startsWith('El')) app.component(i, element[i]);
    }
}
// break long tasks
await delay();
// updateLoadStat('Creating app instance');
globalThis.appInstance_.app = app;
app.config.unwrapInjectedRef = true;
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-');
app.config.compilerOptions.comments = true;

// app.mount('#app');

// updateLoadStat('Finding #app');
const myApp = document.getElementById('app');
console.assert(myApp); if (!myApp) throw new Error('FATAL: #app not found');

// break long tasks
await delay(10);

// updateLoadStat('Mounting application to document');
app.mount(myApp);

// updateLoadStat('Waiting');
await delay();


document.querySelector('.loading-content').remove();


