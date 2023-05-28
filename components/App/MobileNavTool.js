import { getHTML } from '@/assets/js/browser_side-compiler.js';
import { ArrowLeft, ArrowRight, RefreshRight } from 'icons-vue';


const componentId = '9a62f0c62e9c4a338c0d50a852ee618a';

const data = {
    data() {
        return {

        }
    },
    
    props: { canGoBack: Boolean, canGoForward: Boolean },

    components: {
        ArrowLeft, ArrowRight, RefreshRight,
    },

    methods: {
        a() { history.back() },
        b() { location.reload() },
        c() { history.forward() },

    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;

globalThis.appInstance_.load_tip.update('Requesting module: ' + import.meta.url);

