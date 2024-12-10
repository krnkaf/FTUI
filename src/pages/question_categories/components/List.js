import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormCheck } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetToken, GetURL } from '../../../library/API';
import { useToast } from '../../../ToastComponent'; // Assume a Toast hook is available
import { CIcon } from '@coreui/icons-react';
import { cilPencil } from '@coreui/icons';

const List = () => {
    const { showToast } = useToast(); // Use the toast hook
    const [categoryTypes, setCategoryTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    // Function to fetch data
    const fetchData = async (url, setter) => {
        try {
            const response = await fetch(GetURL(url), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken(),
                },
            });
            const data = await response.json();
            if (data.data) {
                setter(data.data);
            }
        } catch (err) {
            showToast('Error', 'An error occurred. Please try again later.', 2);
        }
    };

    // Fetch data on component load
    useEffect(() => {
        const loadData = async () => {
            await fetchData("/backend/QuestionCategory/LoadBaseData", (data) => setCategoryTypes(data.category_type || []));
            await fetchData("/backend/QuestionCategory/GetAllList", (data) => setCategories(data.list || []));
            setLoading(false);
        };
        loadData();
    }, []);

    // Handle edit action
    const handleEdit = (id) => {
        navigate(`/page/questioncategory?page=manage&id=${id}`);
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} | ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    if (loading) {
        return <div>Loading...</div>; // Display a loader while fetching data
    }

    return (
        <div className="tablediv">
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
                    {categories.length > 0 ? (
                        categories.map((category) => {
                            const categoryType = categoryTypes.find((type) => type.id == category.category_type_id);
                            return (
                                <CTableRow key={category._id}>
                                    <CTableDataCell>{category.category}</CTableDataCell>
                                    <CTableDataCell>{categoryType ? categoryType.name : "No Category"}</CTableDataCell>
                                    <CTableDataCell>{category.order_id}</CTableDataCell>
                                    <CTableDataCell>{formatDate(category.updated_date)}</CTableDataCell>
                                    <CTableDataCell>{category.updated_by}</CTableDataCell>
                                    <CTableDataCell>{formatDate(category.created_date)}</CTableDataCell>
                                    <CTableDataCell>{category.created_by}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                    <CFormCheck
                                        style={{ backgroundColor: 'gray', border: 'none' }}
                                        type="checkbox"
                                        checked={category.active}
                                        disabled
                                    />
                                </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton
                                        style={{ padding: '4px 8px', fontSize: '14px', marginLeft: '5px', borderWidth: '0px 0px 1px 1px', borderStyle: 'solid', borderColor: 'gray' }}
                                        onClick={() => handleEdit(category._id)}
                                        size="sm"
                                        >
                                            <CIcon icon={cilPencil} style={{ color: '#ff9933' }} />
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            );
                        })
                    ) : (
                        <CTableRow>
                            <CTableDataCell colSpan="9" style={{ textAlign: 'center' }}>
                                No categories found.
                            </CTableDataCell>
                        </CTableRow>
                    )}
                </CTableBody>
            </CTable>
        </div>
    );
};

export default List;
