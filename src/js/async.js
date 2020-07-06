// https://api.adviceslip.com/advicce

const asyncButton = document.querySelector("#apiBtn");
const header = document.querySelector("#asyncOut");

asyncButton.addEventListener("click", () => {
  fetch("https://api.adviceslip.com/advice")
    .then((result) => result.json())
    .then((data) => {
      header.innerText = data.slip.advice;
    });
});
