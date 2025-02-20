export class ContractorGallery extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const company_logo = this.getAttribute("data-company_logo");

    let imagesArray = [];
    try {
      const company_images = this.getAttribute("data-company_images");
      imagesArray = company_images ? JSON.parse(company_images) : [];
    } catch (error) {
      console.error(
        "Invalid JSON in data-company_images attribute",
        company_images,
        error,
      );
      imagesArray = [];
    }

    const imagesArrayList = imagesArray
      .map(
        (image) => `
        <div class="post-gallery-list-item">
            <img src="${image}" alt="Astra Logo" />
        </div>
      `,
      )
      .join("");

    this.innerHTML = `
        <div class="row post-gallery">
            <div class="col-md-6">
                <div class="post-gallery-main">
                <div class="post-gallery-main-item">
                    <img
                    src="${company_logo}"
                    alt="Astra Logo" />
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
  }
}

customElements.define("contractor-gallery", ContractorGallery);
