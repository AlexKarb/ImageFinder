import { Notify } from "notiflix";
import Simplelightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
// import InfiniteScroll from "infinite-scroll"
import createMarkup from "./create-markup-of-galery";
import { refs } from "./refs"
import feachImg from "./feach-img"
import smoothPageScrolling from "./Smooth-page-scrolling";
import {dataOfFeachImg} from "./dataOfFeach"

const gallery = new Simplelightbox('.gallery .js');



refs.form.addEventListener("submit", async (e) => {

    const currentTarget = e.currentTarget;
    e.preventDefault();
    refs.loadMoreBtn.classList.add("is-hidden");
    refs.gallery.innerHTML = "";
    dataOfFeachImg.page = 1;

    
    await feachImg(currentTarget, 'searchQuery');
    currentTarget.reset();

    if (dataOfFeachImg.quantityOfResponses === 0) { 
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } 
        
    await createMarkup(dataOfFeachImg.data);
    Notify.success(`Hooray! We found ${dataOfFeachImg.quantityOfResponses} images.`);
    gallery.refresh();


    });



refs.loadMoreBtn.addEventListener('click',  async() => {
   
    if (dataOfFeachImg.endOfColection) {
        refs.loadMoreBtn.classList.add("is-hidden");
        return  Notify.failure("We're sorry, but you've reached the end of search results.");
    }
            
    await feachImg()
    createMarkup(dataOfFeachImg.data);
    gallery.refresh();

    smoothPageScrolling(refs.gallery)

})
  