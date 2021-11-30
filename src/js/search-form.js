import { Notify } from "notiflix";
import Simplelightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import createMarkup from "./create-markup-of-galery";
import { refs } from "./refs";
import feachImg from "./feach-img";
import smoothPageScrolling from "./Smooth-page-scrolling";
import { RESPONSE } from "./RESPONSE";
import { infScrollInstall, infScrollLoader } from './infiniteScroll';


const dateOfResponse = new RESPONSE(refs.form, 'searchQuery');
const gallery = new Simplelightbox('.gallery .js');

 
    


refs.form.addEventListener("submit", async (e) => {


    e.preventDefault();
    const form = e.currentTarget;
    
      
    refs.gallery.innerHTML = "";
    dateOfResponse.reset();
    dateOfResponse.findValueOfSearch();

    await feachImg(dateOfResponse).then(({ data, quantityOfResponses }) => {

        createMarkup(data);
        return Notify.success(`Hooray! We found ${quantityOfResponses} images.`);

    }).catch(error => {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    });
    form.reset();
    gallery.refresh();
    

    


    const infScroll = infScrollInstall(refs.gallery, dateOfResponse);
    infScroll.on('load', async function (body) {

        dateOfResponse.data = await body.hits;
        infScrollLoader(dateOfResponse)
            .then(data => {
                createMarkup(data);
                smoothPageScrolling(refs.gallery);
                gallery.refresh();
            })
            .catch(error => {
                infScroll.destroy();
                return Notify.failure("We're sorry, but you've reached the end of search results.");
            });   
    });
});

