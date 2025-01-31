import "./template.js";

export class CategoriesWhite extends HTMLElement {
  constructor() {
    super();
    this.categories = [];
  }

  get categoriesData() {
    return [
      {
        image: "./img/categories/exterior-painting-purple_blue.png",
        name: "Exterior Painting",
      },
      {
        image: "./img/categories/interior-painting-purple_blue.png",
        name: "Interior Painting",
      },
      {
        image: "./img/categories/commercial-painting-purple_blue.png",
        name: "Commercial Painting",
      },
      {
        image: "./img/categories/cabinet-painting-purple_blue.png",
        name: "Cabinet Painting",
      },
      {
        image: "./img/categories/pressure-washing-purple_blue.png",
        name: "Pressure Washing",
      },
      {
        image: "./img/categories/deck-fence-purple_blue.png",
        name: "Deck & Fence Staining",
      },
    ];
  }

  connectedCallback() {
    this.categories = this.categoriesData;
    this.render();
  }

  render() {
    this.innerHTML = `
      <categories-template class="categories_white" 
        data-categories='${JSON.stringify(this.categories)
          .replace(/'/g, "&apos;")
          .replace(/"/g, "&quot;")}'></categories-template>
    `;
  }
}

customElements.define("categories-white", CategoriesWhite);
