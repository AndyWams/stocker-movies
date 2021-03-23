import "./Button.scss";
const Button = ({ btntext, bgcolor, onClick, disabled }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={bgcolor}>
      {btntext}
    </button>
  );
};

export default Button;
