import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

const createProductGrid = () => {
  return `
    <div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>
  `;
};

const getProductsCards = ({ products = [] }) => products.map(el => new ProductCard(el));

export default class ProductGrid {
  constructor(products) {
    this._products = products;    
    this._productsCards = getProductsCards({ products: this._products });    
    this.elem = this._renderProductGrid(this._productsCards);
    this._filters = {};
    this._productsFilter = [];
  }

  _renderProductGrid = (products) => {
    let createRoot = createElement(createProductGrid());    
    let rootProduct = createRoot.querySelector('.products-grid__inner');
    
    rootProduct.append(...products.map(el => el.elem));
    return createRoot;
  }

  updateFilter = (filter) => {
    const defaultFilter = { noNuts: false, vegeterianOnly: false, maxSpiciness: 4, category: '' };
    this._filters = {...defaultFilter, ...this._filters, ...filter};

    let firstFilter = this._productsCards;
    this._productsFilter = firstFilter;
    
    if (this._filters.noNuts === true) {
      firstFilter = firstFilter.filter(el => el._product.nuts === false || el._product.nuts === undefined);       
    } 
    if (this._filters.vegeterianOnly === true) {
      firstFilter = firstFilter.filter(el => el._product.vegeterian === true);      
    } 
    if (this._filters.maxSpiciness <= 4) {
      firstFilter = firstFilter.filter(el => el._product.spiciness <= this._filters.maxSpiciness);      
    } 
    if (this._filters.category !== '') {
      firstFilter = firstFilter.filter(el => el._product.category === this._filters.category);
    }    
    
    this._productsFilter = firstFilter;  
  
    const rootProduct = this.elem.querySelector('.products-grid__inner');
    rootProduct.innerHTML = "";

    rootProduct.append(...this._productsFilter.map(el => el.elem));
  }
}
