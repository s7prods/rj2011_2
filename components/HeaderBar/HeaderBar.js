import { getHTML } from '@/assets/js/browser_side-compiler.js';
import { ArrowLeft, ArrowRight, RefreshRight, Top, Menu } from 'icons-vue';


const componentId = '865c73f3eb1842599741f5498dd5a2ec';

const data = {
    data() {
        return {
            activeIndex: "/",
            popupMenuIsOpen: false,
            
        }
    },

    components: {
        Menu,
        
    },

    props: {  },

    emits: [],

    inject: ['apptitle'],

    methods: {
        handleSelect(name) {
            this.activeIndex = name;
            // console.log.apply(console, arguments);
            this.closePopupMenu();
            location.hash = '#' + name;
        },
        showPopupMenu() {
            this.popupMenuIsOpen = true;
        },
        closePopupMenu() {
            this.popupMenuIsOpen = false;
        },
        goLogin() {
            location.hash = '#/login/';
        },

    },

    computed: {
        
    },

    created() {

    },

    mounted() {
        globalThis.appInstance_.HeaderBar = this;
        
    },
    beforeUnmount() {
        delete globalThis.appInstance_.HeaderBar;

    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;

globalThis.appInstance_.load_tip.update('Requesting module: ' + import.meta.url);

