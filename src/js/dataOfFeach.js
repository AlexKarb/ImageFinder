export const dataOfFeachImg = {

    valueOfSearch: undefined,
    data: {},
    quantityOfResponses: undefined,
    page: 1,
    perPage: 40,
    endOfColection: false,


    controlEndOfColection() {
        this.endOfColection = (Math.ceil(this.quantityOfResponses / this.perPage) === this.page - 1 || Math.round(this.quantityOfResponses / this.perPage) === 0);
     },

     onValueOfSearch (form, nameOfInput) {
    const userValue = form.elements[nameOfInput].value;
     this.valueOfSearch = userValue.toLowerCase().split(' ').join('+');
    },
     
    changeAllValues(obj = {}) {
         const receivedKeys = Object.keys(obj);
         const receivedValues = Object.values(obj);

        for (let key in this) {
            if (receivedKeys.includes(key)) {
                const index = receivedKeys.indexOf(key);
                this[key] = receivedValues[index];
            }
        }
     },
}