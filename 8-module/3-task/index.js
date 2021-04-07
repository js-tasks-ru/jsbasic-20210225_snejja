export default class Cart {
  cartItems = []; 

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    if (this.cartItems[indexProduct].count === 0) this.cartItems.splice(indexProduct, 1);

    this.onProductUpdate(this.cartItems);
  }

  isEmpty = () => (this.cartItems.length === 0);

  getTotalCount = () => this.cartItems.reduce((sum, elem) => sum + elem.count, 0);

  getTotalPrice = () => this.cartItems.reduce((sum, elem) => sum + (elem.count * elem.product.price), 0);

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

