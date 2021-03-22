function initCarousel() {
  const carousel = document.querySelector('.carousel__inner');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');

  const carouselCount = carousel.children.length;
  const slideWidth = carousel.offsetWidth;

  let width = 0;
  let current = 0;
  arrowLeft.style.display = 'none';

  const switchLeft = () => { 
    current--;         
    if (current === 0)
    {
      arrowLeft.style.display = 'none';
    }

    arrowRight.style.display = '';
    width += slideWidth;
    carousel.style.transform = `translateX(${width}px)`;
  };

  const switchRight = () => {     
    current++;
    if (current === carouselCount - 1)
    {
      arrowRight.style.display = 'none';
    }

    arrowLeft.style.display = '';
    width -= slideWidth;
    carousel.style.transform = `translateX(${width}px)`;
  };

  arrowLeft.addEventListener('click', switchLeft);
  arrowRight.addEventListener('click', switchRight);
}
