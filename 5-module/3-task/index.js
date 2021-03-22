function initCarousel() {
  const carousel = document.querySelector('.carousel__inner');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');

  const carouselCount = carousel.children.length;
  const slideWidth = carousel.offsetWidth;

  let currentTranslateX = 0;
  let currentSlide = 0;
  arrowLeft.style.display = 'none';

  function switchDirection(direction) {  
    return function () {            
      arrowRight.style.display = '';      
      arrowLeft.style.display = '';

      currentSlide -= direction;

      if (currentSlide === 0) {
        arrowLeft.style.display = 'none';
      } else if (currentSlide === carouselCount - 1) {
        arrowRight.style.display = 'none';
      }

      currentTranslateX += slideWidth * direction;
      carousel.style.transform = `translateX(${currentTranslateX}px)`;
    };
  }

  arrowLeft.addEventListener('click', switchDirection(1));
  arrowRight.addEventListener('click', switchDirection(-1));
}
