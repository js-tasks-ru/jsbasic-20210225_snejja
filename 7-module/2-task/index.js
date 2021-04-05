import createElement from '../../assets/lib/create-element.js';

function createModalWindow() {
  return createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>
    </div> 
  `);
}

export default class Modal {
  constructor() {
    this._modalWindow = createModalWindow();
    this._body = document.body;

    this._modalWindow.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', this._onCloseWindow);
  }

  _onCloseWindow = (event) => {
    if (event.code === 'Escape') this.close();
  }

  setTitle(title) {
    const modalTitle = this._modalWindow.querySelector('.modal__title');
    modalTitle.innerHTML = title;
  }

  setBody (rootHTML) {
    const modalBody = this._modalWindow.querySelector('.modal__body');
    modalBody.innerHTML += rootHTML.outerHTML;
  }

  open = () => {
    this._body.classList.add("is-modal-open");
    this._body.append(this._modalWindow);
  }

  close = () => {
    this._body.classList.remove("is-modal-open");
    this._modalWindow.remove();
    document.removeEventListener('keydown', this._onCloseWindow);
  }
}
