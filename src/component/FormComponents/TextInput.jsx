const TextInput = ({
    name,
    value,
    onChange,
    placeholder,
    required,
    type = 'text',
    error
}) => {
    return (
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
                {name} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={placeholder}
                required={required}
                className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-colors ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
            />
            {error && (
                <p className="text-red-500 text-xs italic mt-1">{error}</p>
            )}
        </div>
    );
};

export default TextInput;