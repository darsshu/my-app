const SelectInput = ({
    name,
    value,
    onChange,
    placeholder,
    required,
    options = [],
    error
}) => {
    return (
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
                {name} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                required={required}
                className={`shadow border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-colors ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-red-500 text-xs italic mt-1">{error}</p>
            )}
        </div>
    );
};

export default SelectInput;