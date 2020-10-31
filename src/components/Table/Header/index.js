import React from "react";

function Header({ headers, sortConfig, onClick }) {
  const { lastKey, sortAsc } = sortConfig;

  return (
    <tr>
      {Object.keys(headers).map((key, i) => {
        return (
          <th key={i} id={key} onClick={() => onClick(key)} className="p-0 m-0">
            <div className="d-flex align-items-center py-1">
              <span className="mr-1">{headers[key]}</span>
              <div
                className={`arrows ${
                  (!lastKey || lastKey !== key) && "hidden"
                }`}
              >
                <i
                  className={`${
                    sortAsc
                      ? "fas fa-long-arrow-alt-up"
                      : "fas fa-long-arrow-alt-down"
                  }`}
                ></i>
              </div>
            </div>
          </th>
        );
      })}
    </tr>
  );
}

export default Header;
