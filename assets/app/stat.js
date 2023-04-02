

let allowStat = true;

if (userdata.get('config', 'noStat') === true) (console.log('[Statistics]', "Didn't load stat script because the user disallowed"), allowStat = false);
if (location.hostname === '127.0.0.1') (console.log('[Statistics]', "Didn't load stat script because the site is running on a local server"), allowStat = false);


if (allowStat)
fetch('assets/app/STAT').then(v => v.text()).then(text => {
    const fn = new(Function)('_scope', '_code', text);
    console.log('[Statistics]', 'Stat script exited with result', fn.call(globalThis, globalThis, text));
}).catch(error => {
    console.log('[Statistics]', 'Failed to load stat script:', error);
});



