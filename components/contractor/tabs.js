export class ContractorTabs extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
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
            </li>
            <li class="nav-item" role="presentation">
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
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <div class="margin_30">
                    <p>
                        We are painting professionals specializing in interior
                        painting for rental, residential and commercial properties.
                    </p>
                    <p>
                        We service St. Louis City, St. Louis County and St. Charles
                        County with punctuality and attention to detail.
                    </p>
                    <p>
                        We are fully insured, including liability insurance and
                        workers compensation. In the unlikely event of a mishap on
                        the job, you can rest easy knowing that you have protection.
                    </p>
                    <p>
                        We are fully licensed and registered in the State of
                        Missouri. Our professionals are drug-free and have clean
                        background checks. No exceptions.
                    </p>
                </div>
            </div>
            <div
                class="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabindex="0">
                <div class="margin_30">
                <div class="gallery-equal">
                    <div class="gallery-equal-item">
                    <img
                        src="/img/contractors/Astra-logo.jpg"
                        alt="Astra Logo" />
                    </div>
                    <div class="gallery-equal-item">
                    <img
                        src="/img/contractors/Astra-1.png"
                        alt="Astra Logo" />
                    </div>
                    <div class="gallery-equal-item">
                    <img
                        src="/img/contractors/Astra-2.png"
                        alt="Astra Logo" />
                    </div>
                    <div class="gallery-equal-item">
                    <img
                        src="/img/contractors/Astra-4.png"
                        alt="Astra Logo" />
                    </div>
                    <div class="gallery-equal-item">
                    <img
                        src="/img/contractors/Astra-5.png"
                        alt="Astra Logo" />
                    </div>
                </div>
                </div>
            </div>
        </div>
      `;
    }
  }
  
  customElements.define("contractor-tabs", ContractorTabs);
  