import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  gallery: document.querySelector(".gallery"),
};

makeGalleryMarkup(galleryItems);

refs.gallery.addEventListener("click", onImageClick);

let imageLightBox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
});

function makeGalleryMarkup(gallery) {
  refs.gallery.innerHTML = gallery
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>`;
    })
    .join("");
}

function onImageClick(e) {
  e.preventDefault();

  const onEscape = (event) => {
    if (event.key === "Escape") {
      imageLightBox.close();
      document.removeEventListener("keydown", onEscape);
    }
  };
  document.addEventListener("keydown", onEscape);
}
