
import { ElLoading } from 'element-plus';
import { checkKeyIsValid } from '../activation.js';


const { forceRegisterDialog } = (await import("../../../modules/dialog-polyfill/dialog-polyfill.esm.js")).default;
export async function oobeStart() {
    const oobeElement = document.createElement('dialog');
    if (typeof HTMLDialogElement === 'undefined') forceRegisterDialog(oobeElement);
    (document.body || document.documentElement).append(oobeElement);
    const html = (await (await fetch(import.meta.url + '/../oobeui.html')).text()).replace(/src\:/g, import.meta.url + '/../');
    oobeElement.innerHTML = html;
    oobeElement.oncancel = function () { return false };
    oobeElement.showModal();

    const cc = oobeElement.querySelector('#oobeui_cancel_confirm');
    if (typeof HTMLDialogElement === 'undefined') forceRegisterDialog(cc);
    const cancelConf = () => {
        cc.showModal();
    };
    const getAct = function (actName, el) { return el.querySelector(`[data-action="${actName}"]`) };
    const gSbyNid = function (sid) { return oobeElement.querySelector(`[data-step="${sid}"]`) };

    await new Promise(async function (resolve, reject) {
        getAct('confirm', cc).onclick = () => { reject(new Error(`User cancelled`)), oobeElement.remove() };

        await new Promise(function (resolve_, reject) {
            const s = gSbyNid(9991), s1 = gSbyNid(10001), s2 = gSbyNid(9992);
            getAct('actNow', s).onclick = () => {
                s.close(); s2.hidden = false; s1.hidden = true;
            };
            resolve_();
        }); // 9991

        await new Promise(function (resolve_, reject) {
            const s = gSbyNid(9992), s1 = gSbyNid(10001), s2 = gSbyNid(9991);
            getAct('cancel', s).onclick = cancelConf;
            getAct('notNow', s).onclick = () => (s2.showModal(), (s.hidden = !(s1.hidden = false)));
            getAct('next', s).onclick = async () => {
                const k = getAct('code', s).value;
                if (!checkKeyIsValid(k)) {
                    return (getAct('coderr', s).innerHTML = '激活码无效');
                };
                await userdata.put('config', k, 'activation_key');
                resolve();
            };
            resolve_();
        }); // 9992

        await new Promise(function (resolve_, reject) {
            const s = gSbyNid(10001);
            s.hidden = false;
            const resolve = (r) => { s.hidden = true; resolve_(r) };
            getAct('next', s).onclick = resolve;
            getAct('more', s).onclick = () => gSbyNid(9991).showModal();
        }); // 10001

        await new Promise(function (resolve_, reject) {
            const s = gSbyNid(10002);
            s.hidden = false;
            const resolve = (r) => { s.hidden = true; resolve_(r) };
            getAct('cancel', s).onclick = cancelConf;
            getAct('next', s).onclick = resolve;
        }); // 10002

        await new Promise(function (resolve_, reject) {
            const s = gSbyNid(10003);
            s.hidden = false;
            const resolve = (r) => { s.hidden = true; resolve_(r) };
            getAct('cancel', s).onclick = cancelConf;
            getAct('next', s).onclick = resolve;
        }); // 10003

        if (oobeElement.querySelector('[data-step="10003"] select').value !== 'china_mainland')
        await new Promise(function (resolve_, reject) {
            const s = gSbyNid(10005);
            s.hidden = false;
            const resolve = (r) => { s.hidden = true; resolve_(r) };
            getAct('cancel', s).onclick = cancelConf;
            getAct('next', s).onclick = resolve;
        }); // 10005
    
        resolve();
    });
    oobeElement.close();
    oobeElement.remove();
    return true;
}




