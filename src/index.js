import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import debounce from 'lodash.debounce';
import ImagesApiService from './js/images-service';
import { getRefs } from './js/get-refs';
import debounce from 'lodash.debounce';

// const DEBOUNCE_DELAY = 300;
const refs = getRefs();
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearGallery();
  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query === '') {
    onError();
    return;
  }
  imagesApiService.resetPage();
  imagesApiService.fetchImages().then(renderGallery);
}

function onLoadMore() {
  imagesApiService.fetchImages().then(renderGallery);
  lightbox.refresh();
}

function galleryTpl(gallery) {
  return gallery
    .map(
      ({
        webformatURL: previewImg,
        largeImageURL: largeImg,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="gallery__item">
        <a class="gallery__link" href="${largeImg}">
        <img class="gallery__image" src="${previewImg}" alt="${tags}" loading="lazy" />
         </a>
        <div class="info">
    ${
      likes
        ? `<p class="info-item">
      <b>Likes: ${likes} </b>
    </p>`
        : ''
    }
    ${
      views
        ? `<p class="info-item">
      <b>Views: ${views}</b>
    </p>`
        : ''
    }
    ${
      comments
        ? `<p class="info-item">
      <b>Comments: ${comments}</b>
    </p>`
        : ''
    }
    ${
      downloads
        ? `<p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>`
        : ''
    }

    </div>

</div>`;
      }
    )
    .join('');
}

function renderGallery({ hits: gallery }) {
  if (gallery.length === 0) {
    onError();
    return;
  }
  refs.galleryBox.insertAdjacentHTML('beforeend', galleryTpl(gallery));
  onLightboxActive();
}

function clearGallery() {
  refs.galleryBox.innerHTML = '';
}

function onError() {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onLightboxActive() {
  let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}

// const { height: cardHeight } = document
//   .querySelector('.gallery')

//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

// const imgMarkup = createGalleryImgMarkup(galleryItems);
// refs.galleryBox.insertAdjacentHTML('beforeend', imgMarkup);
