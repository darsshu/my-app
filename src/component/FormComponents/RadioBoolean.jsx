const RadioBoolean = ({
    name,
    value,
    onChange,
    placeholder,
    required,
    options = ['Yes', 'No'],
    error
}) => {
    const handleChange = (optionValue) => {
        onChange(name, optionValue === 'Yes');
    };

    return (
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
                {name} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex space-x-6 mt-2">
                {options.map(option => (
                    <label
                        key={option}
                        className="inline-flex items-center cursor-pointer"
                    >
                        <input
                            type="radio"
                            name={name}
                            checked={value === (option === 'Yes')}
                            onChange={() => handleChange(option)}
                            className="form-radio h-5 w-5 text-blue-600 transition-colors"
                        />
                        <span className="ml-3 text-gray-700 font-medium">{option}</span>
                    </label>
                ))}
            </div>
            {error && (
                <p className="text-red-500 text-xs italic mt-1">{error}</p>
            )}
        </div>
    );
};

export default RadioBoolean;