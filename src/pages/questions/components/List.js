import React, { useEffect, useState } from 'react';
import {
    CButton,
    CTable,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CTableHead
} from '@coreui/react';
import { GetToken, GetURL } from '../../../library/API';
import { useNavigate } from 'react-router-dom';
import { cilPencil } from '@coreui/icons';
import { useToast } from '../../../ToastComponent';
import CIcon from '@coreui/icons-react';

const List = () => {
    const [questions, setQuestions] = useState([]);
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(GetURL("/backend/Question/GetAllList"), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data.data.list);
                } else {
                    console.error('Failed to fetch questions');
                }
            } catch (error) {
                showToast('Failed', `An error occurred: ${error}`, 2);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/page/questions?page=manage&id=${id}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} | ${hours}:${minutes}`;
    };

    return (
        <div className='tablediv'>
            <h4>Questions</h4>
            <CTable hover>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>Question</CTableHeaderCell>
                        <CTableHeaderCell>Category</CTableHeaderCell>
                        <CTableHeaderCell>Order ID</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>Price Before Discount</CTableHeaderCell>
                        <CTableHeaderCell>Discount Amount</CTableHeaderCell>
                        <CTableHeaderCell>Is Initial Offering</CTableHeaderCell>
                        <CTableHeaderCell>Is Bundle</CTableHeaderCell>
                        <CTableHeaderCell>Effective From</CTableHeaderCell>
                        <CTableHeaderCell>Effective To</CTableHeaderCell>
                        <CTableHeaderCell>Updated Date</CTableHeaderCell>
                        <CTableHeaderCell>Updated By</CTableHeaderCell>
                        <CTableHeaderCell>Created Date</CTableHeaderCell>
                        <CTableHeaderCell>Created By</CTableHeaderCell>
                        <CTableHeaderCell>Active</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {questions.map((item) => (
                        <CTableRow key={item._id}>
                            <CTableDataCell>{item.question}</CTableDataCell>
                            <CTableDataCell>{item.question_category_name}</CTableDataCell>
                            <CTableDataCell>{item.order_id}</CTableDataCell>
                            <CTableDataCell>{item.price}</CTableDataCell>
                            <CTableDataCell>{item.price_before_discount}</CTableDataCell>
                            <CTableDataCell>{item.discount_amount}</CTableDataCell>
                            <CTableDataCell>{item.is_initial_offerings ? "Yes" : "No"}</CTableDataCell>
                            <CTableDataCell>{item.is_bundle ? "Yes" : "No"}</CTableDataCell>
                            <CTableDataCell>{formatDate(item.effective_from)}</CTableDataCell>
                            <CTableDataCell>{formatDate(item.effective_to)}</CTableDataCell>
                            <CTableDataCell>{formatDate(item.updated_date)}</CTableDataCell>
                            <CTableDataCell>{item.updated_by}</CTableDataCell>
                            <CTableDataCell>{formatDate(item.created_date)}</CTableDataCell>
                            <CTableDataCell>{item.created_by}</CTableDataCell>
                            <CTableDataCell>
                                <input type="checkbox" checked={item.active} disabled />
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton
                                    style={{ padding: '4px 8px', fontSize: '14px', marginLeft: '5px', borderWidth: '0px 0px 1px 1px', borderStyle: 'solid', borderColor: 'gray' }}
                                    onClick={() => handleEdit(item._id)}
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
    );
};

export default List;
