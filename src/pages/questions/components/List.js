import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CToaster, CToast, CToastHeader, CToastBody } from '@coreui/react';
import { GetToken, GetURL } from '../../../library/API';
import { useNavigate } from 'react-router-dom';

const List = () => {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]); 
    const [userMap, setUserMap] = useState({}); 
    const [toast, setToast] = useState({ visible: false, message: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await fetch(GetURL("/backend/Question/LoadBaseData"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    },
                });

                if (categoryResponse.ok) {
                    const categoryData = await categoryResponse.json();
                    setCategories(categoryData.data.question_category_items);
                } else {
                    console.error('Failed to fetch categories');
                }

                const questionResponse = await fetch(GetURL("/backend/Question/GetAllList"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    },
                });

                if (questionResponse.ok) {
                    const questionData = await questionResponse.json();
                    setQuestions(questionData.data.list);
                } else {
                    console.error('Failed to fetch questions');
                }

                const userResponse = await fetch(GetURL("/backend/Users/GetAllList"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    },
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUsers(userData.data.list);

                    const userMap = userData.data.list.reduce((acc, user) => {
                        acc[user._id] = user;
                        return acc;
                    }, {});
                    setUserMap(userMap);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                setToast({ visible: true, message: `An error occurred: ${error}` });
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/page/questions?page=manage&id=${id}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} | ${hours}:${minutes}`;
    };

    const getUserNameById = (userId) => {
        return userMap[userId]?.name || 'Unknown'; // Fallback to 'Unknown' if not found
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Add margin top and bottom, also ensure the table is responsive and takes full width */}
            <CTable
                hover
                responsive
                style={{
                    width: 'calc(100% - 40px)', // Full width minus left and right margins
                    marginTop: '20px',          // Margin on top of the table
                    marginBottom: '20px',       // Margin below the table
                    marginLeft: '20px',         // Margin on the left
                    marginRight: '20px',        // Margin on the right
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    borderCollapse: 'collapse',
                }}
            >
                <thead
                    style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#f8f8f8',
                        zIndex: 1,
                    }}
                >
                    <CTableRow>
                        <CTableHeaderCell>Question</CTableHeaderCell>
                        <CTableHeaderCell>Category</CTableHeaderCell>
                        <CTableHeaderCell>Order ID</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>Updated Date</CTableHeaderCell>
                        <CTableHeaderCell>Updated By</CTableHeaderCell>
                        <CTableHeaderCell>Created Date</CTableHeaderCell>
                        <CTableHeaderCell>Created By</CTableHeaderCell>
                        <CTableHeaderCell>Active</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                </thead>
                <CTableBody>
                    {questions.map((item) => (
                        <CTableRow key={item._id}>
                            <CTableDataCell>{item.question}</CTableDataCell>
                            <CTableDataCell>{categories.find(cat => cat.question_category_id === item.question_category_id)?.question_category || 'Unknown'}</CTableDataCell>
                            <CTableDataCell>{item.order_id}</CTableDataCell>
                            <CTableDataCell>{item.price}</CTableDataCell>
                            <CTableDataCell>{formatDate(item.updated_date)}</CTableDataCell>
                            <CTableDataCell>{getUserNameById(item.updated_by)}</CTableDataCell>
                            <CTableDataCell>{formatDate(item.created_date)}</CTableDataCell>
                            <CTableDataCell>{getUserNameById(item.created_by)}</CTableDataCell>
                            <CTableDataCell>
                                <input type="checkbox" checked={item.active} disabled />
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton
                                    color="warning"
                                    onClick={() => handleEdit(item._id)}
                                    style={{
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    Edit
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            {/* Toast Notifications */}
            {toast.visible && (
                <CToaster position="top-right">
                    <CToast visible={toast.visible} onClose={() => setToast({ ...toast, visible: false })}>
                        <CToastHeader closeButton>
                            <strong className="me-auto">Notification</strong>
                        </CToastHeader>
                        <CToastBody>{toast.message}</CToastBody>
                    </CToast>
                </CToaster>
            )}
        </div>
    );
};

export default List;
