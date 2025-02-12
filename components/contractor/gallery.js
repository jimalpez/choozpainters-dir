export class ContractorGallery extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="row post-gallery">
            <div class="col-md-6">
                <div class="post-gallery-main">
                <div class="post-gallery-main-item">
                    <img
                    src="./img/contractors/Astra-logo.jpg"
                    alt="Astra Logo" />
                </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="post-gallery-list">
                <div class="post-gallery-list-item">
                    <img src="./img/contractors/Astra-1.png" alt="Astra Logo" />
                </div>
                <div class="post-gallery-list-item">
                    <img src="./img/contractors/Astra-2.png" alt="Astra Logo" />
                </div>
                <div class="post-gallery-list-item">
                    <img src="./img/contractors/Astra-4.png" alt="Astra Logo" />
                </div>
                <div class="post-gallery-list-item">
                    <img src="./img/contractors/Astra-5.png" alt="Astra Logo" />
                </div>
                </div>
            </div>
        </div>
      `;
    }
  }
  
  customElements.define("contractor-gallery", ContractorGallery);
  