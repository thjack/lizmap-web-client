import { LizmapMapManager, MainEventDispatcher } from "../modules/LizmapGlobals";

import { library, findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
library.add(faExpandArrowsAlt);

export default class LizmapInitialExtentElement extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
            <style>
            :host{
                top: 100px;
                right: 20px;
                position: absolute;
                z-index: 1;
                background: white;
            }
            button{
                display:block;
                width: 30px;
                height: 30px;
                padding: 0;
            }
            svg{
                height: 26px;
            }
            </style>`;

        const initialExtentButton = document.createElement('button');

        // Set icon
        const iconDef = findIconDefinition({ prefix: 'fas', iconName: 'expand-arrows-alt' });
        const i = icon(iconDef);
        initialExtentButton.appendChild(i.node[0]);

        // Listen click event
        initialExtentButton.addEventListener('click', () => {
            LizmapMapManager.getMap(this.mapId).center = LizmapMapManager.getMap(this.mapId).initialCenter;
            LizmapMapManager.getMap(this.mapId).zoom = LizmapMapManager.getMap(this.mapId).initialZoom;
        });

        shadowRoot.appendChild(initialExtentButton);
    }

    connectedCallback() {
        this._mapId = this.getAttribute('map-id');
    }

    disconnectedCallback() {

    }

    get mapId() {
        return this._mapId;
    }
}