{
    const c = new Proxy({}, {
        get(target, p, receiver) {
            if (typeof p !== 'string') return Reflect.get(target, p, receiver);
            if (!isNaN(Number(p))) {
                const n = (Number(p));
                return function createElements(tag) {
                    const arr = [];
                    for (let i = 0; i < n; ++i) arr.push(document.createElement(tag));
                    return arr;
                }
            }
            return document.createElement(p);
        },
    });
    const global_error_handler = function (ev) {
        const el = c.div;
        el.id = 'error-mask';
        const [row1, row2, row3] = c[3]`div`;
        row1.innerText = '水哦，出错了';
        row2.innerText = `${ev.message}\n(在 ${ev.filename} 中，#${ev.lineno}:${ev.colno})`;
        row1.style.fontSize = 'x-large';
        row2.style.padding = '10px';
        const reloadBtn = c.a;
        reloadBtn.href = 'javascript:location.reload()';
        reloadBtn.innerText = '重试';
        row3.append(reloadBtn);
        el.append(row1, row2, row3);
        const lm = document.getElementById('loading-masks');
        lm ? (lm.after(el), lm.remove()) : (document.body || document.documentElement).append(el);

        import('./envtest.js').then(async function ({ runtest, TEST_PASSED, links }) {
            const result = await runtest();
            if (result !== TEST_PASSED) {
                row2.append(c.hr, document.createTextNode(`错误: 当前环境不支持 ${result} , 这导致本网站无法运行。\n如果要继续，请更新您的浏览器或系统。`));
                if (typeof result === 'string' && result in links) {
                    row2.append(c.hr, document.createTextNode('查看兼容性数据: '));
                    const a = c.a;
                    a.href = links[result];
                    a.target = '_blank';
                    a.innerText = '查看';
                    row2.append(a);
                }
            }
        });
    }
    window.global_error_handler = global_error_handler;
    window.addEventListener('error', global_error_handler);
}