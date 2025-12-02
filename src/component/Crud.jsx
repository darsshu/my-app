import React, { useState } from 'react'

const Crud = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })
    const [dataList, setDataList] = useState([])
    const [editingIndex, setEditingIndex] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();

        const formObject = {
            name: formData.name,
            email: formData.email
        }

        if (isEditing) {
            setDataList(prevList =>
                prevList.map((item, index) =>
                    index === editingIndex ? formObject : item
                )
            )
            setIsEditing(false)
            setEditingIndex(null)
        } else {
            setDataList(prevList => [...prevList, formObject])
        }

        setFormData({
            name: '',
            email: ''
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleEdit = (index) => {
        setFormData(dataList[index])
        setEditingIndex(index)
        setIsEditing(true)
    }

    const handleDelete = (index) => {
        setDataList(prevList => prevList.filter((_, i) => i !== index))
    }

    const handleCancel = () => {
        setFormData({
            name: '',
            email: ''
        })
        setIsEditing(false)
        setEditingIndex(null)
    }

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        required
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        required
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <button type="submit">
                        {isEditing ? 'Update' : 'Submit'}
                    </button>
                    {isEditing && (
                        <button className='ps-5' type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            <div className='flex'>
                {dataList.length > 0 ? (
                    <div>
                        <div className='flex gap-20'>
                            <div style={{ fontWeight: 'bold' }}>Name</div>
                            <div style={{ fontWeight: 'bold' }}>Email</div>
                            <div style={{ fontWeight: 'bold' }}>Actions</div>
                        </div>

                        {dataList.map((item, index) => (
                            <div className='flex gap-20' key={index}>
                                <div>{item.name}</div>
                                <div>{item.email}</div>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => handleEdit(index)}
                                        style={{
                                            background: 'blue',
                                            color: 'white',
                                            padding: '5px 10px',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        style={{
                                            background: 'red',
                                            color: 'white',
                                            padding: '5px 10px',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </>
    )
}

export default Crud