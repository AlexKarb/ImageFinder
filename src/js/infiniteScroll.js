import InfiniteScroll from "infinite-scroll";



export function infScrollInstall(container, dateOfResponse) {
    
return  new InfiniteScroll(container, {

    path: function () {
        
        dateOfResponse.page = this.pageIndex;
        dateOfResponse.updateRequestURL();
        return `${dateOfResponse.requestURL}`;
    },
     responseBody: 'json',
     history: false,
})
};




export function infScrollLoader(dateOfResponse) {

    dateOfResponse.controlEndOfColection();
      
        if (dateOfResponse.endOfColection) {
            return Promise.reject();
        }
            return Promise.resolve(dateOfResponse.data);     
 }

