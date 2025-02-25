import "./heading.js";
import "./gallery.js";
import "./tabs.js";
import "./map.js";
import "./sidebar.js";
import "./../header.js";
import "./../footer.js";

class Contractor extends HTMLElement {
  constructor() {
    super();
    this.contractorData = null;
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
    const pathSegments = window.location.pathname.split("/").filter(Boolean);

    let queryParams = {};

    if (pathSegments.length === 3 && pathSegments[0] === "contractor") {
      queryParams = { region: pathSegments[1], slug: pathSegments[2] };
    } else if (pathSegments.length === 4) {
      queryParams = {
        region: pathSegments[0],
        city: pathSegments[1],
        category: pathSegments[2],
        slug: pathSegments[3],
      };
    } else {
      console.error("Invalid contractor URL format.");
      return;
    }

    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await fetch(
        `https://nrroyfmyiff6qhks7i2xdmgcxu0erbid.lambda-url.us-east-1.on.aws/?${queryString}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch contractor data");
      }

      const contractors = await response.json();
      this.contractorData = contractors.find((contractor) =>
        Object.keys(queryParams).every(
          (key) =>
            contractor[key]?.toLowerCase() === queryParams[key].toLowerCase(),
        ),
      );

      if (!this.contractorData) {
        console.error("Contractor not found.");
      }
    } catch (error) {
      console.error("Error fetching contractor data:", error);
      this.contractorData = null;
    }
  }

  render() {
    console.log(this.contractorData);

    if (this.contractorData) {
      this.innerHTML = `
        <div class="layer"></div>
      
        <header-component class-logo="logo-contractor"></header-component>

        <main>
            <div class="container">
                <contractor-heading 
                  data-title="${this.contractorData.title}" 
                  data-city="${this.contractorData.city}" 
                  data-region="${this.contractorData.region}" 
                  data-country="${this.contractorData.country}" 
                  data-company_phone="${this.contractorData.company_phone}"
                  data-website="${this.contractorData.website}"
                  data-facebook="${this.contractorData.facebook}"
                  data-google_bp="${this.contractorData.google_bp}"
                  data-category="${this.contractorData.category}"
                ></contractor-heading>

                <div class="row">
                    <div class="col-xl-8 col-lg-8 padding_r_50_desktop">
                        <contractor-gallery
                          data-title="${this.contractorData.title}" 
                          data-company_logo="${
                            this.contractorData.company_logo || ""
                          }"
                          data-company_images='${JSON.stringify(
                            this.contractorData.company_images || [],
                          )}'
                        ></contractor-gallery>
                        <contractor-tabs
                          data-title="${this.contractorData.title}" 
                          data-description="${
                            this.contractorData.description || ""
                          }"
                          data-company_logo="${
                            this.contractorData.company_logo || ""
                          }"
                          data-company_images='${JSON.stringify(
                            this.contractorData.company_images || [],
                          )}'
                        ></contractor-tabs>

                        <contractor-map
                          data-title="${this.contractorData.title}" 
                          data-company_logo="${
                            this.contractorData.company_logo || ""
                          }"
                          data-latitude="${
                            this.contractorData.location_latitude
                          }"
                          data-longitude="${
                            this.contractorData.location_longitude
                          }"
                        ></contractor-map>
                    </div>
                    <aside class="col-xl-4 col-lg-4" id="sidebar">
                        <contractor-sidebar
                          data-address="${this.contractorData.address}"
                          data-company_phone="${
                            this.contractorData.company_phone
                          }"
                          data-website="${this.contractorData.website}"
                          data-services='${JSON.stringify(
                            this.contractorData.services,
                          )}'
                          data-year_of_experience="${
                            this.contractorData.year_of_experience
                          }"
                        ></contractor-sidebar>
                    </aside>
                </div>
            </div>
        </main>

        <footer-component></footer-component>

        <div class="modal fade" id="imagesModal" tabindex="-1" role="dialog" aria-labelledby="imagesModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body"></div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="formProfile" tabindex="-1" role="dialog" aria-labelledby="formProfileLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body p-5">
                <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>

                <form>
                  <h3 class="mb-4">Request a quote from Astra Painters LLC</h3>
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="name" class="form-control" id="name" aria-describedby="emailHelp">
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" class="form-control" id="phone" aria-describedby="emailHelp">
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                  </div>
                  <div class="form-group">
                    <label for="ContractPreference">Contract Preference</label>
                    <select class="form-control" id="ContractPreference">
                      <option></option>
                      <option>Email</option>
                      <option>Phone</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="TellUsAboutYourProject">Tell Us About Your Project</label>
                    <textarea class="form-control" id="TellUsAboutYourProject" rows="4"></textarea>
                    <small class="form-text text-muted">0 of 1000 max characters</small>
                  </div>
                  <p>Chooz Painters is a third party directory that will forward your contact form to the painting company listed above</p>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="IHaveReadTheDisclaimer">
                    <label class="form-check-label" for="IHaveReadTheDisclaimer">I have read the disclaimer*</label>
                  </div>
                  <button type="submit" class="btn_full mt-3">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      `;

      this.initModals(); // Initialize the modal
    } else {
      this.innerHTML = `<p>Contractor not found.</p>`;
    }
  }

  initModals() {
    const modalElements = this.querySelectorAll(".modal");

    modalElements.forEach((modalElement) => {
      const modal = new bootstrap.Modal(modalElement, {});

      // Find all buttons that trigger this modal
      const modalButtons = this.querySelectorAll(
        `[data-toggle="modal"][data-target="#${modalElement.id}"]`,
      );

      modalButtons.forEach((button) => {
        button.addEventListener("click", () => {
          modal.show();
        });
      });

      // Ensure aria-hidden is properly updated
      modalElement.addEventListener("shown.bs.modal", () => {
        modalElement.removeAttribute("aria-hidden");
      });

      modalElement.addEventListener("hidden.bs.modal", () => {
        modalElement.setAttribute("aria-hidden", "true");
      });
    });
  }
}

customElements.define("contractor-component", Contractor);
