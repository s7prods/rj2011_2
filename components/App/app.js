import { getHTML } from '@/assets/js/browser_side-compiler.js';
import { computed, defineAsyncComponent } from 'vue';
import { Close, } from 'icons-vue';
import MobileNavTool from './MobileNavTool.js';
import HeaderBar from '../HeaderBar/HeaderBar.js';
import TaskSystem from '../TaskSystem/TaskSystem.js';
const MainView = defineAsyncComponent(() => import('./main-view.js'));
const AppSettings = defineAsyncComponent(() => import('../AppSettings/AppSettings.js'));


const componentId = 'c7b799587d4143819836c168e46f3492';
export { componentId };
    
const showMirrorTip = (await userdata.get('config', 'hideMirrorTip') === true) ? false : true;
const showCookieTip = (await userdata.get('config', 'hideCookieTip') === true) ? false : true;



const data = {
    data() {
        return {
            current_page: 'unknown',
            apptitle: '',
            canGo: {},
            showMirrorTip,
            showCookieTip,

        };
    },

    components: {
        Close,
        MobileNavTool,
        HeaderBar,
        TaskSystem,
        MainView,
        AppSettings,

    },

    computed: {
        
    },

    provide() {
        return {
            apptitle: computed(() => this.apptitle),
            
        }
    },

    methods: {
        skipToContent(ev) {
            ev.target.blur();
            const el = this.htmlEl.querySelector(`main [tabindex="0"], main input, main button, main a[href]`);
            el && el.focus();
        },
        closeMirrorTip() {
            this.showMirrorTip = false;
            userdata.put('config', true, 'hideMirrorTip');
        },
        closeCookieTip() {
            this.showCookieTip = false;
            userdata.put('config', true, 'hideCookieTip');
        },

    },

    created() {
        globalThis.appInstance_.instance = this;
    },

    mounted() {

    },

    watch: {
        current_page() {
            this.apptitle = globalThis.tr ?
                globalThis.tr('doctitle$=' + this.$data.current_page, '')
                + globalThis.tr('document.title') :
                globalThis.document.title;
        },
        apptitle() {
            globalThis.document.title = this.apptitle;
        },

    },

    template: await getHTML('components/App/app.js', componentId),

};


export default data;

globalThis.appInstance_.load_tip.update('Requesting module: ' + import.meta.url);

