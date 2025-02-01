function initCarousel() {
  const imagesQuantity = 4;
  let carousel = document.querySelector(".carousel");
  let carouselInner = document.querySelector(".carousel__inner");
  let width = carouselInner.offsetWidth;
  let offset = 0;
  let rightArrow = document.querySelector(".carousel__arrow_right");
  let leftArrow = document.querySelector(".carousel__arrow_left");
  leftArrow.style.display = 'none';
  carousel.onclick = (event) => {
    let parentClassName = event.target.parentElement.className;
    if (parentClassName === "carousel__arrow carousel__arrow_left" && offset > 0) {
      offset--;
    }
    if (parentClassName === "carousel__arrow carousel__arrow_right" && offset < imagesQuantity - 1) {
      offset++;
    }
    carouselInner.style.transform = `translateX(${-width * offset}px)`;
    rightArrow.style.display = offset === imagesQuantity - 1 ? 'none' : ''; 
    leftArrow.style.display = offset === 0 ? 'none' : '';
  };
}

