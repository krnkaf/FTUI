import React, { useEffect, useState } from 'react';
import {
    CButton,
    CTable,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CFormCheck
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetToken, GetURL } from '../../../library/API';
import CIcon from '@coreui/icons-react';
import { cilPencil } from '@coreui/icons';
import { useToast } from '../../../ToastComponent';

const List = () => {
    const { showToast } = useToast();
    const [users, setUsers] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [userMap, setUserMap] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const typesResponse = await fetch(GetURL('/backend/Users/LoadBaseData'), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: GetToken(),
                    },
                });
                const typesData = await typesResponse.json();
                if (typesData.data?.user_type) {
                    setUserTypes(typesData.data.user_type);
                }

                const usersResponse = await fetch(GetURL('/backend/Users/GetAllList'), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: GetToken(),
                    },
                });
                const usersData = await usersResponse.json();

                if (usersData.data?.list) {
                    setUsers(usersData.data.list);

                    const userMap = usersData.data.list.reduce((acc, user) => {
                        acc[user._id] = user;
                        return acc;
                    }, {});
                    setUserMap(userMap);
                } else {
                    showToast('Error', 'No users found', 2);
                }
            } catch (error) {
                showToast('Error', 'An error occurred', 2);
            }
        };

        fetchData();
    }, [showToast]);

    const handleEdit = (id) => {
        navigate(`/page/user?page=manage&id=${id}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
            date.getDate()
        ).padStart(2, '0')} | ${String(date.getHours()).padStart(2, '0')}:${String(
            date.getMinutes()
        ).padStart(2, '0')}`;
    };

    return (
        <>
            <div className="tablediv">
                <h4 style={{ marginTop: '20px' }}>User List</h4>
                <CTable hover>
                    <thead>
                        <CTableRow>
                            <CTableHeaderCell style={{ textAlign: 'left' }}>Name</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: 'left' }}>Email</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: 'left' }}>User Type</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: 'center' }}>Updated Date</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: 'center' }}>Updated By</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: 'center' }}>Created Date</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: 'center' }}>Created By</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: 'center' }}>Active</CTableHeaderCell>
                            <CTableHeaderCell style={{ textAlign: 'center', minWidth: '100px' }}>Actions</CTableHeaderCell>
                        </CTableRow>
                    </thead>
                    <CTableBody>
                        {users.map((user) => (
                            <CTableRow key={user._id}>
                                <CTableDataCell style={{ textAlign: 'left' }}>{user.name}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'left' }}>{user.email}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'left' }}>
                                    {userTypes.find((type) => type.id == user.user_type_id)?.name || 'Unknown'}
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                    {formatDate(user.updated_date)}
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                    {user.updated_by == '' ? 'Super' : user.updated_by}
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                    {formatDate(user.created_date)}
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                {user.created_by == '' ? 'Super' : user.created_by}
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                    <CFormCheck
                                        style={{ backgroundColor: 'gray', border: 'none' }}
                                        type="checkbox"
                                        checked={user.active}
                                        disabled
                                    />
                                </CTableDataCell>
                                <CTableDataCell
                                    style={{
                                        textAlign: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CButton
                                        style={{ padding: '4px 8px', fontSize: '14px', marginLeft: '5px', borderWidth: '0px 0px 1px 1px', borderStyle: 'solid', borderColor: 'gray' }}
                                        onClick={() => handleEdit(user._id)}
                                        size="sm"
                                    >
                                        <CIcon icon={cilPencil} style={{ color: '#ff9933' }} />
                                    </CButton>
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
