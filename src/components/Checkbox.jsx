function Checkbox({value, checked, onChange}) {
  return (
      <div>
        <label htmlFor={value}>{value}</label>
        <input 
          type="checkbox" 
          name={value} 
          id={value}
          onChange={onChange}
          checked={checked}
        />
      </div>
    )
}

export default Checkbox;