import React from "react";
import Select from "react-select";

const CustomSelect = ({ value = "", onChange, options, placeholder }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
    />
  );
};

export default CustomSelect;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    // padding: 20,
  }),

  singleValue: (provided, state) => {
    // const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided,  transition };
  }
}