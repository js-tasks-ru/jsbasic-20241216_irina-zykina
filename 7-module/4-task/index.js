import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
  }

  render() {
    let stepsHtml = "";
    for (let i = 0; i < this.steps; i++) {
      stepsHtml +=
        this.value == i
          ? '<span class="slider__step-active"></span>'
          : "<span></span>";
    }

    this._container = createElement(`

  <!--Корневой элемент слайдера-->
  <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">${this.value}</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 50%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
      ${stepsHtml}
      
    </div>

</div>`);

    let thumb = this._container.querySelector(".slider__thumb");
    thumb.ondragstart = () => false; // отключили стандартный Dragndrop
    thumb.addEventListener("pointerdown", () => {
      this._container.classList.add("slider_dragging");
      document.addEventListener("pointerup", () => {
        this._container.classList.remove("slider_dragging");
        document.removeEventListener("pointermove", onmove);
      });
      document.addEventListener("pointermove", onmove);
      
      let self = this;
      function onmove(event) {
          let left = event.pageX - self.elem.getBoundingClientRect().left;
          if (left < 0 || left > self.elem.offsetWidth) {
            return;
          }          

          let leftRelative = left / self.elem.offsetWidth;
          self.setValue(leftRelative);
          self.drawThumb(leftRelative * 100);
      }
    });

    this._container.onclick = (event) => {
      let left = event.clientX - this._container.getBoundingClientRect().left;
      let leftRelative = left / this._container.offsetWidth;

      this.setValue(leftRelative);
      this.drawThumb();
    };

    this.drawThumb();
  }

  drawThumb(thumbPosition) {
    const thumb = this._container.querySelector(".slider__thumb");
    const progress = this._container.querySelector(".slider__progress");

    let leftPercents = thumbPosition || (100 * this.value) / (this.steps - 1); // Значение в процентах от 0 до 100

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    let activeStep = this._container.querySelector(".slider__step-active");
    let newActiveStep =
      this._container.querySelector(".slider__steps").children[this.value];
    activeStep.classList.remove("slider__step-active");
    newActiveStep.classList.add("slider__step-active");
  }

  setValue(leftRelative) {
    let newValue = Math.round(leftRelative * (this.steps - 1)); 
    if (newValue !== this.value) {
      this.value = newValue;
      this._container.querySelector(".slider__value").innerHTML = this.value;
      let customEvent = new CustomEvent("slider-change", {
        // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true, // событие всплывает - это понадобится в дальнейшем
      });
      this._container.dispatchEvent(customEvent);
    }
  }

  get elem() {
    return this._container;
  }
}
