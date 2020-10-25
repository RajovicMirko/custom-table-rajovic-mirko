import React from 'react';

function Header({ headers, onClick }) {
  return (
    <tr>
      { headers.map((columnTitle, i) => {
        return (
          <th key={i} onClick={ () => onClick(i) } >{ columnTitle }</th>
        )
      }) }
    </tr>
  )
}

export default Header
