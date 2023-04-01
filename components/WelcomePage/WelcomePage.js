import { getHTML } from '@/assets/js/browser_side-compiler.js';
import WidgetContainer from '../WidgetContainer/WidgetContainer.js';
import RollingImageCardView from '../RollingImageCardView/RollingImageCardView.js';
import ExamCountdown from '../ExamCountdown/ExamCountdown.js';


const componentId = '866c66d4b46547bf8507cf5753eb22fe';

const data = {
    data() {
        return {
            calendar: new Date(),
        }
    },

    components: {
        WidgetContainer,
        RollingImageCardView,
        ExamCountdown,

    },

    methods: {
        
    },

    template: await getHTML(import.meta.url, componentId),

};


export default data;

