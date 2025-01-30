import "./template.js";

export class CategoriesWhite extends HTMLElement {
  constructor() {
    super();
    this.categories = [];
  }

  get categoriesData() {
    return [
      {
        image: "./img/categories/exterior-painting-blue-1.png",
        name: "Exterior Painting",
      },
      {
        image: "./img/categories/interior-painting-blue-1.png",
        name: "Interior Painting",
      },
      {
        image: "./img/categories/commercial-painting-blue-1.png",
        name: "Commercial Painting",
      },
      {
        image: "./img/categories/cabinet-painting-blue-1.png",
        name: "Cabinet Painting",
      },
      {
        image: "./img/categories/pressure-washing-blue-1.png",
        name: "Pressure Washing",
      },
      {
        image: "./img/categories/deck-fence-blue-1.png",
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
