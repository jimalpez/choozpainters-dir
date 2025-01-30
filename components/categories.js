class Categories extends HTMLElement {
  constructor() {
    super();
    this.categories = [];
  }

  get classes() {
    return this.getAttribute("class") || "";
  }

  get categoriesData() {
    const data = this.getAttribute("data-categories");
    try {
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Invalid JSON format for data-categories attribute", error);
      return [];
    }
  }

  connectedCallback() {
    this.categories = this.categoriesData;
    this.render();
  }

  render() {
    this.innerHTML = `
          <div class="container margin_120">
              <div class="row">
                  <div class="col-12">
                      <h2 class="heading heading_secondary">Browse by project type</h2>
                      <div class="categories_inline ${this.classes}">
                          ${this.categories
                            .map(
                              (category) => `
                              <a href="#" class="category_item">
                                  <div class="category_image">
                                      <img src="${category.image}" alt="${category.name}" />
                                  </div>
                                  <span>${category.name}</span>
                              </a>
                          `,
                            )
                            .join("")}
                      </div>
                  </div>
              </div>
          </div>
      `;
  }
}

customElements.define("categories-component", Categories);
