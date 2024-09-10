import React, { useEffect, useState } from 'react';
import { CButton, CFormSelect, CFormTextarea } from '@coreui/react';
import { GetToken, GetURL } from '../../library/API';

const SupportVisible = ({ currentTask }) => {
    const [userTypes, setUserTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                    setFilteredUsers(usersData.data.list);
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
        const filtered = users.filter(user => user.user_type_id.toString() === typeId);
        setFilteredUsers(filtered);
        setSelectedUser('');
    };

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedType && selectedUser) {
            console.log(`Current Task: ${currentTask}`);
            console.log(`Assigned user ${selectedUser} of type ${selectedType} with comment: "${comment}"`);
        } else {
            alert('Please select both user type and user.');
        }
    };

    return (
        <div style={{
            maxWidth: '600px', 
            margin: '0 auto', 
            padding: '20px',
            border: '2px solid white',
            borderRadius: '8px'
        }}>
            <h3>Assign Task</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="comment">Comment:</label>
                    <CFormTextarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        placeholder="Enter your comment"
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                        <strong style={{ marginRight: '10px' }}>For:</strong>
                        <CFormSelect 
                            id="userType" 
                            value={selectedType} 
                            onChange={handleTypeChange}
                            style={{ flex: 1, width: '200px' }}
                        >
                            <option value="">Select User Type</option>
                            {userTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </CFormSelect>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ marginRight: '10px' }}>To:</strong>
                        <CFormSelect 
                            id="user" 
                            value={selectedUser} 
                            onChange={handleUserChange} 
                            disabled={!selectedType}
                            style={{ flex: 1, width: '200px' }}
                        >
                            <option value="">Select User</option>
                            {filteredUsers.map(user => (
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </CFormSelect>
                    </div>
                </div>

                <CButton type="submit" color="primary">Assign</CButton>
            </form>
        </div>
    );
};

export default SupportVisible;
