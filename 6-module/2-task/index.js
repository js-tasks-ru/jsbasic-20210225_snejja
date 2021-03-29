import createElement from '../../assets/lib/create-element.js';

function renderProductCard({product = {}}) {
  const root = document.createElement('div');
  root.className = "card";
  root.innerHTML = `
    <div class="card__top">
      <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
      <span class="card__price">€${(product.price).toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  `;

  return root;
}

export default class ProductCard {
  constructor(product) {
    this._product = product;

    this.elem = renderProductCard({
      product: this._product
    });

    this._button.addEventListener('click', this._onButtonAddClick);
  }
  
  get _button() {
    return this.elem.querySelector('.card__button');
  }

  _onButtonAddClick = () => {
    this.elem.dispatchEvent(new CustomEvent('product-add', {
      detail: this._product.id,
      bubbles: true
    }));
  }  
}
