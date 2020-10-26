import React from 'react';
import Select from './Select';
import Button from './Button';

function PaginationComponent({ pagination }) {
  return (
    <div key="pagination" className="pagination-wrapper">
      <div className="pagination-left">
        <Select rowsPerPage={ pagination.rowsPerPage } options={pagination.rowsPerPageArray} onSelect={ pagination.goSelect } />
        <small>Showing { pagination.dataFrom + 1 } to { pagination.dataTo } of { pagination.rowsCount } results</small>
      </div>

      <ul className="pagination pagination-sm">
        { pagination.currentPage > 1 &&
          <Button key="previous" currentPage={pagination.currentPage} onClick={pagination.goPrevious} text="Previous" /> }

        {
          pagination.generatePaginationNumbersRule().map(page => {
            switch (typeof page) {
              case 'number': return <Button key={ page } currentPage={ pagination.currentPage } page={ page } text={ page } onClick={pagination.goPage} />;
              case 'object': return page;
              case 'string': return <Button key="dots" disabled text="..." />;
              default: return null;
            }
          })
        }

        { pagination.currentPage < pagination.maxPage &&
          <Button key="next" currentPage={pagination.currentPage} onClick={pagination.goNext} text="Next" />
        }
      </ul>
    </div>
  )
}

export default PaginationComponent;
