export class ListingMap extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `  
        <div id="map_listing" class="normal_list"></div>
    `;
  }
}

customElements.define("listing-map", ListingMap);
