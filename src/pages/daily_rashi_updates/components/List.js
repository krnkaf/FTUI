import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetToken, GetURL } from '../../../library/API';

const List = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(GetURL("/DailyRashiUpdates/GetAllList"), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });

                if (response.ok) {
                    const res = await response.json();
                    if (res.data && res.data.list) {
                        setItems(res.data.list); // Set items with the data from API
                    } else {
                        console.error('Unexpected data structure:', res);
                    }
                } else {
                    const errorData = await response.json();
                    alert(errorData.message);
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        fetchItems();
    }, []);

    const handleEdit = (id) => {
        navigate(`/page/daily_rashi_updates?page=manage&id=${id}`);
    };

    return (
        <>
            <CTable hover>
                <thead>
                    <CTableRow>
                        <CTableHeaderCell>Date</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                    </CTableRow>
                </thead>
                <CTableBody>
                    {items.map((item) => (
                        <CTableRow key={item._id}>
                            <CTableDataCell>{item.transaction_date}</CTableDataCell>
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
