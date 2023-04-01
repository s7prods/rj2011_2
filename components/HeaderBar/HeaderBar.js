import { getHTML } from '@/assets/js/browser_side-compiler.js';
import { ArrowLeft, ArrowRight, RefreshRight, Top, Menu } from 'icons-vue';


const componentId = '865c73f3eb1842599741f5498dd5a2ec';

const data = {
    data() {
        return {
            activeIndex: "1",
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
            console.log.apply(console, arguments);
            this.closePopupMenu();
        },
        showPopupMenu() {
            this.popupMenuIsOpen = true;
        },
        closePopupMenu() {
            this.popupMenuIsOpen = false;
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

