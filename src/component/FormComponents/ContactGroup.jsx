const ContactGroup = ({
    childComponents,
    contacts,
    onAddContact,
    onRemoveContact,
    onChange,
    errors
}) => {
    return (
        <div className="mb-8 p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Contact Details</h3>
                    <p className="text-gray-600 text-sm mt-1">Add one or more contact persons</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {contacts.length} Contact{contacts.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {contacts.map((contact, index) => (
                <div key={index} className="mb-6 p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-100">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-bold">{index + 1}</span>
                            </div>
                            <h4 className="ml-3 font-semibold text-gray-800">Contact {index + 1}</h4>
                        </div>
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => onRemoveContact(index)}
                                className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center transition-colors"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Remove
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {childComponents.map(child => {
                            const fieldError = errors[`Contact_${index}_${child.name}`];
                            return (
                                <div key={child.name} className="mb-1">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        {child.name} {child.required === 1 && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type={child.component === 'textbox_mobile' ? 'tel' : 'text'}
                                        value={contact[child.name] || ''}
                                        onChange={(e) => onChange('Contact', e.target.value, index, child.name)}
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

            <button
                type="button"
                onClick={onAddContact}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center w-full py-3 border border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Another Contact
            </button>
        </div>
    );
};

export default ContactGroup;