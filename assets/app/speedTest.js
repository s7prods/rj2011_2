


export async function test(data) {
    const reqs = [];
    for (const i of data) {
        reqs.push(new Promise((resolve, reject) => {
            const url = (i.id === 0) ? (new URL(i.url, location.href)) : new URL(i.url);
            const redirurl = new URL(i.redirect_url || url);
            if (i.id !== 0 && url.origin === window.location.origin) reject('is-current');
            redirurl.searchParams.set('skip_speed_test', window.location.hostname);
            const resp = fetch(url, { cache: 'no-store' });
            resp.then(resp => {
                if (!resp.ok) throw resp.status;
                return resp.blob();
            }).then(resp => resolve({
                url: url,
                requestId: i.id,
                response: resp,
                redirect_url: redirurl,
            })).catch(error => reject({
                url: url,
                requestId: i.id,
                response: resp,
                error: error
            }));
        }));
    }
    const prom = Promise.any(reqs);
    try {
        const result = await prom;
        return {
            success: true,
            tested: true,
            best: result,
        };
    } catch (error) {
        return {
            success: false,
            error: error,
        };
    }
}

export async function testAndRun(data, { dtGet = localStorage.getItem, dtSet = localStorage.setItem } = {}) {
    const curl = new URL(location.href);
    if (curl.searchParams.has('skip_speed_test')) return {
        success: true, tested: false, runned: false, redirected: false, skiped: true, skipReason: 1
    };
    if (await dtGet('speedtest_Current_Is_Best') === 'true') return {
        success: true, tested: false, runned: false, redirected: false, skiped: true, skipReason: 2
    };
    const bestUrl = await dtGet('speedtest_BestUrl');
    if (bestUrl) {
        window.location = bestUrl; return {
            success: true, tested: false, runned: false, redirected: false, skiped: true, skipReason: 2
        };
    }

    const testResult = await test(data);
    if (!testResult.success) throw { success: false, errorFrom: 'test', result: testResult, error: testResult.error };
    if (!testResult.tested) return { success: false, reason: 'Not tested', error: 'Not tested' };
    if (!testResult.best) return { success: false, error: 'Best result not found' };
    // console.log(testResult);

    if (testResult.best.requestId !== 0) {
        // current is not best
        await dtSet('speedtest_Current_Is_Best_Count', 0);
        const p1 = await dtGet('speedtest_prevbest1'), p2 = await dtGet('speedtest_prevbest2');
        const u = testResult.best.redirect_url.href;
        await Promise.all([dtSet('speedtest_prevbest1', u), dtSet('speedtest_prevbest2', p1)]);
        if (u === p1 && p1 === p2) { // u === p1 === p2
            await dtSet('speedtest_BestUrl', u);
        }
        window.location = testResult.best.redirect_url;
        return { success: true, tested: true, runned: true, redirected: true, testResult, };
    }

    let cibCount = +(await dtGet('speedtest_Current_Is_Best_Count') || 0);
    isNaN(cibCount) ? cibCount = 1 : ++cibCount;
    await dtSet('speedtest_Current_Is_Best_Count', cibCount);
    if (cibCount > 3) await dtSet('speedtest_Current_Is_Best', 'true');

    return {
        success: true, tested: true, runned: false, redirected: false, testResult,
    };
}



