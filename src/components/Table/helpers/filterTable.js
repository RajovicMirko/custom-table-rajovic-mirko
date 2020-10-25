export function filterTable(tableData, filterValue) {
  const filteredData = tableData.filter(row => {
    return Object.keys(row).find(
      key => row[key].toString().toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
    )
  })

  return filteredData;
}