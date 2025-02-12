import "./heading.js";
import "./gallery.js";
import "./tabs.js";
import "./map.js";
import "./sidebar.js";

class Contractor extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <main>
            <div class="container">
                <contractor-heading></contractor-heading>

                <div class="row">
                    <div class="col-xl-8 col-lg-8 padding_r_50_desktop">
                        <contractor-gallery></contractor-gallery>
                        
                        <contractor-tabs></contractor-tabs>

                        <contractor-map></contractor-map>
                    </div>

                    <aside class="col-xl-4 col-lg-4" id="sidebar">
                        <contractor-sidebar></contractor-sidebar>
                    </aside>
                </div>
            </div>
        </main>
      `;
  }
}

customElements.define("contractor-component", Contractor);
