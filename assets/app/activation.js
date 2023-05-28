
export async function check() {
    return checkKeyIsValid(await userdata.get('config', 'activation_key'));
}
function getQuadPart(base, lowestPart, ...highParts) {
    let currentBase = base;
    let result = lowestPart;
    for (const i of highParts) {
        result += currentBase * i;
        currentBase *= base;
    }
    return result;
}
function getLowHighPart(base, quadPart, fillZeroCount = 0) {
    let currentBase = 1;
    let result = [];
    for (let i = 0; i < 10000000; ++i) {
        if (currentBase * base > quadPart) break;
        currentBase *= base;
    }
    let left = quadPart;
    while (currentBase >= 1) {
        const y = Math.floor(left / currentBase);
        result.push(y);
        left = left - (y * currentBase);
        currentBase /= base;
    }
    if (result.length < fillZeroCount) {
        const arg = [0, 0];
        for (let i = 0, needFill = fillZeroCount - result.length; i < needFill; ++i){
            arg.push(0);
        }
        result.splice.apply(result, arg);
    }
    return result;
}
function checkKeyIsValid(key) {
    // console.log((btoa(encodeURIComponent(JSON.stringify({version:1,status:"active",serialNo:generateSerialNo()})))));
    try {
        const keyData = atob(key);
        const dec = decodeURIComponent(keyData);
        const json = JSON.parse(dec);
        if (typeof json.version !== 'number') throw 0;
        if (json.version < 1 || json.status !== 'active') throw 0;
        const sn_raw = json.serialNo;
        const sn = decodeURIComponent(atob(sn_raw));
        const b = new Array;
        for (const i of sn) {
            const caesar = String.fromCodePoint(i.codePointAt(0) - 5).toLowerCase();
            const cp = caesar.codePointAt(0);
            if (48 <= cp && cp <= 57) b.push(cp - 48);
            if (97 <= cp && cp <= 102) b.push(cp - 87);
        }
        if (b[0] !== 0xF || b[1] !== 0x1 || b[2] !== 0x0 || b[3] !== 0x3) throw 1;
        const sum = getQuadPart(16, b[6], b[5], b[4]);
        const len = getQuadPart(16, b[8], b[7]), blen = b.length;
        let cum = 0;
        for (let index = 9; index < blen; ++index) {
            cum += b[index];
        }
        if (sum !== cum) throw 2;
        if (blen !== len) throw 3;
        return true;
    } catch { return false }
}
function generateSerialNo(seed = Math.floor(Math.random() * 1000000) % 32768) {
    // checkKeyIsValid(btoa(encodeURIComponent('{version:1,status:"active",serialNo:""}')))
    const b = [0xF, 0x1, 0x0, 0x3, 0x0, 0x0, 0x0, 0x0, 0x0];
    const sum_len = seed % 16 + 16;
    let sum = 0, last = 0;
    for (let i = 0; i < sum_len; ++i) {
        const n = (seed + last) % 16;
        last = n;
        if (sum + n > 256) break;
        b.push(n); sum += n;
    }
    const [b4, b5, b6] = getLowHighPart(16, sum, 3);
    b[4] = b4, b[5] = b5, b[6] = b6;
    const [b7, b8] = getLowHighPart(16, b.length, 2);
    b[7] = b7, b[8] = b8;
    const stra = [];
    for (const i of b) {
        const s = i.toString(16);
        const caesar = String.fromCodePoint(s.toLowerCase().codePointAt(0) + 5);
        stra.push(caesar);
    }
    return btoa(encodeURIComponent(stra.join('')));
}



export async function oobe() {
    const { oobeStart } = await import('./oobe/oobeui.js');
    return await oobeStart.apply(this, arguments);
};


