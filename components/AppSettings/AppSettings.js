import { getHTML } from '@/assets/js/browser_side-compiler.js';
import OptionList from '../OptionList/OptionList.js';
import { prettyPrintFileSize as ppfs } from '@/modules/util/fileinfo.js';
import { defaultWidgetOptions } from '../WelcomePage/WelcomePage.js';


const componentId = '8a191a15a6b24141a4deb8cfa315fe18';


const widgetOptions = (await userdata.get('config', 'widgets')) || defaultWidgetOptions;
const wIds = {
    calendar: '2011 日历',
    bigs: '2011 大事记',
    recents: '最近更新',
    hots: '热门',
};
const allowStat = (await userdata.get('config', 'noStat')) === true ? false : true;



const data = {
    data() {
        return {
            settings_data: {
                all: {},
            },
            estimate: null,
            widgets: widgetOptions,
            showAdvanced: false,
            allowStat,

        }
    },

    components: {
        OptionList,
    },

    methods: {
        async updateSettings() {
            const keys = await userdata.getAllKeys('config');
            for (const key of keys) {
                if (!(key in this.settings_data.all)) await userdata.delete('config', key);
            }
            for (const i in this.settings_data.all) try {
                await userdata.put('config', this.settings_data.all[i], JSON.parse(JSON.stringify(i)));
            } catch (error) {
                console.warn('Failed to save settings:', error);
            }
        },
        prettyPrintFileSize() {
            return ppfs.apply(this, arguments);
        },
        wId2Name(id) {
            return wIds[id] || id;
        },
        updateWidgetOptions() {
            this.$nextTick(async () => {
                await userdata.put('config', JSON.parse(JSON.stringify(this.widgets)), 'widgets');
                if (globalThis.appInstance_.welcomePage)
                    globalThis.appInstance_.welcomePage.widgets = this.widgets;
            })
        },
        enableAdvanced() {
            this.showAdvanced = true;
        },
        updateStat() {
            this.$nextTick(() => userdata.put('config', !this.allowStat, 'noStat'));
        },

    },

    computed: {
        appVersion() {
            return globalThis.appInstance_.version;
        },
        estimateUnavailable() {
            return typeof (globalThis.navigator?.storage?.estimate) !== 'function';
        },
        
    },

    created() {
        (async () => {
            if (!this.estimateUnavailable) {
                this.estimate = await globalThis.navigator.storage.estimate();
            }
        })();
    },

    mounted() {
        this.$nextTick(async () => {
            const dd = {};
            const keys = await userdata.getAllKeys('config');
            for (const key of keys) {
                const data = await userdata.get('config', key);
                dd[key] = data;
            }
            this.settings_data.all = dd;
        });
    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;

globalThis.appInstance_.load_tip.update('Requesting module: ' + import.meta.url);

