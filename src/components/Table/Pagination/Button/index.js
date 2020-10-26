import React from 'react';

const generateClass = (obj) => {
  return Object.keys(obj).map(key => obj[key] ? key : '' ).join(' ');
  
}

function PaginationButton({ currentPage, page, disabled = false, text, onClick = null}) {
  const liClass = generateClass({
    'page-item': true,
    'disabled': disabled,
    'active': currentPage === page
  })

  if(typeof text === 'number' && !page) return null;

  return (
    <div>
      <li
        className={liClass}
        onClick={ () => { if(onClick) onClick(page) } }
      >
        <span className="page-link">{ text }</span>
      </li>
    </div>
  )
}

export default PaginationButton;
