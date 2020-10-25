import React from 'react';
import Select from './Select';

function Pagination(props) {
  const { currentPage = 1, rowsPerPage = 2000, onPagination, data } = props;
  const rowsCount = data ? data.length : 0;
  let showingFrom = 0;
  let showingTo = 0;
  let maxPage = 0;

  const calculateRange = (page = currentPage, perPage = rowsPerPage) => {
    const limit = rowsCount > perPage ? perPage : rowsCount;
    maxPage = Math.ceil(rowsCount / perPage);

    showingTo = page * limit;
    showingTo = showingTo > rowsCount ? rowsCount : showingTo;

    if(maxPage === page && page !== 1){
      const endDiff = showingTo % limit;
      showingFrom = showingTo - (endDiff === 0 ? limit : endDiff);
    } else {
      showingFrom = showingTo - limit;
    }
  }
  
  calculateRange();

  const getFilterBody = () => data.slice(showingFrom, showingTo);
  
  const handleSelectRowsPerPage = (e) => {
    const value = Number(e.target.value);
    calculateRange(1, value);

    const result = {
      currentPage: 1,
      rowsPerPage: value,
      filteredBody: getFilterBody()
    }

    onPagination(result);
  }

  const handleClickPaginationPrevious = () => {
    const page = currentPage - 1;
    calculateRange(page);

    const result = {
      currentPage: page,
      rowsPerPage: rowsPerPage,
      filteredBody: getFilterBody()
    }
    onPagination(result);
  }

  const handleClickPaginationNumbers = (page) => {
    calculateRange(page);

    const result = {
      currentPage: page,
      rowsPerPage: rowsPerPage,
      filteredBody: getFilterBody()
    }
    onPagination(result);
  }

  const handleClickPaginationNext = () => {
    const page = currentPage + 1;
    calculateRange(page);

    const result = {
      currentPage: page,
      rowsPerPage: rowsPerPage,
      filteredBody: getFilterBody()
    }
    onPagination(result);
  }

  const previousBtn = (
    currentPage > 1 &&
    <li key="previous" className={`page-item d-flex`} onClick={ handleClickPaginationPrevious }>
      <span className="page-link">Previous</span>
    </li>
  )

  const nextBtn = (
    currentPage < maxPage &&
    <li key="next" className={`page-item`} onClick={ handleClickPaginationNext } >
      <span className="page-link">Next</span>
    </li>
  )

  const number = (page) => {
    return (
      <li
        key={ page }
        className={`page-item ${currentPage === page ? 'active' : ''}`}
        onClick={ () => handleClickPaginationNumbers(page) }
      >
        <span className="page-link">{ page }</span>
      </li>
    )
  }
  
  const dots = <li key="dots" className="page-item disabled"><span className="page-link">...</span></li>;

  const generatePaginationNumbersRule = () => {
    let result = [];

    if(maxPage < 6){
      result = Array.from({length: maxPage}, (val, i) => i + 1);
    } else {
      // NUMBERS BEFORE DOTS
      if(currentPage > 2 && currentPage < maxPage - 1) result.push(1);
      // if on pre dots digit
      if(currentPage < maxPage - 2) result.push(currentPage - 1, currentPage, currentPage + 1)
      if(currentPage === maxPage - 2) result.push(currentPage - 2, currentPage - 1, currentPage)
      // if on last two digits
      if(currentPage === maxPage - 1) result.push(1, 2, currentPage - 1);
      if(currentPage === maxPage) result.push(1, 2, currentPage - 2);
      
      // DOTS
      result.push(dots);
      // NUMBERS AFTER DOTS
      result.push(maxPage - 1, maxPage);
    }
    
    return result;
  }
  
  return (
    <div className="pagination-wrapper">
      <div className="pagination-left">
        <Select rowsPerPage={ rowsPerPage } onSelect={ handleSelectRowsPerPage } />
        <small>Showing { showingFrom + 1 } to { showingTo } of { rowsCount } results</small>
      </div>

      <ul className="pagination pagination-sm">
        { previousBtn }
        { generatePaginationNumbersRule().map(item => {
          if(item === 0) return null;
          if(typeof item === 'number') return number(item);
          return item;
        }) }
        { nextBtn }
      </ul>
    </div>
  )
}

export default Pagination
