export class ContractorSidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Get attributes from the parent component
    const address = this.getAttribute("data-address") || "N/A";
    const company_phone = this.getAttribute("data-company_phone") || "N/A";
    const website = this.getAttribute("data-website") || "N/A";
    const year_of_experience = this.getAttribute("data-year_of_experience");

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

    this.innerHTML = `
        <div class="sidebar_content">
            <div class="sidebar_content-item">
                <button class="btn_full" type="button" data-toggle="modal" data-target="#formProfile">Request qoute</button>
                <h3 class="heading_contractor-sm">Company Details</h3>
                <ul>
                    <li>
                        <a href="#" class="link">
                            <i class="bi bi-geo-alt-fill"></i>
                            <span>
                                Address: ${address}
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="tel:${company_phone}" class="link">
                            <i class="bi bi-telephone-fill"></i>
                            <span>${company_phone}</span>
                        </a>
                    </li>
                    <li>
                        <a href="${website}" class="link">
                            <i class="icon-link-5"></i>
                            <span>${website}</span>
                        </a>
                    </li>
                    ${
                      year_of_experience
                        ? `<li>Years in service: ${year_of_experience}+</li>`
                        : ``
                    }
                </ul>
            </div>
            <hr />
            <div class="sidebar_content-item">
                <h3 class="heading_contractor-sm">Read Reviews From the Web</h3>
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
            <hr />
            <div class="sidebar_content-item">
                <h3 class="heading_contractor-sm">Services</h3>
                <ul class="list-disc">
                    ${servicesList}
                </ul>
            </div>
            <div class="sidebar_content-item">
                <h3 class="heading_contractor-sm">DISCLAIMER</h3>
                <p class="text-sm">
                    This site is a free service to assist homeowners in connecting
                    with local service contractors. All contractors are
                    independent and this site does not warrant or guarantee any
                    work performed. It is the responsibility of the homeowner to
                    verify that the hired contractor furnishes the necessary
                    license and insurance required for the work being performed.
                </p>
            </div>
        </div>
      `;
  }
}

customElements.define("contractor-sidebar", ContractorSidebar);
