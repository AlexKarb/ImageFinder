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

const dateOfResponse = new RESPONSE(refs.form, 'searchQuery');
const gallery = new Simplelightbox('.gallery .js');
ImageFinder(dateOfResponse);

refs.form.addEventListener('submit', formControl);

function formControl(e) {
  e.preventDefault();
  const form = e.currentTarget;

  refs.gallery.innerHTML = '';
  upBtn.deleteElenent();
  dateOfResponse.reset();
  refs.wellcomeEl.classList.add('visually-hidden');
  ImageFinder(dateOfResponse);
  form.reset();
}

export async function ImageFinder(dateOfResponse) {
  console.log('~ dateOfResponse', dateOfResponse);
  dateOfResponse.findValueOfSearch();

  await feachImg(dateOfResponse)
    .then(({ data, quantityOfResponses }) => {
      console.log('~ data', data);
      createMarkup(data);
      return Notify.success(`Hooray! We found ${quantityOfResponses} images.`);
    })
    .catch(error => {
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
