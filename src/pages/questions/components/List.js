import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetURL } from '../../../library/API';

const List = () => {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await fetch(GetURL("/backend/Question/LoadBaseData"), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (categoryResponse.ok) {
                    const categoryData = await categoryResponse.json();
                    setCategories(categoryData.data.question_category_items);
                } else {
                    console.error('Failed to fetch categories');
                }

                const questionResponse = await fetch(GetURL("/backend/Question/GetAllList"), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
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
            <CTable hover>
                <thead>
                    <CTableRow>
                        <CTableHeaderCell>Category</CTableHeaderCell>
                        <CTableHeaderCell>Question</CTableHeaderCell>
                        <CTableHeaderCell>Order ID</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>Active</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                </thead>
                <CTableBody>
                    {questions.map((item) => (
                        <CTableRow key={item._id}>
                            <CTableDataCell>
                                {categories.find(cat => cat.question_category_id === item.question_category_id)?.question_category || 'Unknown'}
                            </CTableDataCell>
                            <CTableDataCell>{item.question}</CTableDataCell>
                            <CTableDataCell>{item.order_id}</CTableDataCell>
                            <CTableDataCell>{item.price}</CTableDataCell>
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
        </>
    );
};

export default List;
