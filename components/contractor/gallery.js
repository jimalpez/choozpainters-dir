import ModalSlider from "./modalSlider.js";

export class ContractorGallery extends HTMLElement {
  constructor() {
    super();
    this.imageIndex = 0;
    this.imagesArray = [];
  }

  connectedCallback() {
    const title = this.getAttribute("data-title");
    const company_logo = this.getAttribute("data-company_logo");

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
      .map(
        (image, index) => {
          if (index === 0) return '';
          return `
            <div class="post-gallery-list-item">
              <img
                src="${image}"
                alt="${title} project photo ${index + 1}"
                data-index="${index}"
                class="gallery-image"
                style="cursor: pointer;"
              />
            </div>
          `;
        },
      )
      .join("");

    this.innerHTML = `
      <div class="row post-gallery">
          <div class="col-md-6">
              <div class="post-gallery-main">
                  <div class="post-gallery-main-item">
                      <img src="${company_logo}" alt="${title} Logo" data-index="0" class="gallery-image" style="cursor: pointer;"/>
                  </div>
              </div>
          </div>
          <div class="col-md-6">
              <div class="post-gallery-list">
                  ${imagesArrayList}
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
  }
}

customElements.define("contractor-gallery", ContractorGallery);
