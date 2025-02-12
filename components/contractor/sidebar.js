export class ContractorSidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="sidebar_content">
            <button class="btn_full">Request qoute</button>
            <div class="sidebar_content-item">
                <h4 class="heading_contractor-sm">Company Details</h4>
                <ul>
                <li>
                    <i class="bi bi-geo-alt-fill"></i>
                    <span>
                    Address: 819 Spring Hill Farm Dr Ballwin, Missouri 63021
                    </span>
                </li>
                <li>
                    <i class="bi bi-telephone-fill"></i>
                    <span>(314) 448-9860</span>
                </li>
                <li>
                    <i class="icon-link-5"></i>
                    <span>http://www.astrapainters.com/</span>
                </li>
                </ul>
            </div>
            <hr />
            <div class="sidebar_content-item">
                <h4 class="heading_contractor-sm">Read Reviews From the Web</h4>
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
                <h4 class="heading_contractor-sm">Services</h4>
                <ul class="list-disc">
                <li><a href="#">Apartment Painting</a></li>
                <li><a href="#">Commercial Painting</a></li>
                <li><a href="#">Residential Painting</a></li>
                </ul>
            </div>
            <div class="sidebar_content-item">
                <h4 class="heading_contractor-sm">DISCLAIMER</h4>
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
