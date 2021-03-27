import Input from '../Partials/Input'

const Searchbox = ({ value, onChange }) => {
  return (
    <Input
      name="query"
      value={value}
      type="text"
      placeholder="Search..."
      autoComplete="off"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Searchbox
