export class RESPONSE {
  static RequestData = {
    BASE_URL: 'https://pixabay.com/api',
    KEY: 'key=24460991-e6b86f63e9df1bcb3be279c62',
    OPTIONS: 'image_type=photo&orientation=horizontal&safesearch=true',
    PER_PAGE: 40,
  };
  constructor(form, nameOfInput) {
    this.refsForm = form;
    this.htmlNameOfSearchInput = nameOfInput;
    this.valueOfSearch = '';
    this.data = [];
    this.quantityOfResponses = undefined;
    this.page = 1;
    this.perPage = RESPONSE.RequestData.PER_PAGE;
    this.endOfColection = false;
    this.root = `${RESPONSE.RequestData.BASE_URL}/?${RESPONSE.RequestData.KEY}&${RESPONSE.RequestData.OPTIONS}`;
    this.requestURL =
      this.root +
      `&q=${this.valueOfSearch || 'white+bear'}&page=${this.page}&per_page=${this.perPage}`;
  }
  controlEndOfColection() {
    this.endOfColection =
      Math.ceil(this.quantityOfResponses / this.perPage) === this.page ||
      Math.round(this.quantityOfResponses / this.perPage) === 0;
    return this.endOfColection;
  }
  findValueOfSearch() {
    if (this.refsForm || this.htmlNameOfSearchInput) {
      const userValue = this.refsForm.elements[this.htmlNameOfSearchInput].value;
      this.valueOfSearch = userValue.toLowerCase().split(' ').join('+');
      this.requestURL =
        this.root +
        `&q=${this.valueOfSearch || 'white+bear'}&page=${this.page}&per_page=${this.perPage}`;
    }
  }
  updateAllValues(obj = {}) {
    const receivedKeys = Object.keys(obj);
    const receivedValues = Object.values(obj);
    for (let key in this) {
      if (receivedKeys.includes(key)) {
        const index = receivedKeys.indexOf(key);
        this[key] = receivedValues[index];
      }
    }
  }
  updateRequestURL() {
    this.requestURL =
      this.root +
      `&q=${this.valueOfSearch || 'white+bear'}&page=${this.page + 1}&per_page=${this.perPage}`;
  }
  reset() {
    this.page = 1;
  }
}
