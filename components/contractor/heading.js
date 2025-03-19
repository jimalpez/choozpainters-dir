export class ContractorHeading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Get attributes from the parent component
    const title = this.getAttribute("data-title") || "TItle";
    const city = this.getAttribute("data-city") || "City";
    const region = this.getAttribute("data-region") || "Region";
    const country = this.getAttribute("data-country") || "Country";
    const company_phone = this.getAttribute("data-company_phone") || "N/A";
    const website = this.getAttribute("data-website") || "N/A";
    const facebook = this.getAttribute("data-facebook") || "N/A";
    const google_bp = this.getAttribute("data-google_bp") || "N/A";
    const category = this.getAttribute("data-category") || "Category";
    const post_code = this.getAttribute("data-post_code") || "N/A";

    this.innerHTML = `
        <div id="breadcrumb">
            <div class="container">
                <ul>
                <li><a href="/">Home</a></li>
                <li><a href="#">${category.replace(/-/g, ' ')}</a></li>
                    <li><a href="#">${region}</a></li>
                    <li><a href="#">${post_code}</a></li>
                    <li><a href="#">${city}</a></li>
                    <li>${title}</li>
                </ul>
            </div>
        </div>
          <div class="margin_b_30">
              <h1 class="heading_contractor">${title}</h1>
              <p class="contactor_address">
                  <i class="bi bi-geo-alt-fill"></i>
                  <span>${city}, ${region}, ${country}</span>
              </p>
              <div class="social_group social_group--separate">
                  <div class="social_icons-inline">
                      <a href="tel:${company_phone}" class="social_icons-btn social_icons-btn--primary">
                          <i class="bi bi-telephone-fill"></i>
                          <span>${company_phone}</span>
                      </a>
                      <a href="${website}" target="_blank" class="social_icons-btn social_icons-btn--primary">
                          <i class="icon-link-5"></i>
                      </a>
                      <a href="${facebook}" target="_blank" class="social_icons-btn social_icons-btn--primary">
                          <i class="icon-facebook"></i>
                      </a>
                      <a href="${google_bp}" target="_blank" class="social_icons-btn social_icons-btn--primary">
                          <i class="bi bi-google"></i>
                      </a>
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
