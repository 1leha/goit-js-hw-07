import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const refs = {
  gallery: document.querySelector(".gallery"),
};

makeGalleryMarkup(galleryItems);

refs.gallery.addEventListener("click", onImageClick);

function makeGalleryMarkup(gallery) {
  refs.gallery.innerHTML = gallery
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function onImageClick(e) {
  e.preventDefault();
  const bigSizedUrl = e.target.dataset.source;
  const description = e.target.alt;
  const basicLightboxItem = basicLightbox.create(
    `
	<img width="1280" src="${bigSizedUrl}" alt="${description}">
	`
  );
  const onEscape = (event) => {
    if (event.key === "Escape") {
      basicLightboxItem.close(() => {
        document.removeEventListener("keydown", onEscape);
      });
    }
  };

  basicLightboxItem.show();
  document.addEventListener("keydown", onEscape);
}
