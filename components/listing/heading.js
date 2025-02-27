export class ListingHeading extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const length = this.getAttribute("data-length");

    this.innerHTML = `
        <div id="breadcrumb">
            <div class="container">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Missouri</a></li>
                <li><a href="#">Saint Louis</a></li>
                <li>Painting Contractors</li>
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
            <h1 class="heading heading_primary margin_b_30">
                St. Louis, MO Painting Contractors
            </h1>
            <div class="d-flex justify-content-between align-items-center">
                <p class="heading_result mb-0">
                    <strong>Showing ${length}</strong> painters in St. Louis, MO
                </p>
                <div class="d-flex align-items-center gap-2">
                    <label class="m-0 d-inline-block text-nowrap" for="sort-by">Sort by:</label>
                    <select id="sort-by" class="form-select" aria-label="Sort by" style="width: 200px;">
                        <option value="best-match" selected>Best Match</option>
                        <option value="rating">Rating</option>
                        <option value="distance">Distance</option>
                    </select>
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define("listing-heading", ListingHeading);
