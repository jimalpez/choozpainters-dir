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

    const imagesArrayList = this.imagesArray
      .map(
        (image, index) => `
          <div class="post-gallery-list-item">
            <img
              src="${image}"
              alt="Astra ${index + 1}"
              data-index="${index}"
              onclick="this.closest('contractor-gallery').dispatchEvent(new CustomEvent('galleryImageClick', { detail: ${index} }))"
            />
          </div>
        `,
      )
      .join("");

    this.innerHTML = `
      <div class="row post-gallery">
          <div class="col-md-6">
              <div class="post-gallery-main">
                  <div class="post-gallery-main-item">
                      <img src="${company_logo}" alt="${title} Logo" />
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

    this.addEventListener("galleryImageClick", (e) => {
      console.log("Image clicked, index:", e.detail); // Debugging log
      this.imageIndex = e.detail;
      this.showImage();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.imageIndex =
          (this.imageIndex - 1 + this.imagesArray.length) %
          this.imagesArray.length;
        this.showImage();
      } else if (e.key === "ArrowRight") {
        this.imageIndex = (this.imageIndex + 1) % this.imagesArray.length;
        this.showImage();
      }
    });
  }

  showImage() {
    if (!this.imagesArray.length) return;

    // Remove any existing modal before adding a new one
    const existingModal = document.querySelector(".modal");
    if (existingModal) {
      existingModal.remove();
    }

    console.log("Showing image:", this.imagesArray[this.imageIndex]); // Debugging log

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal-content">
        <span class="modal-close">&times;</span>
        <img src="${this.imagesArray[this.imageIndex]}" alt="${title} project photo ${
      this.imageIndex + 1
    }" />
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal on click
    modal.querySelector(".modal-close").addEventListener("click", () => {
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }
}

customElements.define("contractor-gallery", ContractorGallery);
