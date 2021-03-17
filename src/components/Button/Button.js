import "./Button.scss";
const Button = ({ btntext, bgcolor, onClick }) => {
  return (
    <button onClick={onClick} className={bgcolor}>
      {btntext}
    </button>
  );
};

export default Button;
