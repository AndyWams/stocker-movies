const FilterList = ({ items, valueProperty, textProperty, onItemSelect }) => {
  return (
    <div className="list-group">
      {items.map((item) => (
        <button
          key={item[valueProperty]}
          type="button"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  );
};

export default FilterList;
