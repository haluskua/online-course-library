// // 563492ad6f91700001000001b812ffb7e89f43448454ef0c6e746aa9

const auth = "563492ad6f91700001000001b812ffb7e89f43448454ef0c6e746aa9";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");

//search value variable:

let searchValue;

//EventListener
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    e.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(e) {
  //   console.log(e.target.value);
  searchValue = e.target.value;
}
//function that gets images

async function curatedPhotos() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/curated?per_page=7&page=1",

    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );

  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographer}</p>
    
    `;
    gallery.appendChild(galleryImg);
  });
}

async function searchPhotos(query) {
  const dataFetch = await fetch(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=7&page=1`,

    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographer}</p>
    
    `;
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();