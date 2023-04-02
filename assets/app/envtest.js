

export const TEST_PASSED = Symbol('Test Passed');
export async function runtest() {

    // test: try...catch without error paramater
    try {
        new(Function)('try{throw 1}catch{}')();
    } catch (_) { return 'try...catch without error paramater' }

    // test: Top-Level `await`
    try {
        const code = `await Promise.resolve()`;
        const blob = new Blob([code], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        let result = true;
        try {
            await import(url);
        } catch (error) {
            result = false;
        } finally {
            URL.revokeObjectURL(url);
        }
        if (!result) return 'Top-Level `await`';
    } catch (_) { return 'Top-Level `await`' }

    // test: String.prototype.replaceAll
    try {
        if ('232' !== new (Function)('return "131".replaceAll("1","2")')()) throw 1;
    } catch (_) { return 'String.prototype.replaceAll' }
    

    return TEST_PASSED;
}

export const links = {
    'Top-Level `await`': 'https://caniuse.com/mdn-javascript_operators_await_top_level',
};


