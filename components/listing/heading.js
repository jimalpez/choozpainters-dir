export class ListingHeading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div id="breadcrumb">
            <div class="container">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Category</a></li>
                <li>Page active</li>
            </ul>
            </div>
        </div>
        <!-- /breadcrumb -->

        <div id="results">
            <div class="container">
            <div class="row">
                <div class="col-12">
                <div class="list_search_bar">
                    <div class="list_search_bar_group">
                    <label for="find"> Search by Project Type </label>
                    <select id="country" name="country">
                        <option value="Exterior Painting">Exterior Painting</option>
                        <option value="Interior Painting">Interior Painting</option>
                        <option value="Commercial Painting">
                        Commercial Painting
                        </option>
                        <option value="Cabinet Painting">Cabinet Painting</option>
                        <option value="Pressure Washing">Pressure Washing</option>
                        <option value="Deck & Fence Staining">
                        Deck & Fence Staining
                        </option>
                    </select>
                    </div>
                    <div class="list_search_bar_group">
                    <label for="near">Location (city/state or ZIP code)</label>
                    <input
                        id="near"
                        type="search"
                        class="list_search_bar_group_search"
                        placeholder="Saint Louis, MO" />
                    </div>
                    <input
                    type="button"
                    value="Find Painters"
                    class="list_search_bar_group_search_button" />
                </div>
                </div>
            </div>
            <!-- /row -->
            </div>
            <!-- /container -->
        </div>
        <!-- /results -->

        <div class="container margin_t_60">
            <h1 class="heading heading_primary">
            Painting Companies in St. Louis Missouri
            </h1>
            <h4 class="heading_result">
            <strong>Showing 10</strong> of 140 results
            </h4>
        </div>
    `;
  }
}

customElements.define("listing-heading", ListingHeading);
