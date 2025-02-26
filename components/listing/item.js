import ModalSlider from "../modalSlider.js";

export class ListingItem extends HTMLElement {
  constructor() {
    super();
    this.imageIndex = 0;
    this.imagesArray = [];
  }

  connectedCallback() {
    const title = this.getAttribute("data-title");
    const company_logo = this.getAttribute("data-company_logo");
    const address = this.getAttribute("data-address");
    const website = this.getAttribute("data-website");
    const phone = this.getAttribute("data-phone");
    const email = this.getAttribute("data-email");

    try {
      const company_images = this.getAttribute("data-company_images");
      this.imagesArray = company_images ? JSON.parse(company_images) : [];
    } catch (error) {
      console.error("Invalid JSON in data-company_images attribute", error);
      this.imagesArray = [];
    }

    // Add company logo as the first image in the array
    if (company_logo) {
      this.imagesArray.unshift(company_logo);
    }

    const imagesArrayList = this.imagesArray
      .map((image, index) => {
        if (index === 0) return "";
        return `
            <img
                src="${image}"
                alt="${title} project photo ${index + 1}"
                class="gallery-image"
                data-index="${index}"
                data-toggle="modal"
                data-target="#ImagesModal${index + 1}" />
          `;
      })
      .join("");

    this.innerHTML = `
          <div class="listing">
              <div class="listing_main">
                  <figure>
                      <img class="gallery-image" src="${company_logo}" alt="${title} logo" data-index="0" data-toggle="modal" data-target="#ImagesModal1" />
                  </figure>
                  <div class="listing_main_content w-full">
                      <h3 class="heading_listing">${title}</h3>
                      <ul>
                          <li>
                              <i class="bi bi-geo-alt-fill"></i>
                              <span>
                              ${address}
                              </span>
                          </li>
                          <li>
                              <i class="icon-link-5"></i>
                              <span>${website}</span>
                          </li>
                      </ul>
                  </div>
                  <div class="listing_main_content_buttons" style="width: 100% !important;">
                          <a href="#" class="btn_1" id="show-number">
                              <i class="bi bi-telephone-fill"></i>
                              <span>Show Number</span>
                          </a>
                          <a href="#" class="btn_1" id="show-email">
                              <i class="bi bi-envelope-fill"></i>
                              <span>Show Email</span>
                          </a>
                    </div>
              </div>
              <div class="listing_footer">
                  <div class="listing_footer_images">
                      ${imagesArrayList}
                      ${
                        this.imagesArray.length > 5
                          ? `
                          <button
                          type="button"
                          class="listing_footer_images_button"
                          data-toggle="modal"
                          data-target="#ImagesModal1">
                          +${this.imagesArray.length - 5}
                          </button>
                      `
                          : ""
                      }
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

    this.querySelectorAll(".gallery-image").forEach((img) => {
      img.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        new ModalSlider("#imagesModal", this.imagesArray, index).show();
      });
    });

    this.querySelector("#show-number").addEventListener("click", (e) => {
      e.preventDefault();
      this.showNumber(phone);
    });

    this.querySelector("#show-email").addEventListener("click", (e) => {
      e.preventDefault();
      this.showEmail(email);
    });
  }

  showNumber(number) {
    const button = this.querySelector("#show-number");
    const span = button.querySelector("span");
    span.textContent = number;
    setTimeout(() => {
      span.textContent = "Show Number";
    }, 5000);
  }

  showEmail(email) {
    const button = this.querySelector("#show-email");
    const span = button.querySelector("span");
    span.textContent = email;
    setTimeout(() => {
      span.textContent = "Show Email";
    }, 5000);
  }
}

customElements.define("listing-item", ListingItem);
