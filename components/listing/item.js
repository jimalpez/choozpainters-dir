export class ListingItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="listing">
            <div class="listing_main">
                <figure>
                    <img src="/img/contractors/Astra-logo.jpg" alt="" />
                </figure>
                <div class="listing_main_content">
                    <h3 class="heading_listing">Astra Painters</h3>
                    <ul>
                        <li>
                            <i class="bi bi-geo-alt-fill"></i>
                            <span>
                            819 Spring Hill Farm Dr Ballwin, Missouri 63021
                            </span>
                        </li>
                        <li>
                            <i class="icon-link-5"></i>
                            <span>http://www.astrapainters.com/</span>
                        </li>
                    </ul>
                    <div class="listing_main_content_buttons">
                        <a href="#" class="btn_1">
                            <i class="bi bi-telephone-fill"></i>
                            <span>Show Number</span>
                        </a>
                        <a href="#" class="btn_1">
                            <i class="bi bi-envelope-fill"></i>
                            <span>Send Email</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="listing_footer">
                <div class="listing_footer_images">
                    <img
                    src="/img/contractors/Astra-1.png"
                    alt=""
                    data-toggle="modal"
                    data-target="#ImagesModal1" />
                    <img
                    src="/img/contractors/Astra-2.png"
                    alt=""
                    data-toggle="modal"
                    data-target="#ImagesModal2" />
                    <img
                    src="/img/contractors/Astra-4.png"
                    alt=""
                    data-toggle="modal"
                    data-target="#ImagesModal4" />
                    <img
                    src="/img/contractors/Astra-5.png"
                    alt=""
                    data-toggle="modal"
                    data-target="#ImagesModal5" />
                    <button
                    type="button"
                    class="listing_footer_images_button"
                    data-toggle="modal"
                    data-target="#ImagesModal1">
                    +4
                    </button>
                </div>
                <div class="listing_footer_reviews">
                    <h5>Review Sources</h5>
                    <ul>
                    <li>
                        <span class="rating_placeholder">Google</span>
                        <span class="ratings">
                        <span class="ratings_rate">5.0</span>
                        <i class="icon_star voted"></i>
                        <span class="ratings_total">(9)</span>
                        </span>
                    </li>
                    <li>
                        <span class="rating_placeholder">Facebook</span>
                        <span class="ratings">
                        <span class="ratings_rate">5.0</span>
                        <i class="icon_star voted"></i>
                        <span class="ratings_total">(9)</span>
                        </span>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define("listing-item", ListingItem);
