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
      result = [ 1 ];
      if(this.currentPage > 3) result.push('dots1')
      if(this.currentPage + 1 < this.maxPage) result.push(this.currentPage - 1, this.currentPage, this.currentPage + 1)
      if(this.currentPage >= this.maxPage - 2) result.push(this.maxPage - 4, this.maxPage - 3);
      result.push('dots2')
      result.push(this.maxPage - 2, this.maxPage - 1, this.maxPage)
    }

    // remove duplicates
    return result.filter((val, i, arr) => arr.slice(i + 1).indexOf(val) === -1).sort((a, b) => a - b);
  }

  recalculateData = () => {
    const newData = this.data.slice(this.dataFrom, this.dataTo);
    return this.callBack(newData.length ? newData : null);
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