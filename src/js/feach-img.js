import axios from "axios";
import { dataOfFeachImg } from "./dataOfFeach"

// axios.defaults.baseURL = 'https://pixabay.com/api'
const BASE_URL = 'https://pixabay.com/api'
const KEY = 'key=24460991-e6b86f63e9df1bcb3be279c62';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true'
const PER_PAGE = 40;



export default async function feachImg(form, nameOfInput) {

    if (form || nameOfInput) {
    dataOfFeachImg.onValueOfSearch(form, nameOfInput);
    };

    let { valueOfSearch, page, quantityOfResponses, data, perPage } = dataOfFeachImg;


    try {
        const feach = await axios.get(`${BASE_URL}/?${KEY}&${OPTIONS}&q=${valueOfSearch}&page=${page}&per_page=${PER_PAGE}`);
        const response = await feach.data;
        
        data = await response.hits;
        quantityOfResponses = await response.totalHits;
        page += 1;
        perPage = PER_PAGE;


        dataOfFeachImg.changeAllValues({ valueOfSearch, page, quantityOfResponses, data, perPage })
        dataOfFeachImg.controlEndOfColection();
        
        return dataOfFeachImg;
            
       
    } catch (error) {
        console.log("~ error", error)
    }
        

}

   
 