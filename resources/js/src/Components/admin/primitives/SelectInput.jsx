import React, { useEffect } from "react";
import Select from "react-select";

const SelectInput = ({ className = "", options, isMulti, value, ...props }) => {
    const [selectValue, setSelectValue] = React.useState(null);

    useEffect(() => {
        if (value && options) {
            const selectValue = options.filter((option) => {
                if (isMulti) {
                    return value.includes(option.value);
                }
                return option.value === value;
            });
            setSelectValue(selectValue);
        }
    }, [value, isMulti, options]);

    return (
        <Select
            options={options}
            value={selectValue}
            isMulti={isMulti}
            className={`react-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${className}`}
            {...props}
        />
    );
};

export default SelectInput;
