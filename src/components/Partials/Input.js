const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group input">
      <label>{label}</label>
      <input {...rest} name={name} />
      {error && <div className="alert alert-danger my-2">{error}</div>}
    </div>
  )
}

export default Input
