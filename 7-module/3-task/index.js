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

    this._container.onclick = (event) => {
      let left = event.clientX - this._container.getBoundingClientRect().left; 
      let leftRelative = left / this._container.offsetWidth;
      this.value = Math.round(leftRelative * (this.steps - 1));

      this.drawValue();

      let customEvent = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      });
      this._container.dispatchEvent(customEvent);
    };

    this.drawValue();
  }

  drawValue () {
    const thumb = this._container.querySelector(".slider__thumb");
    const progress = this._container.querySelector(".slider__progress");

    let leftPercents = (100 * this.value) / (this.steps - 1); // Значение в процентах от 0 до 100

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    this._container.querySelector(".slider__value").innerHTML = this.value;
    let activeStep = this._container.querySelector(".slider__step-active");
    let newActiveStep = this._container.querySelector(".slider__steps").children[this.value];
    activeStep.classList.remove("slider__step-active");
    newActiveStep.classList.add("slider__step-active");
  }
  

  get elem() {
    return this._container;
  }
}
