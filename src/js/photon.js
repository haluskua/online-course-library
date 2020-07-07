// 563492ad6f91700001000001b812ffb7e89f43448454ef0c6e746aa9

const auth = "563492ad6f91700001000001b812ffb7e89f43448454ef0c6e746aa9";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");

let searchValue;
//search photos
// "https://api.pexels.com/v1/search?query=nature&per_page=1"

async function curatedPhotos() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/curated?per_page=15&page=1",
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
      console.log(photo)
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img> 
    <p>${photo.photographer}</p>
    `;
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();

// curated photo
// "https://api.pexels.com/v1/curated?per_page=1"
