import { getHTML } from '@/assets/js/browser_side-compiler.js';


const componentId = 'd22f7fd55c984b14a6cdd9a910eb2e29';

const data = {
    data() {
        return {

        }
    },

    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },

    components: {

    },

    methods: {
        goTaskPage() {
            location.hash = '#/tasks/';
        },

    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;

globalThis.appInstance_.load_tip.update('Requesting module: ' + import.meta.url);

