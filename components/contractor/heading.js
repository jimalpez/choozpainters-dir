export class ContractorHeading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="padding_t_30 margin_b_30">
            <h1 class="heading_contractor">Astra Painters LLC</h1>
            <p class="contactor_address">
                <i class="bi bi-geo-alt-fill"></i>
                <span>Ballwin, Missouri, United States</span>
            </p>
            <div class="social_group social_group--separate">
                <div class="social_icons-inline">
                    <button class="social_icons-btn social_icons-btn--primary">
                        <i class="bi bi-telephone-fill"></i>
                        <span>(314) 448-9860</span>
                    </button>
                    <button class="social_icons-btn social_icons-btn--primary">
                        <i class="icon-link-5"></i>
                    </button>
                    <button class="social_icons-btn social_icons-btn--primary">
                        <i class="icon-facebook"></i>
                    </button>
                    <button class="social_icons-btn social_icons-btn--primary">
                        <i class="bi bi-google"></i>
                    </button>
                </div>
                <div class="social_icons-inline">
                    <button class="social_icons-btn social_icons-btn--transparent">
                        <i class="bi bi-heart"></i>
                        <span>Favorite</span>
                    </button>
                    <button class="social_icons-btn social_icons-btn--transparent">
                        <i class="bi bi-share-fill"></i>
                        <span>Share</span>
                    </button>
                </div>
            </div>
        </div>
      `;
  }
}

customElements.define("contractor-heading", ContractorHeading);
