import { getHTML, getVdeep } from '../../assets/js/browser_side-compiler.js';
import { addCSS } from '../../assets/app/index.esm.js';
import { Close } from 'icons-vue';


const componentId = 'cb60e23ec9f14d249f94f264d8deb1a9';

const data = {
    data() {
        return {
            disableClose: false,
            
        }
    },

    components: {
        Close,

    },

    emits: ['close'],

    props: {
        closable: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        closeWidget() {
            this.$emit('close');
            this.disableClose = true;
        },

    },

    mounted() {
        
    },

    template: await getHTML(import.meta.url, componentId),

};

addCSS(`
>>> {
    margin: 5px;
    border: var(--border-style);
    box-shadow: 0 0 5px 0 #ccc;
    border-radius: 5px;
    --border-style: 1px solid #ddd;
}
>>> > * {
    padding: 10px;
}
>>> > .w-header {
    border-bottom: var(--border-style);
    font-size: small;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
>>> > .w-header:empty {
    border-bottom: none;
}
`.replaceAll('>>>', `[${getVdeep(componentId)}]`));


export default data;

