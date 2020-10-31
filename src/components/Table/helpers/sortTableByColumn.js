export function sortTableByColumn(key, sortConfig, data) {
  const newData = Object.assign([], data);

  const newSortConfig = {
    sortAsc: sortConfig.lastKey === key ? !sortConfig.sortAsc : false,
    lastKey: key,
  };

  const { sortAsc } = newSortConfig;
  newData.sort((a, b) => {
    if (a[key] < b[key]) return sortAsc ? -1 : 1;
    if (a[key] > b[key]) return sortAsc ? 1 : -1;
    return 0;
  });

  return { newSortConfig, newData };
}
