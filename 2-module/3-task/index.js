let calculator = {
  read(a, b) {
    this.a = a;
    this.b = b;
  },
  
  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  }
};

window.calculator = calculator;