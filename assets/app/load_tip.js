import { addCSS } from "./index.esm.js";


export const crLoadTipElement_tagName = 'cr-load-tip-el';



addCSS(`
${crLoadTipElement_tagName} {
    position: fixed;
    left: 0; bottom: 0;
    z-index: 131071;
    display: block;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 5px;
    max-width: calc(100% - 0em);
    color: #3c4043;
    background: #dee1e6;
    font-size: 10px;
    font-family: 'Consolas', monospace;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
${crLoadTipElement_tagName}[hidden] {
    display: none !important;
}
`);


export class CrLoadTipElement extends HTMLElement {
    constructor() {
        super();


    }


    show(bShow = true) {
        this.hidden = !bShow;
    }
    hide() {
        return this.show(false);
    }

    update(text = '') {
        this.innerText = text;
    }

    done() {
        this.update(); this.hide();
    }


};
export function createCrLoadTip() {
    const el = document.createElement(crLoadTipElement_tagName);
    (document.body || document.documentElement).append(el);
    return el;
};

customElements.define(crLoadTipElement_tagName, CrLoadTipElement);

