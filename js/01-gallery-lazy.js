import { galleryItems } from "./gallery-items-lazy.js";
// Change code below this line

const refs = {
  gallery: document.querySelector(".gallery"),
};

makeGalleryMarkup(galleryItems);

if ("loading" in HTMLImageElement.prototype) {
  changeImagesSource();
} else {
  makeLazyScript();
}

refs.gallery.addEventListener("click", onImageClick);

function makeGalleryMarkup(gallery) {
  const a = gallery
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      loading="lazy"
      class="gallery__image lazyload"
      data-src="${preview}"
      data-source="${original}"
      alt="${description}"
      
    />
  </a>
</div>`;
    })
    .join("");
  refs.gallery.innerHTML = a;
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

function makeLazyScript() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js";
  document.body.appendChild(script);
}

function changeImagesSource() {
  const imagesRef = document.querySelectorAll('img[loading="lazy"]');
  imagesRef.forEach((img) => (img.src = img.dataset.src));
}
