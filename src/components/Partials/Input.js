const Input = ({ name, label, value, error, onChange, placeholder }) => {
  return (
    <div className="form-group input">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control "
      />
      {error && <div className="alert alert-danger my-2">{error}</div>}
    </div>
  );
};

export default Input;
