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

    if (pathSegments.length === 5) {
      const [category, state, post_code, city, slug] = pathSegments;

      // Construct the correct API endpoint
      const apiUrl = `https://choozpainters-api.vercel.app/${category}/${state}/${post_code}/${city}/${slug}`;

      console.log("Fetching data from:", apiUrl); // Debugging URL

      try {
        const response = await fetch(apiUrl);
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        this.contractorData = await response.json();
        console.log("Contractor Data:", this.contractorData);
      } catch (error) {
        console.error("Error fetching contractor data:", error);
        this.contractorData = null;
      }
    } else {
      console.error("Invalid contractor URL format.");
      this.contractorData = null;
    }
  }

  setContractorNameField() {
    const formIframe = document.getElementById("inline-EW6N1a3RC0W2io5fvMUB");

    if (formIframe && this.contractorData?.title) {
      const formUrl = new URL(formIframe.src);
      formUrl.searchParams.set("contractor_name", this.contractorData.title);
      formIframe.src = formUrl.toString();
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
                  data-region="${this.contractorData.state}" 
                  data-country="${this.contractorData.country}" 
                  data-company_phone="${this.contractorData.company_phone}"
                  data-website="${this.contractorData.website}"
                  data-facebook="${this.contractorData.facebook}"
                  data-google_bp="${this.contractorData.google_bp}"
                  data-category="${this.contractorData.category}"
                  data-post_code="${this.contractorData.post_code}"
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
      `;

      this.setContractorNameField();
      this.initModals();
    } else {
      this.innerHTML = `<p>Contractor not found.</p>`;
    }
  }

  initModals() {
    const modalElements = this.querySelectorAll(".modal");

    modalElements.forEach((modalElement) => {
      const modal = new bootstrap.Modal(modalElement, {});
      const modalButtons = this.querySelectorAll(
        `[data-toggle="modal"][data-target="#${modalElement.id}"]`,
      );

      modalButtons.forEach((button) => {
        button.addEventListener("click", () => {
          modal.show();
        });
      });

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
