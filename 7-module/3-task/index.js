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
    this.elem.addEventListener('click', this._onChangeValueSlider);    
  }

  _onChangeValueSlider = (event) => {
    this._value = this._getApproximateValueSlider(event);

    this.elem.dispatchEvent(new CustomEvent('slider-change', { 
      detail: this._value, 
      bubbles: true 
    }));

    const valueSlider = this.elem.querySelector('.slider__value');
    valueSlider.innerHTML = this._value;

    const activeStep = this.elem.querySelector('.slider__step-active');
    activeStep.classList.remove('slider__step-active');

    const spans = this.elem.querySelector('.slider__steps').querySelectorAll('span');
    spans[this._value].classList.add('slider__step-active');
    
    const nearectValuePercent = this._value / (this._steps - 1) * 100;
    this._changeProgressPositionSlider(nearectValuePercent);
  }

  _getApproximateValueSlider = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this._steps - 1;
    let approximateValue = leftRelative * segments;
    return Math.round(approximateValue);
  }

  _changeProgressPositionSlider = (percent) => {
    const thumbSlider = this.elem.querySelector('.slider__thumb');
    const progressSlider = this.elem.querySelector('.slider__progress');

    if (!progressSlider || !thumbSlider) return;

    thumbSlider.style.left = `${percent}%`;
    progressSlider.style.width = `${percent}%`;
  }
}
