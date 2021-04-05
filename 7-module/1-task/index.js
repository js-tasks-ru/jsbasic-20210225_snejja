import createElement from '../../assets/lib/create-element.js';

function renderRibbon({ ribbonItems }) {
  let ribon = (`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
        ${ribbonItems}        
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
  `);

  return createElement(ribon);
}

function ribbonItems({ categories = {} }) {
  return categories.map(el => `<a href="#" class="ribbon__item" data-id="${el.id}">${el.name}</a>`).join('');
}

export default class RibbonMenu {
  constructor(categories) {
    this._categories = categories;
    this._arrows = null;
    this._ribbonInner = null;  
    this._linksCategories = null;
    this.elem = this._renderElem();    
  }

  _renderElem = () => {
    const render = renderRibbon({
      ribbonItems: ribbonItems({ categories: this._categories }) 
    });

    this._arrows = {
      leftArrow: render.querySelector('.ribbon__arrow_left'),  
      rightArrow: render.querySelector('.ribbon__arrow_right')    
    };

    this._ribbonInner = render.querySelector('.ribbon__inner');
    this._ribbonInner.addEventListener('scroll', this._scrollInner);

    this._arrows.leftArrow.addEventListener('click', this._onScrollBy(-1));
    this._arrows.rightArrow.addEventListener('click', this._onScrollBy(1));

    this._linksCategories = render.querySelectorAll('.ribbon__item');
    this._linksCategories.forEach(el => el.addEventListener('click', this._onLinkCategoryClick));

    return render;
  }

  _onScrollBy = (direction) => () => {
    let options = 350 * direction;   
    this._arrows.leftArrow.classList.add('ribbon__arrow_visible');
    this._arrows.rightArrow.classList.add('ribbon__arrow_visible');

    if (!this._ribbonInner) return;
    
    this._ribbonInner.scrollBy(options, 0);
  }

  _scrollInner = () => {    
    let scrollLeft = this._ribbonInner.scrollLeft;
    let scrollRight = this._ribbonInner.scrollWidth - scrollLeft - this._ribbonInner.clientWidth;

    if (scrollLeft === 0) {       
      this._arrows.leftArrow.classList.remove('ribbon__arrow_visible'); 
    } else if (scrollRight < 1) {
      this._arrows.rightArrow.classList.remove('ribbon__arrow_visible');
    }
  }

  _onLinkCategoryClick = (event) => {
    event.preventDefault();

    const itemActive = this._ribbonInner.querySelector('.ribbon__item_active');
    const target = event.target;

    if (itemActive) {
      itemActive.classList.remove('ribbon__item_active');
    }
    
    target.classList.add('ribbon__item_active');

    this.elem.dispatchEvent(new CustomEvent('ribbon-select', { 
      detail: target.dataset.id, 
      bubbles: true 
    }));
  }
}
