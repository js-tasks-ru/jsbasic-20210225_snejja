import createElement from '../../assets/lib/create-element.js';

function renderCarousel({carouselSlides, carouselArrowsButtons}) {
  let root = document.createElement('div');
  root.className = "carousel"; 
  root.innerHTML = `
    ${carouselArrowsButtons}
    <div class="carousel__inner">${carouselSlides}</div>`;
  return root; 
}

function carouselSlides({slides = {}}) {  
  return slides.map(el => `
    <div class="carousel__slide" data-id="${el.id}">
      <img src="/assets/images/carousel/${el.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${(el.price).toFixed(2)}</span>
        <div class="carousel__title">${el.name}</div>
          <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
  </div>
  `).join('');
}

function carouselArrowsButtons() {
  return `
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
  `;
}

export default class Carousel {
  constructor(slides) {
    this._slides = slides;    
    this._currentTranslateX = 0;
    this._currentSlide = 0;

    this.elem = renderCarousel({
      carouselArrowsButtons: carouselArrowsButtons(),
      carouselSlides: carouselSlides({
        slides: this._slides
      })      
    });   
    
    this._arrowLeft.style.display = 'none';
    this._carouselCount = this._carousel.children.length;

    this._arrowLeft.addEventListener('click', this._switchDirection(1));
    this._arrowRight.addEventListener('click', this._switchDirection(-1));
    this._buttonsAdd.forEach(el => el.addEventListener('click', this._onButtonAddClick));
  }
  
  get _arrowLeft() {
    return this.elem.querySelector('.carousel__arrow_left');
  }

  get _arrowRight() {
    return this.elem.querySelector('.carousel__arrow_right');
  }

  get _carousel() {
    return this.elem.querySelector('.carousel__inner');
  }

  get _buttonsAdd() {
    return this.elem.querySelectorAll('.carousel__button');
  }

  _switchDirection = (direction) => () => {  
    let _slideWidth = this._carousel.offsetWidth;
    this._arrowRight.style.display = '';      
    this._arrowLeft.style.display = '';

    this._currentSlide -= direction;

    if (this._currentSlide === 0) {
      this._arrowLeft.style.display = 'none';
    } else if (this._currentSlide === this._carouselCount - 1) {
      this._arrowRight.style.display = 'none';
    }

    this._currentTranslateX += _slideWidth * direction;
    this._carousel.style.transform = `translateX(${this._currentTranslateX}px)`;
  }

  _onButtonAddClick = (event) => {
    let slide = event.target.closest('.carousel__slide');
    this.elem.dispatchEvent(new CustomEvent('product-add', {    
      detail: slide.dataset.id,
      bubbles: true
    }));
  }  
}
