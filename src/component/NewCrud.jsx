import React, { useState } from 'react'

const NewCrud = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'hello', email: 'first@gmail.com' }
    ]);

    const [form, setForm] = useState({ name: '', email: '' });
    const [editingId, setEditingId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setItems(items.map(item =>
                item.id === editingId
                    ? { ...item, ...form }
                    : item
            ));
        } else {
            const newItem = {
                id: Date.now(),
                ...form
            };
            setItems([...items, newItem]);
        }
        setForm({ name: '', email: '' });
        setEditingId(null);
    };

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px' }}>
            <h2>{editingId ? 'Edit Item' : 'Add Item'}</h2>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button type="submit" style={{ padding: '5px 15px' }}>
                    {editingId ? 'Update' : 'Create'}
                </button>
            </form>

            <h3> {items.length}</h3>
            {items.length === 0 ? (
                <p></p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {items.map(item => (
                        <li key={item.id} style={{
                            padding: '10px',
                            margin: '5px 0',
                            border: '1px solid #ccc',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <strong>{item.name}</strong> - {item.email}
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        setForm({ name: item.name, email: item.email });
                                        setEditingId(item.id);
                                    }}
                                    style={{ marginRight: '5px' }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    style={{ background: '#ff4444', color: 'white' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NewCrud