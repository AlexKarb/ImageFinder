import { refs } from './refs';

export default function createMarkup(array) {
  if (array) {
    const markup = array.map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        const div = document.createElement('div');
        div.classList.add('photo-card');
        div.innerHTML = `<span  class="photo-card__like" >&#9829;</span>
        <a href="${largeImageURL}" class="js">
          <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    <span  id='likes'>${likes}</span>
                </p>
                <p class="info-item">
                    <b>Views</b>
                    <span>${views}</span>
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    <span>${comments}</span>
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    <span>${downloads}</span>
                </p>
            </div>`;

        return div;
      },
    );

    refs.gallery.append(...markup);
  }
}
