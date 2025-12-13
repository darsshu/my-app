import { useState, useEffect } from 'react';
import formSchema from '../input.json';
import TextInput from './FormComponents/TextInput';
import SelectInput from './FormComponents/SelectInput';
import RadioBoolean from './FormComponents/RadioBoolean';
import ContactGroup from './FormComponents/ContactGroup';
import AddressGroup from './FormComponents/AddressGroup';

const DynamicForm = () => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    // Initialize form data
    useEffect(() => {
        const initialData = {};
        formSchema.data.forEach(field => {
            if (field.default !== undefined) {
                if (Array.isArray(field.default)) {
                    initialData[field.name] = field.default[0] || '';
                } else if (typeof field.default === 'object' && field.default !== null) {
                    initialData[field.name] = { ...field.default };
                } else {
                    initialData[field.name] = field.default;
                }
            } else {
                if (field.component === 'group' && field.addMore) {
                    initialData[field.name] = [{}];
                } else if (field.component === 'radio_button_boolean') {
                    initialData[field.name] = field.options?.[0] === 'Yes' ? true : false;
                } else {
                    initialData[field.name] = '';
                }
            }
        });
        setFormData(initialData);
    }, []);

    // Check if field should be visible
    const checkVisibility = (field) => {
        if (!field.condition || Object.keys(field.condition).length === 0) {
            return true;
        }

        const { type, value, field_name } = field.condition;
        const dependentValue = formData[field_name];

        if (!dependentValue) return false;

        if (type === 'ANY') {
            return value.includes(dependentValue);
        }

        return true;
    };

    // Handle field changes
    const handleChange = (fieldName, value, groupIndex = null, subField = null) => {
        setErrors(prev => ({ ...prev, [fieldName]: undefined }));

        if (groupIndex !== null && subField) {
            // Handle group fields
            setFormData(prev => {
                const newData = { ...prev };
                if (!newData[fieldName]) newData[fieldName] = [];
                if (!newData[fieldName][groupIndex]) newData[fieldName][groupIndex] = {};

                const newGroup = [...newData[fieldName]];
                newGroup[groupIndex] = {
                    ...newGroup[groupIndex],
                    [subField]: value
                };

                return {
                    ...newData,
                    [fieldName]: newGroup
                };
            });
        } else {
            // Handle regular fields
            setFormData(prev => ({
                ...prev,
                [fieldName]: value
            }));
        }
    };

    // Add another contact
    const addContact = () => {
        setFormData(prev => ({
            ...prev,
            Contact: [...(prev.Contact || []), {}]
        }));
    };

    // Remove contact
    const removeContact = (index) => {
        setFormData(prev => ({
            ...prev,
            Contact: prev.Contact.filter((_, i) => i !== index)
        }));
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        formSchema.data.forEach(field => {
            if (!checkVisibility(field) || !field.required) return;

            const value = formData[field.name];

            if (field.component === 'group' && field.addMore) {
                // Validate groups (like Contact)
                const groups = value || [];
                if (groups.length === 0) {
                    newErrors[field.name] = `At least one ${field.name} is required`;
                    isValid = false;
                } else {
                    groups.forEach((group, index) => {
                        field.childComponents?.forEach(child => {
                            if (child.required && (!group[child.name] || group[child.name].trim() === '')) {
                                newErrors[`${field.name}_${index}_${child.name}`] = `${child.name} is required`;
                                isValid = false;
                            }
                        });
                    });
                }
            } else if (field.required === 1) {
                if (value === undefined || value === null || value === '' ||
                    (Array.isArray(value) && value.length === 0)) {
                    newErrors[field.name] = `${field.name} is required`;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Please fill all required fields');
            return;
        }

        // Process data to match output structure
        const processedData = {
            "Outlet type": formData["Outlet type"] || "",
            "Outlet Category": formData["Outlet Category"] || "",
            "assign_to": formData["assign_to"] ? [parseInt(formData["assign_to"]) || 1] : [1],
            "Name": formData["Name"] || "",
            "Gst number": formData["Gst number"] || "",
            "Pan number": formData["Pan number"] || "",
            "Years in business": parseFloat(formData["Years in business"]) || 0,
            "Primary product deal in": formData["Primary product deal in"] || "",
            "Existing brands deal with": formData["Existing brands deal with"] || "",
            "Monthly purchase volume of kaka brand": parseFloat(formData["Monthly purchase volume of kaka brand"]) || 0,
            "Monthly purchase volume of other brand": parseFloat(formData["Monthly purchase volume of other brand"]) || 0,
            "Has Own Showroom": formData["Has Own Showroom"] === true || formData["Has Own Showroom"] === "Yes",
            "status": "active"
        };

        // Process Contact data
        if (formData.Contact && Array.isArray(formData.Contact)) {
            processedData["Contact"] = formData.Contact.map(contact => ({
                "First Name": contact["first_name"] || "",
                "Last Name": contact["last_name"] || "",
                "Role": contact["role"] || "",
                "Mobile 1": contact["mobile_1"] || "",
                "Mobile 2": contact["mobile_2"] || "",
                "Email": contact["email"] || ""
            }));
        }

        // Process Address data
        if (formData.Address && Array.isArray(formData.Address)) {
            processedData["Address"] = formData.Address.map(address => ({
                "Address Line 1": address["address_line_1"] || "",
                "City": address["city"] || "",
                "State": address["state"] || "",
                "District": address["district"] || "",
                "Pincode": address["pincode"] || ""
            }));
        }

        console.log('Form Submission:', JSON.stringify(processedData, null, 2));

    };

    // Render field based on component type
    const renderField = (field) => {
        if (!checkVisibility(field)) return null;

        const commonProps = {
            name: field.name,
            value: formData[field.name] || '',
            onChange: handleChange,
            placeholder: field.placeholder,
            required: field.required === 1,
            options: field.options || [],
            error: errors[field.name]
        };

        switch (field.component) {
            case 'textbox_string':
            case 'textbox_mobile':
            case 'textbox_double':
                return (
                    <TextInput
                        key={field.name}
                        {...commonProps}
                        type={field.component === 'textbox_mobile' ? 'tel' : 'text'}
                    />
                );

            case 'single_select':
                return <SelectInput key={field.name} {...commonProps} />;

            case 'radio_button_boolean':
                return <RadioBoolean key={field.name} {...commonProps} />;

            case 'group':
                if (field.name === 'Contact') {
                    return (
                        <ContactGroup
                            key={field.name}
                            {...commonProps}
                            childComponents={field.childComponents}
                            contacts={formData.Contact || []}
                            onAddContact={addContact}
                            onRemoveContact={removeContact}
                            onChange={handleChange}
                            errors={errors}
                        />
                    );
                } else if (field.name === 'Address') {
                    return (
                        <AddressGroup
                            key={field.name}
                            {...commonProps}
                            childComponents={field.childComponents}
                            addresses={formData.Address || []}
                            onChange={handleChange}
                            errors={errors}
                        />
                    );
                }
                return null;

            case 'multi_select_db':
                return (
                    <div key={field.name} className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            {field.name} {field.required === 1 && '*'}
                        </label>
                        <select
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            required={field.required === 1}
                            className="shadow border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        >
                            <option value="">{field.placeholder}</option>
                            <option value="1">User 1</option>
                            <option value="2">User 2</option>
                            <option value="3">User 3</option>
                        </select>
                        {errors[field.name] && (
                            <p className="text-red-500 text-xs italic mt-1">{errors[field.name]}</p>
                        )}
                    </div>
                );

            case 'attachment_camera':
                return (
                    <div key={field.name} className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            {field.name} {field.required === 1 && '*'}
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Select Images
                            </button>
                            <p className="text-gray-500 text-sm mt-2">Upload outlet photos</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // Sort fields by sequence
    const sortedFields = [...formSchema.data].sort((a, b) => a.sequence - b.sequence);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                        <h1 className="text-2xl font-bold text-white">Tag an Outlet</h1>
                        <p className="text-blue-100 mt-1">Fill in the outlet details below</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {sortedFields.map(field => renderField(field))}

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-gray-200">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Submit
                                </button>

                            </div>
                        </form>
                    </div>
                </div>

                {/* Debug Info (Optional - remove in production) */}
                <div className="mt-8 p-4 bg-gray-800 rounded-lg text-gray-300 text-sm">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-mono">Output</span>
                        <button
                            onClick={() => console.log('Form Data:', formData)}
                            className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                        >
                            Log to Console
                        </button>
                    </div>
                    <pre className="text-xs overflow-auto max-h-40">
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default DynamicForm;