/* 
Inspirations: 
1. https://dribbble.com/shots/4926949-Anghami-website-deisgn 
2. https://codepen.io/GreenSock/pen/YzOBJbx 
*/

// GSAP



console.clear();

let sections = document.querySelectorAll("section"),
  background = document.querySelectorAll(".bg"),
  
 
  currentIndex = -1,
  
  animating;





function gotoSection(index, direction) {
  index = clamp(index); // make sure it's valid

  // If they are the same, it's either the first or last slide
  if (index === currentIndex) {
    return;
  }

  animating = true;
  let fromTop = direction === -1,
    dFactor = fromTop ? -1 : 1,
   
  if (currentIndex >= 0) {
    // The first time this function runs, current is -1
   
    tl.to(background[currentIndex], { yPercent: -15 * dFactor }).set(
      sections[currentIndex],
      { autoAlpha: 0 }
    );
  }
 
  tl.fromTo(
    [outerWrappers[index], innerWrappers[index]],
    { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
    { yPercent: 0 },
    0
  ).fromTo(background[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

  currentIndex = index;
  return tl;
}

Observer.create({
  type: "wheel, pointer",
  wheelSpeed: -1,
  onDown: () => {
    !animating && gotoSection(currentIndex - 1, -1);
  },
  onUp: () => {
    !animating && gotoSection(currentIndex + 1, 1);
  },
  tolerance: 200,
  allowClicks: true,
  preventDefault: true,
});

gotoSection(0, 1).progress(1);

// SWIPER

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  initialSlide: 1,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
