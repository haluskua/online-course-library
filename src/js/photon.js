// // 563492ad6f91700001000001b812ffb7e89f43448454ef0c6e746aa9

const auth = "563492ad6f91700001000001b812ffb7e89f43448454ef0c6e746aa9";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");

//search value variable:
let page = 1;
let searchValue;
let fetchLink;
let currentSearch;

//EventListener
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

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
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        `;
    gallery.appendChild(galleryImg);
  });
}

//function that gets images
async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=7&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=7&page=1`
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

//clearing text in input search
function clear() {
    gallery.innerHTML = "";
    searchInput.value= "";
}


async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=7&page=${page}`
    }else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=7&page=${page}`
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();
