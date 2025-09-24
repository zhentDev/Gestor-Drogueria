import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';

const SelectAny: any = Select;

interface Option {
    value: string;
    label: string;
}

interface SingleSelectProps {
    options: Option[];
    defaultValue?: Option;
    isClearable?: boolean;
    isSearchable?: boolean;
    isLoading?: boolean;
    name: string;
    placeholder?: string;
    onChange: (selectedOption: Option | null) => void;
}

const animatedComponents = makeAnimated();

const minimalistStyles: StylesConfig<Option> = {
    control: (styles) => ({
        ...styles,
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        minHeight: 'auto',
        padding: '0',
        margin: '0',
        cursor: 'pointer',
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        backgroundColor: isSelected ? '#E2E8F0' : isFocused ? '#F1F5F9' : 'white',
        color: '#1A202C',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ':active': {
            ...styles[':active'],
            backgroundColor: isSelected ? '#E2E8F0' : '#CBD5E0',
        },
    }),
    input: (styles) => ({ ...styles, margin: '0', padding: '0', color: 'transparent' }),
    placeholder: (styles) => ({ ...styles, color: '#A0AEC0' }),
    singleValue: (styles) => ({ ...styles, color: '#1A202C' }),
    container: (styles) => ({ ...styles, padding: '2px' }),
    valueContainer: (styles) => ({ ...styles, padding: '0 8px' }),
    indicatorsContainer: (styles) => ({ ...styles, padding: '0' }),
    dropdownIndicator: (styles) => ({ ...styles, padding: '0 4px 0 0' }),
    clearIndicator: (styles) => ({ ...styles, padding: '0 4px 0 0' }),
};


export const SingleSelect = ({
    options,
    defaultValue,
    isLoading = false,
    name,
    placeholder,
    onChange
}: SingleSelectProps) => {

    return (
        <div className="border-b-2 border-black w-full h-fit pb-1">
            <SelectAny
                className="basic-single"
                classNamePrefix="select"
                defaultValue={defaultValue}
                isClearable={true}
                isSearchable={true}
                isLoading={isLoading}
                name={name}
                options={options}
                onChange={onChange}
                placeholder={placeholder}
                closeMenuOnSelect={true}
                components={animatedComponents}
                styles={minimalistStyles}
            />
        </div>
    );
};

export default SingleSelect