

export class ListingPagination extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
  
      this.innerHTML = `
        <nav aria-label="" class="add_top_20">
            <ul class="pagination pagination-sm">
            <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>
            <li class="page-item active">
                <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
            </ul>
        </nav>
        `;
    }
  }
  
  customElements.define("listing-pagination", ListingPagination);
  