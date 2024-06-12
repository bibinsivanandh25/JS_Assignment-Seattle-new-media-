//? Scrolling
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  animation: gsap
    .timeline()
    .from('.sub_video', {
      y: 0,
      scale: 1,
      yPercent: 0,
    })
    .to('.sub_video', {
      x: '-25vh',
      y: '110vh',
      scale: 6,
      yPercent: -100,
      width: 160,
      borderRadius: '6px',
    }),
  scrub: true,
  trigger: '.video_section',
  start: 'top bottom',
  end: 'top center',
});

// Carousel

let currentImageIndex = 0;
const images = document.getElementsByClassName('carousel-image');
const imageNumbers = document.getElementsByClassName('image-number');

function showImage(index) {
  for (let i = 0; i < images.length; i++) {
    images[i].classList.remove('active');
    images[i].classList.remove('inactive');
    imageNumbers[i].classList.remove('active');
  }
  currentImageIndex = index;
  images[index].classList.add('active');
  imageNumbers[index].classList.add('active');

  const prevIndex = (index - 1 + images.length) % images.length;
  const nextIndex = (index + 1) % images.length;
  images[prevIndex].classList.add('inactive');
  images[nextIndex].classList.add('inactive');

  Array.from(images).forEach((img, i) => {
    img.style.display =
      i === currentImageIndex || i === (currentImageIndex + 1) % images.length
        ? 'block'
        : 'none';
    img.style.width = i === currentImageIndex ? '60%' : '40%';
    img.style.transition = 'width 0.5s ease';
  });
}

function changeImage(n) {
  currentImageIndex += n;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  showImage(currentImageIndex);
}

// Initialize the carousel
showImage(currentImageIndex);

// Grabbing functionality
let startX = 0;
let isDragging = false;

function onMouseDown(event) {
  startX = event.clientX;
  isDragging = true;
  document.body.style.cursor = 'grabbing';
}

function onMouseMove(event) {
  if (!isDragging) return;
  const diffX = event.clientX - startX;
  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      changeImage(-1);
    } else {
      changeImage(1);
    }
    startX = event.clientX;
    isDragging = false;
    document.body.style.cursor = 'grab';
  }
}

function onMouseUp() {
  isDragging = false;
  document.body.style.cursor = 'grab';
}

// Add event listeners
images[0].parentElement.addEventListener('mousedown', onMouseDown);
images[0].parentElement.addEventListener('mousemove', onMouseMove);
images[0].parentElement.addEventListener('mouseup', onMouseUp);
images[0].parentElement.addEventListener('mouseleave', onMouseUp);
images[0].parentElement.style.cursor = 'grab';
