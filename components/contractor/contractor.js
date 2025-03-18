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
        category: pathSegments[0],
        region: pathSegments[1],
        post_code: pathSegments[2],
        city: pathSegments[3],
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
              <div class="modal-body p-0">
                <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>

                <iframe
              src="https://api.leadconnectorhq.com/widget/form/EW6N1a3RC0W2io5fvMUB"
              style="
                width: 100%;
                height: 100%;
                border: none;
                border-radius: 4px;
              "
              id="inline-EW6N1a3RC0W2io5fvMUB"
              data-layout="{id:'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Chooz Painters - Profile Page Customer Submission"
              data-height="1341"
              data-layout-iframe-id="inline-EW6N1a3RC0W2io5fvMUB"
              data-form-id="EW6N1a3RC0W2io5fvMUB"
              title="Chooz Painters - Profile Page Customer Submission">
            </iframe>
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
