function Checkbox({value, checked, onChange}) {
  return (
      <div className='checkboxContainer'>
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