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

    if (pathSegments.length < 3 || pathSegments[0] !== "contractor") {
      console.error("Invalid contractor URL format.");
      return;
    }

    const region = pathSegments[1];
    const slug = pathSegments[2];

    try {
      const response = await fetch(
        "https://nrroyfmyiff6qhks7i2xdmgcxu0erbid.lambda-url.us-east-1.on.aws/",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch contractors");
      }

      const contractors = await response.json();
      this.contractorData = contractors.find(
        (contractor) =>
          contractor.region.toLowerCase() === region.toLowerCase() &&
          contractor.slug === slug,
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
      
        <header-component></header-component>

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
                        <contractor-gallery></contractor-gallery>
                        <contractor-tabs></contractor-tabs>
                        <contractor-map
                          data-latitude="${this.contractorData.location_latitude}"
                          data-longitude="${this.contractorData.location_longitude}"
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
                        ></contractor-sidebar>
                    </aside>
                </div>
            </div>
        </main>

        <footer-component></footer-component>
      `;
    } else {
      this.innerHTML = `<p>Contractor not found.</p>`;
    }
  }
}

customElements.define("contractor-component", Contractor);
