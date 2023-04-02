import { getHTML } from '@/assets/js/browser_side-compiler.js';
import WidgetContainer from '../WidgetContainer/WidgetContainer.js';
import RollingImageCardView from '../RollingImageCardView/RollingImageCardView.js';
import ExamCountdown from '../ExamCountdown/ExamCountdown.js';


const componentId = '866c66d4b46547bf8507cf5753eb22fe';
export const defaultWidgetOptions = {
    calendar: true, bigs: true, recents: true, hots: true,
    
};

const data = {
    data() {
        return {
            widgets: {},
            calendar: new Date(),
        }
    },

    components: {
        WidgetContainer,
        RollingImageCardView,
        ExamCountdown,

    },

    methods: {
        closeWidget(id) {
            this.widgets[id] = false;
            userdata.put('config', JSON.parse(JSON.stringify(this.widgets)), 'widgets');
        },
        
    },

    async created() {
        const widgetOptions = (await userdata.get('config', 'widgets')) || defaultWidgetOptions;
        this.widgets = widgetOptions;
    },

    mounted() {
        globalThis.appInstance_.welcomePage = this;

    },

    beforeUnmount() {
        delete globalThis.appInstance_.welcomePage;
        
    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;

