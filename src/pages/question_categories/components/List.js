import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormCheck } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetToken, GetURL } from '../../../library/API';

const List = () => {
    const [categoryTypes, setCategoryTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryTypes = async () => {
            try {
                const typesResponse = await fetch(GetURL("/backend/QuestionCategory/LoadBaseData"), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });
                const typesData = await typesResponse.json();
                if (typesData.data && typesData.data.category_type) {
                    setCategoryTypes(typesData.data.category_type);
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };
        fetchCategoryTypes();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetch(GetURL("/backend/QuestionCategory/GetAllList"), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });
                const categoriesData = await categoriesResponse.json();
                if (categoriesData.data && categoriesData.data.list) {
                    setCategories(categoriesData.data.list);
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };
        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/page/questioncategory?page=manage&id=${id}`);
    };

    return (
        <>
            <div className='tablediv'>
                <h4>Categories</h4>
                <CTable hover>
                    <thead>
                        <CTableRow>
                            <CTableHeaderCell>Category</CTableHeaderCell>
                            <CTableHeaderCell>Category Type</CTableHeaderCell>
                            <CTableHeaderCell>Order ID</CTableHeaderCell>
                            <CTableHeaderCell>Updated Date</CTableHeaderCell>
                            <CTableHeaderCell>Updated By</CTableHeaderCell>
                            <CTableHeaderCell>Created Date</CTableHeaderCell>
                            <CTableHeaderCell>Created By</CTableHeaderCell>
                            <CTableHeaderCell>Active</CTableHeaderCell>
                            <CTableHeaderCell>Action</CTableHeaderCell>
                        </CTableRow>
                    </thead>
                    <CTableBody>
                        {categories.map(category => {
                            const categoryType = categoryTypes.find(type => type.id == category.category_type_id);
                            return (
                                <CTableRow key={category._id}>
                                    <CTableDataCell>{category.category}</CTableDataCell>
                                    <CTableDataCell>{categoryType ? categoryType.name : "No Category"}</CTableDataCell>
                                    <CTableDataCell>{category.order_id}</CTableDataCell>
                                    <CTableDataCell>{category.updated_date}</CTableDataCell>
                                    <CTableDataCell>{category.updated_by}</CTableDataCell>
                                    <CTableDataCell>{category.created_date}</CTableDataCell>
                                    <CTableDataCell>{category.created_by}</CTableDataCell>
                                    <CTableDataCell>
                                        <CFormCheck
                                            type="checkbox"
                                            checked={category.active}
                                            disabled
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="warning" onClick={() => handleEdit(category._id)}>Edit</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            );
                        })}
                    </CTableBody>
                </CTable>
            </div>
        </>
    );
};

export default List;
