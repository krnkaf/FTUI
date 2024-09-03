import React, { useEffect, useState } from 'react';
import { CButton, CFormSelect, CFormTextarea } from '@coreui/react';
import { GetToken, GetURL } from '../../library/API';

const SupportVisible = () => {
    const [userTypes, setUserTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user types
                const typesResponse = await fetch(GetURL("/backend/Users/LoadBaseData"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const typesData = await typesResponse.json();
                if (typesData.data && typesData.data.user_type) {
                    setUserTypes(typesData.data.user_type);
                }

                // Fetch users
                const usersResponse = await fetch(GetURL("/backend/Users/GetAllList"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const usersData = await usersResponse.json();
                if (usersData.data && usersData.data.list) {
                    setUsers(usersData.data.list);
                    setFilteredUsers(usersData.data.list); // Initialize with all users
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        fetchData();
    }, []);

    const handleTypeChange = (e) => {
        const typeId = e.target.value;
        setSelectedType(typeId);
        // Filter users based on selected user type
        const filtered = users.filter(user => user.user_type_id.toString() === typeId);
        setFilteredUsers(filtered);
        setSelectedUser(''); // Reset selected user when type changes
    };

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedType && selectedUser) {
            // Implement your form submission logic here
            alert(`Assigned user ${selectedUser} of type ${selectedType} with comment: "${comment}"`);
        } else {
            alert('Please select both user type and user.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h3>Assign Support</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="userType">Select User Type:</label>
                    <CFormSelect id="userType" value={selectedType} onChange={handleTypeChange}>
                        <option value="">Select User Type</option>
                        {userTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </CFormSelect>
                </div>

                <div className="mb-3">
                    <label htmlFor="user">Select User:</label>
                    <CFormSelect id="user" value={selectedUser} onChange={handleUserChange} disabled={!selectedType}>
                        <option value="">Select User</option>
                        {filteredUsers.map(user => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </CFormSelect>
                </div>

                <div className="mb-3">
                    <label htmlFor="comment">Comment:</label>
                    <CFormTextarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        placeholder="Enter your comment"
                    />
                </div>

                <CButton type="submit" color="primary">Assign</CButton>
            </form>
        </div>
    );
};

export default SupportVisible;
