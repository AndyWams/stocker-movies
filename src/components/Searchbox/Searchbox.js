import Input from "../Partials/Input";

const Searchbox = ({ value, onChange }) => {
  return (
    <Input
      name="query"
      value={value}
      placeholder="Search..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Searchbox;
