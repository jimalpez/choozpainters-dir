import ModalSlider from "../modalSlider.js";

export class ContractorTabs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute("data-title");
    const description = this.getAttribute("data-description");
    const company_logo = this.getAttribute("data-company_logo");

    let imagesArray = [];
    try {
      const company_images = this.getAttribute("data-company_images");
      imagesArray = company_images ? JSON.parse(company_images) : [];
    } catch (error) {
      console.error("Invalid JSON in data-company_images attribute", error);
      imagesArray = [];
    }

    // Add company logo as the first image in the array
    if (company_logo) {
      imagesArray.unshift(company_logo);
    }

    const imagesArrayList = imagesArray
      .map(
        (image, index) => `
        <div class="gallery-equal-item">
            <img
                src="${image}"
                alt="${title} project photo ${index + 1}"
                data-index="${index}"
                class="gallery-photo"
                style="cursor: pointer;" />
        </div>
      `,
      )
      .join("");

    this.innerHTML = `
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <h2>
                <button
                    class="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true">
                    <i class="bi bi-bell-fill"></i>
                    <span>Description</span>
                </button>
              </h2>
            </li>
            <li class="nav-item" role="presentation">
              <h2>
                <button
                    class="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false">
                    <i class="bi bi-image"></i>
                    <span>Photos</span>
                </button>
              </h2>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <div class="margin_30">
                    ${description}
                </div>
            </div>
            <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                <div class="margin_30">
                    <div class="gallery-equal">
                       ${imagesArrayList}
                    </div>
                </div>
            </div>
        </div>
      `;

    // Attach click event to open the modal on image click
    this.querySelectorAll(".gallery-photo").forEach((img) => {
      img.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        if (index >= 0) {
          new ModalSlider("#imagesModal", imagesArray, index).show();
        }
      });
    });
  }
}

customElements.define("contractor-tabs", ContractorTabs);
