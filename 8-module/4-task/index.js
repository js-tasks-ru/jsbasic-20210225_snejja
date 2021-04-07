import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; 

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this._modalWindow = undefined;
    this._modalWindowBody = undefined;

    this.addEventListeners();
  }

  addProduct = (product) => {
    if (!this.cartItems.find(el => el.product.id === product.id) || this.cartItems.length === 0) {
      let newProduct = {
        product: product,
        count: 1
      };      

      this.cartItems.push(newProduct);
    } else {
      let indexProduct = this.cartItems.findIndex(el => el.product.id === product.id);   
      this.cartItems[indexProduct].count++;
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount = (productId, amount) => {
    let indexProduct = this.cartItems.findIndex(el => el.product.id === productId);
    this.cartItems[indexProduct].count += amount;
    if (this.cartItems[indexProduct].count === 0) {
      this.cartItems.splice(indexProduct, 1);
      document.querySelector(`[data-product-id="${productId}"]`).remove();
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty = () => (this.cartItems.length === 0);

  getTotalCount = () => this.cartItems.reduce((sum, elem) => sum + elem.count, 0);

  getTotalPrice = () => this.cartItems.reduce((sum, elem) => sum + (elem.count * elem.product.price), 0);

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal = () => {
    this._modalWindow = new Modal();
    this._modalWindow.setTitle('Your order');

    let root = createElement(`<div></div>`);
    this.cartItems.forEach(elem => root.append(this.renderProduct(elem.product, elem.count)));    
    root.append(this.renderOrderForm());
    
    this._modalWindow.setBody(root);
    this._modalWindow.open();

    this._modalWindowBody = document.querySelector('.modal__body');
    
    let buttonMinus = document.querySelectorAll('.cart-counter__button_minus');
    let buttonPlus = document.querySelectorAll('.cart-counter__button_plus');
    buttonMinus.forEach(elem => elem.addEventListener('click', this._onButtonClick(-1)));
    buttonPlus.forEach(elem => elem.addEventListener('click', this._onButtonClick(1)));

    let cardForm = document.querySelector('.cart-form');
    cardForm.addEventListener('submit', this.onSubmit);
  }

  onProductUpdate = (cartItem) => {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) return;
    if (cartItem.length === 0) {
      this._modalWindow.close();
      return;
    }
 
    cartItem.forEach(elem => {
      let productId = elem.product.id;
      let productCount = this._modalWindowBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = this._modalWindowBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

      productCount.innerHTML = elem.count;
      productPrice.innerHTML = `€${(elem.count * elem.product.price).toFixed(2)}`;
    });

    let infoPrice = this._modalWindowBody.querySelector(`.cart-buttons__info-price`);
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit = (event) => {
    event.preventDefault();
    
    const buttonSubmit = document.querySelector('[type="submit"]');
    buttonSubmit.classList.add('is-loading');

    const formElem = new FormData(document.querySelector('.cart-form'));

    const responsePromise = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formElem
    });

    responsePromise.then(() => {
      this._modalWindow.setTitle('Success!');
      this.cartItems = [] ;
      this._modalWindowBody.innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `;
    });
  }

  addEventListeners = () => {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  _onButtonClick = (direction) => (event)=> {
    const product = event.target.closest('[data-product-id]');
    const productId = product.getAttribute('data-product-id');
    
    this.updateProductCount(productId, direction);
  } 
}
