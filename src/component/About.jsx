import React, { useState, useEffect } from 'react'

const About = () => {
    const [items, setItems] = useState([])
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        age: ''
    })
    const [isEditing, setIsEditing] = useState(false)

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedItems = localStorage.getItem('crudItems')
        if (savedItems) {
            setItems(JSON.parse(savedItems))
        }
    }, [])

    // Save to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('crudItems', JSON.stringify(items))
    }, [items])

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // CREATE - Add new item
    const handleAdd = (e) => {
        e.preventDefault()

        if (!formData.name || !formData.email) {
            alert('Please fill in all required fields')
            return
        }

        const newItem = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            age: formData.age || 'N/A'
        }

        setItems(prev => [...prev, newItem])
        resetForm()
    }

    // READ - Get item by ID (helper function)
    const getItemById = (id) => {
        return items.find(item => item.id === id)
    }

    // UPDATE - Set form data for editing
    const handleEdit = (id) => {
        const itemToEdit = getItemById(id)
        if (itemToEdit) {
            setFormData(itemToEdit)
            setIsEditing(true)
        }
    }

    // UPDATE - Save edited item
    const handleUpdate = (e) => {
        e.preventDefault()

        if (!formData.name || !formData.email) {
            alert('Please fill in all required fields')
            return
        }

        setItems(prev =>
            prev.map(item =>
                item.id === formData.id
                    ? { ...formData, age: formData.age || 'N/A' }
                    : item
            )
        )

        resetForm()
    }

    // DELETE - Remove item
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setItems(prev => prev.filter(item => item.id !== id))
        }
    }

    // Reset form
    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            email: '',
            age: ''
        })
        setIsEditing(false)
    }

    // Cancel editing
    const handleCancel = () => {
        resetForm()
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

            {/* CRUD Form */}
            <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h2>{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
                <form onSubmit={isEditing ? handleUpdate : handleAdd}>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name *"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email *"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px',
                                marginRight: '10px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            {isEditing ? 'Update' : 'Add'} Item
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#6c757d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Items List */}
            <div>
                {items.length === 0 ? (
                    <p></p>
                ) : (
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {items.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    padding: '15px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                                    <p style={{ margin: '2px 0', color: '#666' }}>Email: {item.email}</p>
                                    <p style={{ margin: '2px 0', color: '#666' }}>Age: {item.age}</p>
                                    <small style={{ color: '#999' }}>ID: {item.id}</small>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        style={{
                                            padding: '5px 10px',
                                            marginRight: '10px',
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


        </div>
    )
}

export default About