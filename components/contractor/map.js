export class ContractorMap extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="margin_60">
            <h4 class="heading_contractor-sm">Map</h4>
            <div id="map_listing" class="contactor_page_map"></div>
        </div>
      `;
    }
  }
  
  customElements.define("contractor-map", ContractorMap);
  