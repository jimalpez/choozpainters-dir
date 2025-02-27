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
    const company_phone = this.getAttribute("data-company_phone");
    const email = this.getAttribute("data-email");
    const region = this.getAttribute("data-region");
    const city = this.getAttribute("data-city");
    const category = this.getAttribute("data-category");
    const slug = this.getAttribute("data-slug");
    const index = this.getAttribute("data-index");

    let services = [];
    try {
      const servicesAttr = this.getAttribute("data-services");
      services = servicesAttr ? JSON.parse(servicesAttr) : [];
      if (!Array.isArray(services)) throw new Error("Services is not an array");
    } catch (error) {
      console.error("Invalid JSON in data-services attribute", error);
      services = ["N/A"];
    }
    const servicesList = services
      .map((service) => `<li>${service}</li>`)
      .join("");

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
                  <div class="listing_main_content">
                      <h2 class="heading_listing">${title}</h2>
                      <ul>
                        <li>
                            <a href="#" class="">
                                <i class="bi bi-geo-alt-fill"></i>
                                <span>
                                    Address: ${address}
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:${company_phone}" class="btn-blue">
                                <i class="bi bi-telephone-fill"></i>
                                <span>${company_phone}</span>
                            </a>
                        </li>
                        <li>
                            <a href="${website}" class="link" target="_blank">
                                <i class="icon-link-5"></i>
                                <span>${website}</span>
                            </a>
                        </li>
                    </ul>
                  </div>
                  <div class="listing_main_content_buttons">
                    <button class="btn_full request-quote-btn" data-index="${index}" data-title="${title}" data-bs-toggle="modal" data-bs-target="#formProfileListing">
                      Request a Quote
                    </button>
                    
                    <a href="/${region}/${city}/${category}/${slug}/" class="btn_1 transparent" id="show-email">
                      <i class="bi bi-person-fill"></i>
                      <span>View Profile</span>
                    </a>
                  </div>
              </div>
              <div class="listing_footer">
                <div class="listing_footer_reviews">
                  <h2 class="heading_contractor-sm">Read Reviews From the Web</h2>
                  <ul>
                      <li>
                          <a href="#" class="ratings-review--link">Google</a>
                          <div class="ratings-review">
                          <span class="ratings-review--number">5.0</span>
                          <span class="ratings-review--stars">
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                              <i class="bi bi-star-fill"></i>
                          </span>
                          <span class="ratings-review--text">4 reviews</span>
                          </div>
                          <p class="ratings-review--date">(As of 11-20-2024)</p>
                      </li>
                  </ul>
                </div>
                <div class="listing_footer_services">
                  <h2 class="heading_contractor-sm">Services</h2>
                  <ul class="list-disc">
                      ${servicesList}
                  </ul>
                </div>
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
              </div>
          </div>
      `;

    this.initQuoteButtonListener();

    this.querySelectorAll(".gallery-image").forEach((img) => {
      img.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        new ModalSlider("#imagesModal", this.imagesArray, index).show();
      });
    });
  }

  initQuoteButtonListener() {
    const button = this.querySelector(".request-quote-btn");
    if (!button) return;

    button.addEventListener("click", () => {
      const modalTitle = document.querySelector("#modalContractorTitle");
      const contractorTitle = button.getAttribute("data-title");

      if (modalTitle) {
        modalTitle.textContent = `Request a quote from ${contractorTitle}`;
      }
    });
  }
}

customElements.define("listing-item", ListingItem);
