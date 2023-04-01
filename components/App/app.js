import { getHTML } from '@/assets/js/browser_side-compiler.js';
import { computed } from 'vue';
import MobileNavTool from './MobileNavTool.js';
import HeaderBar from '../HeaderBar/HeaderBar.js';


const componentId = 'c7b799587d4143819836c168e46f3492';
export { componentId };



const data = {
    data() {
        return {
            current_page: 'unknown',
            apptitle: '',
            canGo: {},

        };
    },

    components: {
        MobileNavTool,
        HeaderBar,

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
            this.htmlEl.querySelector(`main [tabindex="0"], main input, main button, main a[href]`)?.focus();
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

    // template: await getHTML(import.meta.url, componentId), // 这里importShim polyfill了一个很奇怪的表达式：
    // template: await getHTML(importShim._r['http://192.168.0.103:4307/web-file-explorer/web/components/App/app.js'].m
    // ;import{u$_}from'blob:http://192.168.0.103:4307/6ce422f5-12fc-4754-9c2a-936395f494f6';try{u$_({componentId:componentId})}catch(_){};
    // .url, componentId),
    // 估计是它内部bug，于是现在只能这么写了。。。
    template: await getHTML('components/App/app.js', componentId),

};


export default data;

