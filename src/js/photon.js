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

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
        <p>${photo.photographer}</p>
        `;
    gallery.appendChild(galleryImg);
  });
}

//function that gets images
async function curatedPhotos() {
  const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=7&page=1");
  generatePictures(data);
}

async function searchPhotos(query) {
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=7&page=1`
  );
  generatePictures(data);
}

curatedPhotos();
