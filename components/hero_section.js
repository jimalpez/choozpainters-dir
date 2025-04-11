class HeroSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  get classes() {
    return this.getAttribute("class") || "";
  }

  render() {
    this.innerHTML = `
    <div class="hero_home ${this.classes}">
        <div class="version_gradient_background_image"></div>
            <div class="content">
                <h3>Looking For A Painter?</h3>
                <p>Find the best painters near you</p>
                <form method="post" action="list.html">
                    <div id="custom-search-input">
                        <div class="input-group input-rounded">
                            <input type="text" class="search-query" placeholder="Location Search" />
                            <label for="search-query-submit" class="btn_search-label">
                                <i class="pe-7s-search"></i>
                            </label>
                            <input type="submit" id="search-query-submit" class="" />
                        </div>
                        <ul>
                            <li>
                                <input type="radio" id="all" name="radio_search" value="all" checked />
                                <label for="all">Search by Company</label>
                            </li>
                        </ul>
                    </div>
                </form>

                <!-- Floated Images -->
                <div class="floating-images">
                    <!-- left Images -->
                    <img
                        src="/img/floating_images/choozpainters-balloon-2.png"
                        alt="Hot Air Balloon"
                        class="float-cloud-bottom-left float-cloud" />

                    <!-- Right Images -->
                    <img
                        src="/img/floating_images/cloud-medium-light-blue-border-1.png"
                        alt="Cloud"
                        class="float-cloud-top-right float-cloud" />
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define("hero-section", HeroSection);
