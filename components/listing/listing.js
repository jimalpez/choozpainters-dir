import "./item.js";
import "./pagination.js";
import "./heading.js";
import "./map.js";
import "./../header.js";
import "./../footer.js";

export class Listing extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="layer"></div>
        <!-- Mobile menu overlay mask -->

        <div id="preloader">
        <div data-loader="circle-side"></div>
        </div>
        <!-- End Preload -->

        <header-component></header-component>
        
        <main>
            <listing-heading></listing-heading>

            <div class="container margin_t_60">
                <div class="row">
                    <div class="col-lg-7">
                        <listing-item></listing-item>

                        <listing-pagination></listing-pagination>
                    </div>

                    <aside class="col-lg-5" id="sidebar">
                        <listing-map></listing-map>
                    </aside>
                </div>
            </div>
        </main>

        <footer-component></footer-component>

        <div id="toTop"></div>
    `;
  }
}

customElements.define("listing-component", Listing);
