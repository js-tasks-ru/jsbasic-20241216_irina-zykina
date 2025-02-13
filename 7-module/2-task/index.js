import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
  }

  render() {
    this._container = createElement(`
 <div class="modal"> 
     
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
  
          <button type="button" class="modal__close">
            <img src="../../assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
             
          </h3>
        </div>

        <div class="modal__body">
         
        </div>
      </div>
    </div>`);

    let buttonX = this._container.querySelector(".modal__close");
    buttonX.onclick = (event) => {
      this.close();
    };
    document.onkeydown = (event) => {
      if (event.code === "Escape") this.close();
    };
  }
  open() {
    if (!this.isOpened) {
      document.body.appendChild(this._container);
      document.body.classList.add("is-modal-open");
    }
  }

  setTitle(text) {
    let title = this._container.querySelector(".modal__title");
    title.innerHTML = text;
  }

  setBody(modalBody) {
    let mBody = this._container.querySelector(".modal__body");
    mBody.innerHTML = "";
    mBody.appendChild(modalBody);
  }
  close() {
    if (this.isOpened) {
      document.body.removeChild(this._container);
      document.body.classList.remove("is-modal-open");
    }
  }
  get isOpened() {
    return document.body.classList.contains("is-modal-open");
  }
}
