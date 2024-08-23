import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetToken,GetURL } from '../../../library/API';

const List = () => {
    const [users, setUsers] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
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
                                <CTableDataCell>{userTypes.find(type => type.id == user.user_type_id)?.name}</CTableDataCell>
                                <CTableDataCell>{user.updated_date}</CTableDataCell>
                                <CTableDataCell>{user.updated_by}</CTableDataCell>
                                <CTableDataCell>{user.created_date}</CTableDataCell>
                                <CTableDataCell>{user.created_by}</CTableDataCell>
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
