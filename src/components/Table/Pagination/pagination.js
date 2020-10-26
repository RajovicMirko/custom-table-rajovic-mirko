import PaginationComponent from './';

class Pagination{
  constructor({ currentPage = 1, rowsPerPage = 10, rowsPerPageArray = [ 3, 5, 10, 20, 50, 100], data, callBack }){
    this.currentPage = currentPage;
    this.rowsPerPage = rowsPerPage;
    this.rowsPerPageArray = rowsPerPageArray;
    this.callBack = callBack;
    this.data = data;
  }

  init(){
    this.recalculateData();
  }

  get rowsCount(){
    return this.data ? this.data.length : 0;
  }

  get dataTo(){
    return this.currentPage * this.rowsPerPage;
  }

  get dataFrom(){
    return this.dataTo - this.rowsPerPage;
  }

  get maxPage(){
    return Math.ceil(this.rowsCount / this.rowsPerPage);
  }
  
  generatePaginationNumbersRule = () => {
    let result = [];

    if(this.maxPage <= 5){
      // MAX FIVE NUMBERS
      result = Array.from({length: this.maxPage}, (val, i) => i + 1);
    } else {
      // MORE THEN FIVE NUMBERS
      // NUMBERS BEFORE DOTS
      if(this.currentPage > 2 && this.currentPage < this.maxPage - 1) result.push(1);
      // if on pre dots digit
      if(this.currentPage < this.maxPage - 2) result.push(this.currentPage - 1 > 0 ? this.currentPage - 1 : null, this.currentPage, this.currentPage + 1)
      if(this.currentPage === this.maxPage - 2) result.push(this.currentPage - 2, this.currentPage - 1, this.currentPage)
      // if on last two digits
      if(this.currentPage === this.maxPage - 1) result.push(1, 2, this.currentPage - 1);
      if(this.currentPage === this.maxPage) result.push(1, 2, this.currentPage - 2);
      
      // DOTS
      result.push('dots');
      // NUMBERS AFTER DOTS
      result.push(this.maxPage - 1, this.maxPage);
    }
    
    return result;
  }

  recalculateData = () => {
    return this.callBack(this.data.slice(this.dataFrom, this.dataTo));
  }

  changeData = (data) => {
    this.data = data;
    this.currentPage = 1;
    this.recalculateData();
  }

  goSelect = (e) => {
    this.rowsPerPage = Number(e.target.value);
    this.currentPage = 1;
    this.recalculateData();
  }

  goPrevious = () => {
    this.currentPage -= 1;
    this.recalculateData();
  }

  goNext = () => {
    this.currentPage += 1;
    this.recalculateData();
  }

  goPage = (page) => {
    this.currentPage = page;
    this.recalculateData();
  }

  component = () => {
    return <PaginationComponent pagination={this} />
  }

}

export default Pagination;