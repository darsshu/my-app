import React, { useState } from 'react'

const BestCrud = () => {
    const [users, setUsers] = useState([])

    const addUser = () => {
        const updatedUsers = [...users, { name: '', email: '' }]
        setUsers(updatedUsers)
    }
    const removeUser = (index) => {
        const updatedUsers = [...users]
        updatedUsers.splice(index, 1)
        setUsers(updatedUsers)

    }
    const updateUser = (index, key, value) => {
        const updatedUsers = [...users]
        const modifiedUser = updatedUsers[index]
        modifiedUser[key] = value
        updatedUsers[index] = modifiedUser
        setUsers(updatedUsers)

    }
    return (
        <>
            <div>BestCrud</div>
            {users.map((user, index) => {
                return <div className='flex'>
                    <input className='border' value={user.name} onChange={(e) => updateUser(index, 'name', e.currentTarget.value)} />
                    <input className='border' value={user.email} onChange={(e) => updateUser(index, 'email', e.currentTarget.value)} />
                    <button className='border' onClick={() => removeUser(index)}>Remove</button>
                </div>
            })}
            <button onClick={() => addUser()}>Add</button>
        </>
    )
}

export default BestCrud