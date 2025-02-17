import "./heading.js";
import "./gallery.js";
import "./tabs.js";
import "./map.js";
import "./sidebar.js";

class Contractor extends HTMLElement {
  constructor() {
    super();
    this.contractorData = null;
  }

  async connectedCallback() {
    await this.fetchContractorData();
    this.render();
  }

  async fetchContractorData() {
    // Get region and slug from the URL (e.g., "/contractor/missouri/astra-painters-llc/")
    const pathSegments = window.location.pathname.split("/").filter(Boolean);

    if (pathSegments.length < 3 || pathSegments[0] !== "contractor") {
      console.error("Invalid contractor URL format.");
      return;
    }

    const region = pathSegments[1];
    const slug = pathSegments[2];

    try {
      const response = await fetch("https://nrroyfmyiff6qhks7i2xdmgcxu0erbid.lambda-url.us-east-1.on.aws/");
      if (!response.ok) {
        throw new Error("Failed to fetch contractors");
      }

      const contractors = await response.json();

      // Find the contractor that matches region and slug
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
        <main>
            <div class="container">
                <contractor-heading 
                  data-name="${this.contractorData.title}" 
                  data-city="${this.contractorData.city}" 
                  data-state="${this.contractorData.region}" 
                  data-phone="${this.contractorData.company_phone}">
                </contractor-heading>

                <div class="row">
                    <div class="col-xl-8 col-lg-8 padding_r_50_desktop">
                        <contractor-gallery></contractor-gallery>
                        <contractor-tabs></contractor-tabs>
                        <contractor-map></contractor-map>
                    </div>
                    <aside class="col-xl-4 col-lg-4" id="sidebar">
                        <contractor-sidebar></contractor-sidebar>
                    </aside>
                </div>
            </div>
        </main>
      `;
    } else {
      this.innerHTML = `<p>Contractor not found.</p>`;
    }
  }
}

customElements.define("contractor-component", Contractor);
