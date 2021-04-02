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
    this.modalWindow = createModalWindow();
    this.body = document.body;

    this.modalWindow.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', (event) => {
      if(event.code === 'Escape') this.close();
    });    
  }

  setTitle(title) {
    const modalTitle = this.modalWindow.querySelector('.modal__title');
    modalTitle.innerHTML = title;
  }

  setBody (rootHTML) {
    const modalBody = this.modalWindow.querySelector('.modal__body');
    modalBody.innerHTML += rootHTML.outerHTML;
  }

  open = () => {
    this.body.classList.add("is-modal-open");
    this.body.append(this.modalWindow);
  }

  close = () => {
    this.body.classList.remove("is-modal-open");
    this.modalWindow.remove();
  }
}
