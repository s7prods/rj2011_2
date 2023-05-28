import { getHTML } from '@/assets/js/browser_side-compiler.js';


const componentId = 'cb37c04509f744f3813b9449213c5ec8';
const instances = new Set();
export const wenan = {
    _value: null,
    get value() {
        if (this._value) return this._value;
        return new Promise((resolve, reject) => {
            fetch('data/wenan/nizhiwenan.txt').then(v => v.text())
            .then(v => {
                this._value = v.split('\n');
                resolve(this._value);
            }).catch(reject);
        });
    },
    _previous: -1,
    async getRandomValue() {
        const value = await this.value;
        let result = this._previous;
        let __LOOP_COUNTER__$000001__ = 0;
        while (result === this._previous) {
            if (++__LOOP_COUNTER__$000001__ > 100) break;
            result = value[Math.floor(Math.random() * 1000000) % value.length];
        }
        this._previous = result;
        return result;
    }
};
const loadNizhiWenan = (async function () {
    try { this.wenanText = await wenan.getRandomValue() }
    catch (error) { this.wenanText = '腻智文案加载失败惹(┬┬﹏┬┬) 错误信息:' + error }
});

const data = {
    data() {
        return {
            timesLeft: '',
            wenanText: '正在加载腻智文案...',

        }
    },

    props: {
        date: String, time: String,
    },

    components: {

    },

    methods: {
        loadNizhiWenan,

    },

    computed: {
        examtime() {
            const [month, day] = this.date.split('-');
            const [h, m = 0, s = 0] = this.time.split(':');
            const date = new Date();
            date.setFullYear(date.getFullYear() + (date.getMonth() + 2 > month ? 1 : 0), month - 1, day);
            date.setHours(h, m, s, 0);
            return date;
        },

    },

    created() {
        instances.add(this);
    },

    mounted() {
        queueMicrotask(() => loadNizhiWenan.call(this));
    },

    beforeUnmount() {
        instances.delete(this);
    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;




setInterval(function callback() {
    const now = new Date();
    now.setMilliseconds(0);
    for (const i of instances) {
        const examtime = i.examtime;
        const t = Math.floor((examtime - now) / 1000);
        const days    = Math.floor(t / (60 * 60 * 24));
        const hours   = Math.floor(t / (60 * 60) % 24);
        const minutes = Math.floor(t / 60 % 60);
        const seconds = Math.floor(t % 60);
        i.timesLeft = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;

    }
}, 1000);

globalThis.appInstance_.load_tip.update('Requesting module: ' + import.meta.url);

