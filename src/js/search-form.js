import axios from "axios";
import { Notify } from "notiflix";


const refs = {
    form: document.querySelector(".search-form"),
    input: document.querySelector(".search-form__input"),
    bnt: document.querySelector(".search-form__btn"),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const KEY = 'key=24460991-e6b86f63e9df1bcb3be279c62';
const BASE_URL = 'https://pixabay.com/api'
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true'
const PER_PAGE = 40;


let page = 1;
let valueOfSearch = null;


refs.form.addEventListener("submit", (e) => {
    e.preventDefault();
     refs.loadMoreBtn.classList.add("is-hidden");
    refs.gallery.innerHTML = "";

    const userValue = e.currentTarget.elements.searchQuery.value;

    valueOfSearch = userValue.toLowerCase().split(' ').join('+');
   

    
feachImg()

          
    
    e.currentTarget.reset();
    page = 1;
  
})




refs.loadMoreBtn.addEventListener('click', () => {
    feachImg();

})


// data - hits [{значения }]

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - коли



    async function feachImg() {
         
        const feach = await axios.get(`${BASE_URL}/?${KEY}&q=${valueOfSearch}&${OPTIONS}&page=${page}&per_page=${PER_PAGE}`);
        const response = feach.data;
        const data =  await response.hits;



        

  if (response.total === 0) {
    return  Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      
        };

        createMarkup(data)
        refs.loadMoreBtn.classList.remove("is-hidden");



        page += 1;
        console.log("~ PAGE", page)
       

    }
    




function createMarkup(array) {

       const markup = array.map(({webformatURL, tags, likes, views, comments, downloads}) => {

      return `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
     
   return refs.gallery.insertAdjacentHTML("beforeend", markup);
    
}