const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    const sortcolumn = { ...sortColumn };
    if (sortcolumn.path === path) {
      sortcolumn.order = sortcolumn.order === "asc" ? "desc" : "asc";
    } else {
      sortcolumn.path = path;
      sortcolumn.order = "asc";
    }
    onSort(sortcolumn);
  };
  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) {
      return null;
    }
    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc"></i>;
    }
    return <i className="fa fa-sort-desc"></i>;
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <th
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
            >
              {column.label}
              {renderSortIcon(column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
