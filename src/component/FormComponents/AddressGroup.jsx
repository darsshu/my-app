const AddressGroup = ({
    childComponents,
    addresses,
    onChange,
    errors
}) => {
    return (
        <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Address Details</h3>
                    <p className="text-gray-600 text-sm mt-1">Enter the outlet's address</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
            </div>

            {addresses.map((address, index) => (
                <div key={index} className="mb-6 p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {childComponents.map(child => {
                            const fieldError = errors[`Address_${index}_${child.name}`];
                            return (
                                <div key={child.name} className="mb-1">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        {child.name} {child.required === 1 && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type="text"
                                        value={address[child.name] || ''}
                                        onChange={(e) => onChange('Address', e.target.value, index, child.name)}
                                        placeholder={child.placeholder}
                                        required={child.required === 1}
                                        className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 transition-colors ${fieldError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            }`}
                                    />
                                    {fieldError && (
                                        <p className="text-red-500 text-xs italic mt-1">{fieldError}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AddressGroup;