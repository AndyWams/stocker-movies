const FilterList = ({ items, selectedItem, textProperty, onItemSelect }) => {
  return (
    <div className="list-group">
      <div>
        {items.map((item) => (
          <button
            key={item[textProperty]}
            type="button"
            className={
              item === selectedItem
                ? "list-group-item list-group-item-action active"
                : "list-group-item list-group-item-action"
            }
            aria-current="true"
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </button>
        ))}
      </div>
    </div>
  );
};

FilterList.defaultProps = {
  textProperty: "name",
  valueProperty: "id",
};

export default FilterList;
