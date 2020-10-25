import React from 'react';

function Header({ data, onClick }) {
  return (
    <tr>
      { data.map((columnTitle, i) => {
        return (
          <th key={i} onClick={ () => onClick(i) } >{ columnTitle }</th>
        )
      }) }
    </tr>
  )
}

export default Header
