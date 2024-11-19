import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetToken,GetURL } from '../../../library/API';

const List = () => {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
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
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/page/questions?page=manage&id=${id}`);
    };

    return (
        <>
            <div className='tablediv'>
                <h4>Questions</h4>
                <CTable hover>
                    <thead>
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
                                <CTableDataCell>
                                    {categories.find(cat => cat.question_category_id === item.question_category_id)?.question_category || 'Unknown'}
                                </CTableDataCell>
                                <CTableDataCell>{item.order_id}</CTableDataCell>
                                <CTableDataCell>{item.price}</CTableDataCell>
                                <CTableDataCell>{item.updated_date}</CTableDataCell>
                                <CTableDataCell>{item.updated_by}</CTableDataCell>
                                <CTableDataCell>{item.created_date}</CTableDataCell>
                                <CTableDataCell>{item.created_by}</CTableDataCell>
                                <CTableDataCell>
                                    <input type="checkbox" checked={item.active} disabled />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="warning" onClick={() => handleEdit(item._id)}>Edit</CButton>
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
