import React from "react";

const SelectInput = ({
    className = "",
    options = [],
    value,
    onChange,
    ...props
}) => {
    return (
        <select
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${className}`}
            value={value}
            onChange={onChange}
            {...props}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default SelectInput;
