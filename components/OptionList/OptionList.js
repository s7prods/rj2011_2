import { getHTML, compile } from '../../assets/js/browser_side-compiler.js';
import { addCSS } from '../../assets/app/index.esm.js';
import TextEdit from '../TextEdit/TextEdit.js';


const componentId = 'e5b4d51a1fcd4d57a72431b2c02d0134';

const data = {
    data() {
        return {
            listarr: [],
            createValue: {},
            multiline_editors: new Set,
            
        }
    },

    components: {
        TextEdit,
        
    },

    props: {
        modelValue: {
            type: Object,
            required: true,
        },
    },
    emits: ['update:modelValue', 'changed'],

    methods: {
        update_value() {
            const filter = (val) => {
                if (String(val).startsWith('String:')) return String(val).substring(7);
                if (val === 'true' || val === true) return true;
                if (val === 'false' || val === false) return false;
                if (val === '') return '';
                if (!isNaN(val)) return Number(val);
                return val;
            };
            this.listarr = this.listarr.filter(el => !!el[0]);
            const newModelValue = new Object;
            for (const i of this.listarr) try {
                newModelValue[i[0]] = filter(i[1]);
            } catch { }
            this.$emit('update:modelValue', newModelValue);
            this.$emit('changed', newModelValue);
        },

        new_value() {
            if (!this.createValue?.k) return this.createValue = {};

            this.listarr.push([this.createValue.k, this.createValue.v || '']);
            this.createValue = {};
            this.update_value();
        },

        delete_value(item) {
            this.listarr = this.listarr.filter(el => el[0] !== item[0]);
            this.update_value();
        },

        canBeTextEdit(text) {
            return (typeof text === 'string' || (!isNaN(text) && typeof text !== 'boolean'));
        }

    },

    watch: {
        modelValue: {
            handler() {
                this.multiline_editors.clear();
                const r = []; for (const i in this.modelValue) {
                    r.push([i, this.modelValue[i]]);
                    String(this.modelValue[i]).includes('\n') && this.multiline_editors.add(i);
                }; this.listarr = r;
            },
            immediate: true,
        },
    },

    mounted() {
        
    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;



addCSS(compile(`
table>>> {
    box-sizing: border-box;
    width: calc(100% - 2 * var(--margin));
    margin: var(--margin);
    font-family: monospace;

    --margin: 5px;
}
table>>>, table>>> tr, table>>> td {
    border: 1px solid gray;
    border-collapse: collapse;
}
table>>> td {
    padding: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
table>>> td.name {
    font-weight: bold;
    width: 1px;
    background-color: #f4f7fc;
}
table>>> td.operation {
    width: 1px;
}
table>>> .TextEdit {
    display: inline-block;
    width: 100%;
    min-width: 120px;
    white-space: pre;
    --el-component-size: 24px;
}
table>>> .TextEdit > * {
    width: 100%;
    box-sizing: border-box;
}
`, componentId));

globalThis.appInstance_.load_tip.update('Requesting module: ' + import.meta.url);

