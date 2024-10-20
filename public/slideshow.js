const slides=document.getElementsByClassName("my-slide")
const bars= document.getElementsByClassName("bar");

let slideIndex = 0;
let intervalID = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){
  if(slides.length > 0){
      showSlides(slideIndex);
      intervalID = setInterval(plusSlides, 5000);
  }
}
function plusSlides(n) {
  n = n || 1;
  clearInterval(intervalID);
  slideIndex += n;
  initializeSlider();
}

function currentSlide(n) {
  clearInterval(intervalID);
  slideIndex = n;
  initializeSlider();
}

function showSlides(n) {
  n = n || slideIndex;
  let i;
  if (n >= slides.length){
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length-1;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < bars.length; i++) {
    bars[i].className = bars[i].className.replace(" active", "");
  }
  slides[slideIndex].style.display = "block";
  bars[slideIndex].className += " active";
}