import { Notify } from 'notiflix';
import Simplelightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createMarkup from './create-markup-of-galery';
import { refs } from './refs';
import feachImg from './feach-img';
import smoothPageScrolling from './Smooth-page-scrolling';
import { RESPONSE } from './RESPONSE';
import { infScrollInstall } from './infiniteScroll';
import { upBtn } from './сreateUpBtn';
import { lisnerPhotoLikes } from './likeClick';
const dateOfResponse = new RESPONSE(refs.form, 'searchQuery');
const gallery = new Simplelightbox('.gallery .js', { disableScroll: true });
gallery.on('shown.simplelightbox', function () {
  document.body.style.overflow = 'hidden';
});
gallery.on('close.simplelightbox', function () {
  document.body.style.overflow = 'auto';
});
ImageFinder(dateOfResponse);
refs.form.addEventListener('submit', formControl);

function formControl(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const btn_submit = document.querySelector('.search-form__btn');
  var data = new FormData(this);
  if (!data.get('searchQuery')) return;
  if (btn_submit.classList.contains('pulse')) btn_submit.classList.remove('pulse');
  refs.gallery.innerHTML = '';
  upBtn.deleteElement();
  dateOfResponse.reset();
  refs.wellcomeEl.classList.add('visually-hidden');
  ImageFinder(dateOfResponse);
  form.reset();
}
export async function ImageFinder(dateOfResponse) {
  dateOfResponse.findValueOfSearch();
  await feachImg(dateOfResponse)
    .then(({ data, quantityOfResponses }) => {
      createMarkup(data);
      lisnerPhotoLikes();
      return Notify.success(`Hooray! We found ${quantityOfResponses} images.`, {
        distance: '40px',
        showOnlyTheLastOne: true,
      });
    })
    .catch(error => {
      console.log('~ error', error);
      if (refs.wellcomeEl.classList.contains('visually-hidden'))
        refs.wellcomeEl.classList.remove('visually-hidden');
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    });
  gallery.refresh();
  const infScroll = infScrollInstall(refs.gallery, dateOfResponse);
  infScroll.on('load', async function (body) {
    dateOfResponse.data = await body.hits;
    createMarkup(dateOfResponse.data);
    smoothPageScrolling(refs.gallery);
    upBtn.createElement();
    gallery.refresh();
    dateOfResponse.controlEndOfColection();
    if (dateOfResponse.endOfColection) {
      infScroll.destroy();
      return Notify.failure("We're sorry, but you've reached the end of search results.");
    }
  });
}
document.getElementById('try_btn').onclick = function () {
  const form = document.getElementById('search-form__input');
  const btn = document.querySelector('.search-form__btn');
  form.focus();
  btn.classList.add('pulse');
  setTimeout(() => {
    if (btn.classList.contains('pulse')) btn.classList.remove('pulse');
  }, 5000);
};
