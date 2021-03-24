const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group input">
      <label>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" disabled>
          Choose Category
        </option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger my-2">{error}</div>}
    </div>
  );
};

export default Select;
