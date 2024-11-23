import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetToken, GetURL } from '../../../library/API';

const List = () => {
    const [users, setUsers] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [userMap, setUserMap] = useState({}); // Map to store users by ID
    const navigate = useNavigate();

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
                    
                    // Create a map of users by ID for quick lookup
                    const userMap = usersData.data.list.reduce((acc, user) => {
                        acc[user._id] = user;
                        return acc;
                    }, {});
                    setUserMap(userMap);
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/page/user?page=manage&id=${id}`);
    };

    // Function to format dates (2024-11-21T03:57:03.173Z -> 2024-11-21 03:57)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} | ${hours}:${minutes}`;
    };

    // Safe user name lookup
    const getUserNameById = (userId) => {
        return userMap[userId]?.name || 'Super Admin'; // Fallback to 'Unknown' if not found
    };

    return (
        <>
            <div className='tablediv'>
                <h4>Users</h4>
                <CTable hover>
                    <thead>
                        <CTableRow>
                            <CTableHeaderCell>Name</CTableHeaderCell>
                            <CTableHeaderCell>Email</CTableHeaderCell>
                            <CTableHeaderCell>User Type</CTableHeaderCell>
                            <CTableHeaderCell>Updated Date</CTableHeaderCell>
                            <CTableHeaderCell>Updated By</CTableHeaderCell>
                            <CTableHeaderCell>Created Date</CTableHeaderCell>
                            <CTableHeaderCell>Created By</CTableHeaderCell>
                            <CTableHeaderCell>Action</CTableHeaderCell>
                        </CTableRow>
                    </thead>
                    <CTableBody>
                        {users.map(user => (
                            <CTableRow key={user._id}>
                                <CTableDataCell>{user.name}</CTableDataCell>
                                <CTableDataCell>{user.email}</CTableDataCell>
                                <CTableDataCell>{userTypes.find(type => type.id == user.user_type_id)?.name || 'Unknown'}</CTableDataCell>
                                <CTableDataCell>{formatDate(user.updated_date)}</CTableDataCell>
                                <CTableDataCell>{getUserNameById(user.updated_by)}</CTableDataCell>
                                <CTableDataCell>{formatDate(user.created_date)}</CTableDataCell>
                                <CTableDataCell>{getUserNameById(user.created_by)}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="warning" onClick={() => handleEdit(user._id)}>Edit</CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>
        </>
    );
};

export default List;
