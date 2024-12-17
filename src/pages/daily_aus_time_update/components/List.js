import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetToken, GetURL } from '../../../library/API';
import CIcon from '@coreui/icons-react';
import { cilPencil } from '@coreui/icons';
import { useToast } from '../../../ToastComponent';

const List = () => {
    const { showToast } = useToast();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    // Function to format the date in YYYY-MM-DD | HH:mm format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} | ${hours}:${minutes}`;
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(GetURL("/backend/DailyAuspiciousTimeUpdate/getalllist"), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });

                if (response.ok) {
                    const res = await response.json();
                    if (res.data && res.data.list) {
                        setItems(res.data.list);
                    } else {
                        showToast('Error', 'Unexpected data structure:', 2);
                    }
                } else {
                    const errorData = await response.json();
                    showToast('Error', errorData.message, 2);
                }
            } catch (err) {
                showToast('Error', 'An error occurred. Please try again later.', 2);
            }
        };

        fetchItems();
    }, []);

    const handleEdit = (id) => {
        navigate(`/page/daily_aus_time_update?page=manage&id=${id}`);
    };

    return (
        <div className='tablediv'>
            <h4 style={{ marginTop: '20px' }}>Daily Auspicious Time Updates</h4>
            <CTable hover>
                <thead>
                    <CTableRow>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Date</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Updated Date</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Updated By</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Created Date</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Created By</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center', minWidth: '105px' }}>Actions</CTableHeaderCell>
                    </CTableRow>
                </thead>
                <CTableBody>
                    {items.map((item) => (
                        <CTableRow key={item._id}>
                            <CTableDataCell style={{ textAlign: 'center' }}>{item.transaction_date}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{formatDate(item.updated_date)}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{item.updated_by}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{formatDate(item.created_date)}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{item.created_by}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
