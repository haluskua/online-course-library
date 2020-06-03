class Animator {
  constructor(selector) {
    this.selector = document.querySelector(selector);
  }
  //pass in *fadeout methods
  fadeOut(time, toggle = false) {
    if (toggle && this.selector.classList.contains("fadeOut-active")) {
      this.selector.style.opacity = 1;
      this.selector.classList.remove("fadeOut-active");

    } else {
      this.selector.style.transition = `${time}s ease`;
      this.selector.style.opacity = 0;
      this.selector.classList.add("fadeOut-active");
    }
  }

  //////////////////////
   //pass in *move methods
   move(time, toggle = false, {x = 0, y = 0}) {
    if (toggle && this.selector.classList.contains("move-active")) {
      this.selector.style.transform = "translate(0px, 0px)";
      this.selector.classList.remove("move-active");

    } else {
      this.selector.style.transition = `${time}s ease`;
      this.selector.style.transform = `translate(${x}px, ${y}px)`;
      this.selector.classList.add("move-active");
    }
  }

  
}

// bringing classes from HTML into constructor

const intro = new Animator(".toggleFade");

// intro.fadeOut(30);

const button = document.querySelector(".toggleFade");

button.addEventListener("click", () => {
  intro.move(2, true, {x: 100});
  intro.fadeOut(3, true);
});
