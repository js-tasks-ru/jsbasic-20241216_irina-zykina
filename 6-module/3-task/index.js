import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render() {
    const slidesHtml = this.slides
      .map(
        (slide) => `<div class="carousel__slide" data-id="${slide.id}">
  <img src="../../assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${slide.price.toFixed(2)}</span>
    <div class="carousel__title">${slide.name}</div>
    <button type="button" class="carousel__button">
      <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>`
      )
      .join("");

    this._container = createElement(`
      <div class="carousel">
   
    <div class="carousel__arrow carousel__arrow_right">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left" style="display:none">
      <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">
    ${slidesHtml}
   
</div>
</div>`);
    let offset = 0; // текущий слайд
    this._container.onclick = (event) => {
      let carouselInner = document.querySelector(".carousel__inner");
      let rightArrow = document.querySelector(".carousel__arrow_right");
      let leftArrow = document.querySelector(".carousel__arrow_left");
      let width = carouselInner.offsetWidth;
      let arrow = event.target.closest(".carousel__arrow");
      if (!arrow) {
        let button = event.target.closest(".carousel__button");
        if (button) {
          let customEvent = new CustomEvent("product-add", {
            detail: this.slides[offset].id, // Уникальный идентификатора товара из объекта слайда
            bubbles: true, // это событие всплывает - это понадобится в дальнейшем
          });
          this._container.dispatchEvent(customEvent);
        }
        return;
      }
      let parentClassName = arrow.className;
      if (
        parentClassName === "carousel__arrow carousel__arrow_left" &&
        offset > 0
      ) {
        offset--;
      }
      if (
        parentClassName === "carousel__arrow carousel__arrow_right" &&
        offset < this.slides.length - 1
      ) {
        
        offset++;
      }
      carouselInner.style.transform = `translateX(${-width * offset}px)`;
      rightArrow.style.display =
        offset === this.slides.length - 1 ? "none" : "";
      leftArrow.style.display = offset === 0 ? "none" : "";
    };
  }
  get elem() {
    return this._container;
  }
}
