import { getHTML } from '@/assets/js/browser_side-compiler.js';


const componentId = 'be67c0291bd14383a8fd9bb38c50376a';

const data = {
    data() {
        return {
            data: [],
            error: null,

        }
    },

    props: {
        dataFrom: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            default: '200px',
        },
    },

    components: {

    },

    methods: {

    },

    mounted() {
        queueMicrotask(() => {
            fetch(this.dataFrom).then(v => v.json()).then(v => {
                if (!Array.isArray(v)) throw new TypeError('Invalid Data');
                this.data = v;
            }).catch(error => this.error = String(error));
        });
    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;

