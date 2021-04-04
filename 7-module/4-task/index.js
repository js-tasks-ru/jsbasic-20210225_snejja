import createElement from '../../assets/lib/create-element.js';

function createSlider({ steps }) {
  return createElement(`
    <div class="slider">      
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps">          
        ${steps}
      </div>
    </div>
  `);
}

function stepsSlider(count, value) {
  let spans = ``;
  for (let i = 0; i < count; i++) {
    spans += (i === value) ? `<span class="slider__step-active"></span>` : `<span></span>`;
  }
  return spans;
}

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;    
    this.elem = createSlider({ steps: stepsSlider(this._steps, this._value) }); 
    this.elem.addEventListener('click', this._onChangeValueSliderClick);  
    
    this._spansStepsSlider = this.elem.querySelector('.slider__steps').querySelectorAll('span');

    this._thumbSlider = this.elem.querySelector('.slider__thumb');
    this._thumbSlider.ondragstart = () => false;
    
    this._thumbSlider.onpointerdown = (event) => {
      event.preventDefault(); 
      document.addEventListener('pointermove', this._onMouseMove);
      document.addEventListener('pointerup', this._onMouseUp);
    };
  }

  _changeProgressPositionSlider = (percent) => {
    const progressSlider = this.elem.querySelector('.slider__progress');

    if (!progressSlider) return;

    this._thumbSlider.style.left = `${percent}%`;
    progressSlider.style.width = `${percent}%`;
  }

  _getApproximateValueSlider = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) leftRelative = 0;    
    if (leftRelative > 1) leftRelative = 1;

    let segments = this._steps - 1;
    let approximateValue = leftRelative * segments;
    return approximateValue;
  }

  _setActiveStepSlider() {
    let valueSlider = this.elem.querySelector('.slider__value');
    valueSlider.innerHTML = this._value;

    let activeStep = this.elem.querySelector('.slider__step-active');
    activeStep.classList.remove('slider__step-active');

    this._spansStepsSlider[this._value].classList.add('slider__step-active');
  }

  _onChangeValueSliderClick = (event) => {
    if (event.target === this._thumbSlider) return;

    this._value = Math.round(this._getApproximateValueSlider(event));

    this._setActiveStepSlider();
    const nearectValuePercent = this._value / (this._steps - 1) * 100;
    this._changeProgressPositionSlider(nearectValuePercent);    
    
    this.elem.dispatchEvent(new CustomEvent('slider-change', { 
      detail: this._value, 
      bubbles: true 
    }));
  }
  
  _onMouseMove = (event) => {   
    this.elem.classList.add('slider_dragging');

    let nearestValue = this._getApproximateValueSlider(event);
    this._value = Math.round(nearestValue);

    this._setActiveStepSlider();
    const nearectValuePercent = nearestValue / (this._steps - 1) * 100;
    this._changeProgressPositionSlider(nearectValuePercent);
  }

  _onMouseUp = () => {    
    this.elem.classList.remove('slider_dragging');
    
    this.elem.dispatchEvent(new CustomEvent('slider-change', { 
      detail: this._value,
      bubbles: true 
    }));

    const nearectValuePercent = this._value / (this._steps - 1) * 100;
    this._changeProgressPositionSlider(nearectValuePercent);

    document.removeEventListener('pointerup', this._onMouseUp);
    document.removeEventListener('pointermove', this._onMouseMove);
  }
}
