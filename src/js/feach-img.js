import axios from "axios";



export default async function feachImg(dataOfRequest) {

    let { quantityOfResponses, data, requestURL } = dataOfRequest;
 
    
        try {
        const feach = await axios.get(requestURL);
        const response = await feach.data;
        
        data = await response.hits;
        quantityOfResponses = await response.totalHits;
  
        dataOfRequest.updateAllValues({ quantityOfResponses, data })
        dataOfRequest.controlEndOfColection();
       
        } catch (error) {
            console.log("~ error", error)
    }
    
    if (quantityOfResponses === 0) {
    return Promise.reject();
}
    return Promise.resolve(dataOfRequest)
        
    }

   
 