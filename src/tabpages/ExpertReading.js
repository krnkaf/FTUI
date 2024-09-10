import React, { useState } from 'react';
import { CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CTableHead } from '@coreui/react';
import DetailedView from './views/DetailedView';

const ExpertReading = ({ data }) => {

    const [showDetailedView, setShowDetailedView] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setShowDetailedView(true);
    };

    const handleCloseDetailedView = () => {
        setShowDetailedView(false);
        setSelectedItem(null);
    };

    return (
        <div className='tablediv'>
            <CTable hover>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell>SN</CTableHeaderCell>
                        <CTableHeaderCell>Question</CTableHeaderCell>
                        <CTableHeaderCell>Amount</CTableHeaderCell>
                        <CTableHeaderCell>Timestamp</CTableHeaderCell>
                        <CTableHeaderCell>Category</CTableHeaderCell>
                        <CTableHeaderCell>Assignee</CTableHeaderCell>
                        <CTableHeaderCell>Payment Status</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>

                <CTableBody>
                    {data.map((item) => (
                        <CTableRow key={item.sn} onClick={() => handleRowClick(item)}>
                            <CTableDataCell>{item.sn}</CTableDataCell>
                            <CTableDataCell>{item.question}</CTableDataCell>
                            <CTableDataCell>{item.amount}</CTableDataCell>
                            <CTableDataCell>{item.timestamp}</CTableDataCell>
                            <CTableDataCell>{item.category}</CTableDataCell>
                            <CTableDataCell>{item.assignee}</CTableDataCell>
                            <CTableDataCell>{item.payment_status}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            {showDetailedView && (
                <DetailedView item={selectedItem} onClose={handleCloseDetailedView} fromPage={"ExpertReading"}/>
            )}
        </div>
    );
};

export default ExpertReading;
