import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormCheck } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetToken, GetURL } from '../../../library/API';

const List = () => {
    const [bundles, setBundles] = useState([]);
    const [ausQue, setAusQue] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(GetURL("/backend/Bundle/GetAllList"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const data = await response.json();
                if (data.data && data.data.list) {
                    setBundles(data.data.list);
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        const fetchBaseData = async () => {
            try {
                const response = await fetch(GetURL("/backend/Bundle/LoadBaseData"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const data = await response.json();
                if (data.data && data.data.question_for_auspicious_time) {
                    setAusQue(data.data.question_for_auspicious_time);
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        fetchData();
        fetchBaseData();    
    }, []);

    const handleEdit = (id) => {
        navigate(`/page/bundles?page=manage&id=${id}`);
    };

    const viewDescription = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div className='tablediv'>
            <h4>Categories</h4>
            <CTable hover>
                <thead>
                    <CTableRow>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Effective From</CTableHeaderCell>
                        <CTableHeaderCell>Effective To</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>h_questions</CTableHeaderCell>
                        <CTableHeaderCell>c_questions</CTableHeaderCell>
                        <CTableHeaderCell>aus_question</CTableHeaderCell>
                        <CTableHeaderCell>Updated Date</CTableHeaderCell>
                        <CTableHeaderCell>Updated By</CTableHeaderCell>
                        <CTableHeaderCell>Created Date</CTableHeaderCell>
                        <CTableHeaderCell>Created By</CTableHeaderCell>
                        <CTableHeaderCell>Description</CTableHeaderCell>
                        <CTableHeaderCell>Active</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                </thead>
                <CTableBody>
                    {bundles.map(bundle => (
                        <React.Fragment key={bundle._id}>
                            <CTableRow>
                                <CTableDataCell>{bundle.name}</CTableDataCell>
                                <CTableDataCell>{bundle.effective_from}</CTableDataCell>
                                <CTableDataCell>{bundle.effective_to}</CTableDataCell>
                                <CTableDataCell>{bundle.price}</CTableDataCell>
                                <CTableDataCell>{bundle.horoscope_question_count}</CTableDataCell>
                                <CTableDataCell>{bundle.compatibility_question_count}</CTableDataCell>
                                <CTableDataCell>
                                    {
                                        ausQue.find(q => q.question_category_id === bundle.auspicious_question_id)?.question_category || 'N/A'
                                    }
                                </CTableDataCell>
                                <CTableDataCell>{bundle.updated_date}</CTableDataCell>
                                <CTableDataCell>{bundle.updated_by}</CTableDataCell>
                                <CTableDataCell>{bundle.created_date}</CTableDataCell>
                                <CTableDataCell>{bundle.created_by}</CTableDataCell>
                                <CTableDataCell>
                                        <CButton color='info' onClick={() => viewDescription(bundle._id)}>View</CButton>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CFormCheck 
                                        type="checkbox" 
                                        checked={bundle.active} 
                                        disabled 
                                    />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="warning" onClick={() => handleEdit(bundle._id)}>Update</CButton>
                                </CTableDataCell>
                            </CTableRow>
                            {expandedRow === bundle._id && (
                                <CTableRow>
                                    <CTableDataCell colSpan={13}>
                                        <div>
                                            <strong>Description:</strong> {bundle.description}
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            )}
                        </React.Fragment>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
};

export default List;
