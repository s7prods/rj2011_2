import { getHTML } from '@/assets/js/browser_side-compiler.js';

import WelcomePage from '../WelcomePage/WelcomePage.js';


const componentId = '6e5aa04db8644cf4965fadbc36d37e2c';

const data = {
    data() {
        return {
            currentPage: '',
        }
    },

    components: {
        WelcomePage,
    },

    methods: {

    },

    mounted() {

    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;

