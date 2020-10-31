import React from "react";

function Header({ headers, onClick }) {
  return (
    <tr>
      {Object.keys(headers).map((key, i) => {
        return (
          <th key={i} id={key} onClick={() => onClick(key)}>
            {headers[key]}
          </th>
        );
      })}
    </tr>
  );
}

export default Header;
