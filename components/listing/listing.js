import "./item.js";
import "./pagination.js";
import "./heading.js";
import "./map.js";
import "./../header.js";
import "./../footer.js";

export class Listing extends HTMLElement {
  constructor() {
    super();
    this.contractorData = [];
  }

  async connectedCallback() {
    this.renderPreloader(); // Show preloader initially
    await this.fetchContractorData();
    this.render();
  }

  renderPreloader() {
    this.innerHTML = `
      <div id="preloader">
        <div data-loader="circle-side"></div>
      </div>
    `;
  }

  async fetchContractorData() {
    try {
      const response = await fetch(
        `https://nrroyfmyiff6qhks7i2xdmgcxu0erbid.lambda-url.us-east-1.on.aws/`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch contractor data");
      }

      this.contractorData = await response.json(); // Store all contractors
    } catch (error) {
      console.error("Error fetching contractor data:", error);
      this.contractorData = [];
    }
  }

  render() {
    if (!this.contractorData.length) {
      this.innerHTML = `<p>No contractors found.</p>`;
      return;
    }

    this.innerHTML = `
      <div class="layer"></div>

      <header-component></header-component>

      <main>
        <listing-heading data-length="${
          this.contractorData.length
        }"></listing-heading>

        <div class="container mt-2">
          <div class="row">
            <div class="col-12">
              ${this.contractorData
                .map(
                  (contractor, index) => `
                    <listing-item 
                        data-title="${contractor.title}"
                        data-company_logo="${contractor.company_logo}"
                        data-company_images='${JSON.stringify(
                          contractor.company_images || [],
                        )}'
                        data-address="${contractor.address}"
                        data-website="${contractor.website}"
                        data-company_phone="${contractor.company_phone}"
                        data-email="${contractor.company_email}"
                        data-region="${contractor.region}"
                        data-city="${contractor.city}"
                        data-category="${contractor.category}"
                        data-slug="${contractor.slug}"
                        data-services='${JSON.stringify(contractor.services)}'
                        data-index="${index}"
                    ></listing-item>
                `,
                )
                .join("")}
              <listing-pagination></listing-pagination>
            </div>
          </div>
        </div>
      </main>

      <footer-component></footer-component>

      <div id="toTop"></div>

      <!-- Dynamic Modal -->
      <div class="modal fade" id="formProfileListing" tabindex="-1" role="dialog" aria-labelledby="formProfileListingLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body p-5">
              <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>

              <form id="quoteForm">
                <h3 class="mb-4" id="modalContractorTitle">Request a quote</h3>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="name" class="form-control" id="name" required>
                </div>
                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input type="tel" class="form-control" id="phone" required>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" required>
                </div>
                <div class="form-group">
                  <label for="ContractPreference">Contact Preference</label>
                  <select class="form-control" id="ContractPreference">
                    <option>Email</option>
                    <option>Phone</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="TellUsAboutYourProject">Tell Us About Your Project</label>
                  <textarea class="form-control" id="TellUsAboutYourProject" rows="4"></textarea>
                  <small class="form-text text-muted">0 of 1000 max characters</small>
                </div>
                <p>Chooz Painters is a third-party directory that will forward your contact form to the painting company listed above.</p>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="IHaveReadTheDisclaimer" required>
                  <label class="form-check-label" for="IHaveReadTheDisclaimer">I have read the disclaimer*</label>
                </div>
                <button type="submit" class="btn_full mt-3">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initModalListeners();
  }

  initModalListeners() {
    const buttons = this.querySelectorAll(".request-quote-btn");
    const modalTitle = this.querySelector("#modalContractorTitle");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const contractorIndex = button.getAttribute("data-index");
        const contractor = this.contractorData[contractorIndex];

        if (contractor) {
          modalTitle.textContent = `Request a quote from ${contractor.title}`;
        }
      });
    });
  }
}

customElements.define("listing-component", Listing);
