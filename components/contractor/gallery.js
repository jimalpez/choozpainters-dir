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
              alt="${title} project photo ${index + 1}"
              data-index="${index}"
              data-images-array='${JSON.stringify(this.imagesArray)}'
              class="gallery-image"
              style="cursor: pointer;"
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

    this.querySelectorAll(".gallery-image").forEach((img) => {
      img.addEventListener("click", (e) => {
        this.imageIndex = parseInt(e.target.dataset.index, 10);
        this.showImageInModal();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prevImage();
      } else if (e.key === "ArrowRight") {
        this.nextImage();
      }
    });
  }

  showImageInModal() {
    if (!this.imagesArray.length) return;

    const modalElement = document.querySelector("#imagesModal");
    if (!modalElement) {
      console.error("Modal element not found!");
      return;
    }

    this.updateModalContent();
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }

  updateModalContent() {
    const modalBody = document.querySelector("#imagesModal .modal-body");
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-slider" style="position: relative;">
        <button class="modal-close" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
        <button class="modal-prev">&larr;</button>
        <img src="${this.imagesArray[this.imageIndex]}" 
             alt="Gallery Image ${this.imageIndex + 1}" 
             class="img-fluid"/>
        <button class="modal-next">&rarr;</button>
      </div>
    `;

    modalBody
      .querySelector(".modal-prev")
      .addEventListener("click", () => this.prevImage());
    modalBody
      .querySelector(".modal-next")
      .addEventListener("click", () => this.nextImage());
    modalBody.querySelector(".modal-close").addEventListener("click", () => {
      const modalInstance = bootstrap.Modal.getInstance(
        document.querySelector("#imagesModal"),
      );
      modalInstance.hide();
    });
  }

  prevImage() {
    this.imageIndex =
      (this.imageIndex - 1 + this.imagesArray.length) % this.imagesArray.length;
    this.updateModalContent();
  }

  nextImage() {
    this.imageIndex = (this.imageIndex + 1) % this.imagesArray.length;
    this.updateModalContent();
  }
}

customElements.define("contractor-gallery", ContractorGallery);
