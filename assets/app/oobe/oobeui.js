
import { ElLoading } from 'element-plus';


const { forceRegisterDialog } = (await import("../../../modules/dialog-polyfill/dialog-polyfill.esm.js")).default;
export async function oobeStart() {
    const oobeElement = document.createElement('dialog');
    if (typeof HTMLDialogElement === 'undefined') registerDialog(oobeElement);
    (document.body || document.documentElement).append(oobeElement);
    const html = (await (await fetch(import.meta.url + '/../oobeui.html')).text()).replace(/src\:/g, import.meta.url + '/../');
    oobeElement.innerHTML = html;
    oobeElement.showModal();

    const cc = oobeElement.querySelector('#oobeui_cancel_confirm');
    if (typeof HTMLDialogElement === 'undefined') registerDialog(cc);
    const cancelConf = () => {
        cc.showModal();
    };

    await new Promise(async function (resolve, reject) {
        cc.querySelector('[data-action=confirm]').onclick = () => { reject(new Error(`User cancelled`)), oobeElement.remove() };

        await new Promise(function (resolve_, reject) {
            const s = oobeElement.querySelector('[data-step="10001"]');
            s.hidden = false;
            const resolve = (r) => { s.hidden = true; resolve_(r) };
            s.querySelector('[data-action=next]').onclick = resolve;
        }); // 10001

        await new Promise(function (resolve_, reject) {
            const s = oobeElement.querySelector('[data-step="10002"]');
            s.hidden = false;
            const resolve = (r) => { s.hidden = true; resolve_(r) };
            s.querySelector('[data-action=cancel]').onclick = cancelConf;
            s.querySelector('[data-action=next]').onclick = resolve;
        }); // 10002

        await new Promise(function (resolve_, reject) {
            const s = oobeElement.querySelector('[data-step="10003"]');
            s.hidden = false;
            const resolve = (r) => { s.hidden = true; resolve_(r) };
            s.querySelector('[data-action=cancel]').onclick = cancelConf;
            s.querySelector('[data-action=next]').onclick = resolve;
        }); // 10003

        if (oobeElement.querySelector('[data-step="10003"] select').value !== 'china_mainland')
        await new Promise(function (resolve_, reject) {
            const s = oobeElement.querySelector('[data-step="10005"]');
            s.hidden = false;
            const resolve = (r) => { s.hidden = true; resolve_(r) };
            s.querySelector('[data-action=cancel]').onclick = cancelConf;
            s.querySelector('[data-action=next]').onclick = resolve;
        }); // 10005

        await new Promise(function (resolve_, reject) {
            const s = oobeElement.querySelector('[data-step="9999"]');
            s.hidden = false;
            const resolve = (r) => { s.hidden = true; resolve_(r) };
            s.querySelector('[data-action=cancel]').onclick = cancelConf;
            s.querySelector('[data-action=next]').onclick = resolve;
        }); // 9999
    
        resolve();
    });
    oobeElement.close();
    oobeElement.remove();
    return true;
}




