class Animator {
  constructor(selector) {
    this.selector = document.querySelector(selector);
  }
  //pass in methods
  fadeOut(time) {
    this.selector.style.transition = `${time}s ease`;
    this.selector.style.opacity = 0;
  }
}

// bringing classes from HTML into constructor

const intro = new Animator(".toggleFade");

// intro.fadeOut(30);

const button = document.querySelector(".toggleFade");

button.addEventListener("click", () => {
  intro.fadeOut(2);
});
