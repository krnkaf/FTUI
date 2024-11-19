import React, { useState, useEffect } from 'react';
import { CTable, CTableRow, CTableHeaderCell, CTableBody, CTableHead, CTableDataCell, CButton, CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react';
import DetailedView from './DetailedView';
import { GetURL, GetToken } from '../../library/API';

const TableView = ({ page, state, status, publish }) => {
    const [inquiries, setInquiries] = useState([]);
    const [toast, setToast] = useState({ visible: false, message: '' });
    const [showDetailedView, setShowDetailedView] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchInquiries = async () => {
        try {
            const response = await fetch(GetURL(`/backend/InquiryManagement/GetInquiries?inquiry_state=${state}&inquiry_status=${status}`), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': GetToken() }
            });
            const data = await response.json();
            setInquiries(data.data.list);
        } catch (err) {
            setToast({ visible: true, message: `An error occurred. Please try again later. ${err}` });
        }
    };

    useEffect(() => { fetchInquiries(); }, [state, status]);

    return (
        <div className="tablediv">
            <CButton onClick={() => console.log(inquiries[0])}>Press for Inquiries</CButton>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <CTable style={{ borderSpacing: '0 10px', width: '100%', border: '2px solid black' }}>
                    <CTableHead>
                        <CTableRow>
                            {['SN', 'Question', 'Amount', 'Inquiry Number', 'Payment Status', 'Timestamp', 'Auspicious from Date', 'Category', 'Assignee', 'Comment for Assignee', 'Final Reading'].map(header => (
                                <CTableHeaderCell key={header} style={{ padding: '12px 15px' }}>{header}</CTableHeaderCell>
                            ))}
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {inquiries.map(item => (
                            <CTableRow key={item.inquiry_number} onClick={() => { setSelectedItem(item); setShowDetailedView(true); }}>
                                {[
                                    item.inquiry_id,
                                    item.question,
                                    item.price,
                                    item.inquiry_number,
                                    item.payment_successfull ? 'Paid' : 'Cancelled',
                                    item.purchased_on,
                                    item.auspicious_from_date ?? 'N/A',
                                    item.category_type_id ?? 'N/A',
                                    item.assignee || 'N/A',
                                    item.comment_for_assignee ?? 'N/A',
                                    item.final_reading ?? 'N/A'
                                ].map((value, index) => (
                                    <CTableDataCell key={index} style={{ padding: '12px 15px' }}>{value}</CTableDataCell>
                                ))}
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>
            {showDetailedView && <DetailedView item={selectedItem} onClose={() => setShowDetailedView(false)} publish={publish} fromPage={page}/>}
            {toast.visible && (
                <CToaster position="top-right">
                    <CToast visible={toast.visible} onClose={() => setToast({ ...toast, visible: false })} style={{ minWidth: '250px' }}>
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

export default TableView;
