const sortText = (sortAsc, valA, valB) => {
  if (valA < valB) return sortAsc ? -1 : 1;
  if (valA > valB) return sortAsc ? 1 : -1;
  return 0;
};

const sortNumbersBooleans = (sortAsc, valA, valB) => {
  return sortAsc ? valA - valB : valB - valA;
};

export function sortTableByColumn(key, sortConfig, data, callBack = null) {
  const newData = Object.assign([], data);

  const newSortConfig = {
    sortAsc: sortConfig.lastKey === key ? !sortConfig.sortAsc : true,
    lastKey: key,
  };

  // sort newData array
  const { sortAsc } = newSortConfig;
  newData.sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    const tryParseValue = Number(valA);

    return isNaN(tryParseValue)
      ? sortText(sortAsc, valA, valB)
      : sortNumbersBooleans(sortAsc, valA, valB);
  });

  // callback to update state
  if (callBack) callBack(newSortConfig, newData);
}
