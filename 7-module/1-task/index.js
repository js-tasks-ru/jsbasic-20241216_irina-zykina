import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
  }
  render() {
    const categoriesHtml = this.categories
      .map(
        (item, index) => `
      <a href="#" class="ribbon__item${
        index === 0 ? " ribbon__item_active" : ""
      }" 
      data-id="${item.id}">"${item.name}"</a>`
      )
      .join("");

    this._container = createElement(`
  <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  

  <nav class="ribbon__inner">
  ${categoriesHtml}
  </nav> 
 <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
 `);
    this._container.onclick = (event) => {
      let arrow = event.target.closest(".ribbon__arrow");

      if (!arrow) {
        let item = event.target.closest(".ribbon__item");
        if (item) {
          event.preventDefault();
          const currentActive = document.querySelector(".ribbon__item_active");
          currentActive.classList.remove("ribbon__item_active");
          item.classList.add("ribbon__item_active");
          const dataId = item.getAttribute("data-id");
          const customEvent = new CustomEvent("ribbon-select", {
            detail: dataId,
            bubbles: true,
          });
          this._container.dispatchEvent(customEvent);
          return;
        }
      }
      let ribbonInner = document.querySelector(".ribbon__inner");
      if (arrow.classList.contains("ribbon__arrow_right")) {
        ribbonInner.scrollBy(350, 0);
      }
      if (arrow.classList.contains("ribbon__arrow_left")) {
        ribbonInner.scrollBy(-350, 0);
      }
    };
    const ribbonInn = this._container.querySelector(".ribbon__inner");
    ribbonInn.onscroll = (event) => {
      let ribbonInner = document.querySelector(".ribbon__inner");
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      let leftArrow = document.querySelector(".ribbon__arrow_left");
      if (scrollLeft === 0) {
        leftArrow.classList.remove("ribbon__arrow_visible");
      } else if (!leftArrow.classList.contains("ribbon__arrow_visible")) {
        leftArrow.classList.add("ribbon__arrow_visible");
      }
      let rightArrow = document.querySelector(".ribbon__arrow_right");
      if (scrollRight < 1) {
        rightArrow.classList.remove("ribbon__arrow_visible");
      } else if (!rightArrow.classList.contains("ribbon__arrow_visible")) {
        rightArrow.classList.add("ribbon__arrow_visible");
      }
    };
  }

  get elem() {
    return this._container;
  }
}
