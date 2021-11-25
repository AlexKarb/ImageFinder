
import { refs } from "./refs";


export default function createMarkup(array) {

       const markup = array.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
      

           return `<div class="photo-card"><a href="${largeImageURL}" class="js">
      
            <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>${downloads}
                </p>
            </div>
        </div>`
        
    }).join("")
        
   refs.loadMoreBtn.classList.remove("is-hidden");

   return refs.gallery.insertAdjacentHTML("beforeend", markup);
    
}