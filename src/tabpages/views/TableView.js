import React, { useState, useContext, createContext } from 'react';
import {
    CTable,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableHead,
    CTableDataCell,
    CButton,
    CToast,
    CToastBody,
    CToastHeader,
    CToaster,
    CBadge
} from '@coreui/react';
import DetailedView from './DetailedView';
import { UserContext } from '../Inquiry';
import { useToast } from '../../ToastComponent';

export const DetailedContext = createContext();

const TableView = () => {
    try {
        const [toast, setToast] = useState({ visible: false, message: '' });
        const [showDetailedView, setShowDetailedView] = useState(false);
        const [selectedItem, setSelectedItem] = useState(null);

        const [inquiries] = useContext(UserContext)?.inquiryList || [];

        const formatDateTime = (timestamp) => {
            const dateObj = new Date(timestamp);
            const date = `${dateObj.getFullYear()}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')}`;
            const time = Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(dateObj));
            return { date, time };
        };

        const { showToast } = useToast();

        return (
            <DetailedContext.Provider value={{ setShowDetailedView }}>
                <div style={{ padding: '20px' }}>
                    <div
                        style={{
                            maxHeight: '500px',
                            overflowY: 'auto',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#888 #f1f1f1',
                            position: 'relative',
                        }}
                    >
                        <CTable
                            hover
                            responsive
                            style={{
                                borderRadius: '8px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                borderCollapse: 'collapse',
                                width: '100%',
                                marginTop: '20px',
                            }}
                        >
                            <CTableHead
                                style={{
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                    backgroundColor: '#f8f8f8',
                                }}
                            >
                                <CTableRow>
                                    {['SN', 'Inq no.', 'Category', 'Question', 'Date', 'Time', 'Status', 'Assignee', 'Guest Name'].map(header => (
                                        <CTableHeaderCell
                                            key={header}
                                            style={{
                                                padding: '12px 15px',
                                                backgroundColor: '#f8f8f8',
                                                color: 'gray',
                                                fontWeight: 'normal',
                                                lineHeight: '17px',
                                                textAlign: 'center', // Center horizontally
                                                verticalAlign: 'middle', // Center vertically
                                            }}
                                        >
                                            {header}
                                        </CTableHeaderCell>
                                    ))}
                                    <CTableHeaderCell
                                        style={{
                                            color: 'gray',
                                            padding: '12px 15px',
                                            backgroundColor: '#f8f8f8',
                                            fontWeight: 'normal',
                                            position: 'sticky',
                                            right: '0',
                                            zIndex: '1',
                                            textAlign: 'center', // Center horizontally
                                            verticalAlign: 'middle', // Center vertically
                                        }}
                                    >
                                        Action
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {inquiries.map((item, index) => {
                                    const { date, time } = formatDateTime(item.purchased_on);
                                    return (
                                        <CTableRow key={item.inquiry_number}>
                                            {[
                                                index + 1,
                                                <span>
                                                    <div
                                                        style={{
                                                            maxWidth: '65px',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            lineHeight: '17px',
                                                        }}
                                                    >
                                                        📋 {item.inquiry_number}
                                                    </div>
                                                </span>,
                                                item.category_type_id,
                                                <div
                                                    style={{
                                                        minWidth: '300px',
                                                        maxWidth: '300px',
                                                        lineHeight: '17px',
                                                        whiteSpace: 'wrap',
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    {item.question}
                                                </div>,
                                                date,
                                                time,
                                                <div
                                                    style={{
                                                        padding: '12px 15px',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {item.payment_successfull == false ? (
                                                        <CBadge color="body-secondary">
                                                            <span style={{ color: 'gray' }}>Cancelled</span>
                                                        </CBadge>
                                                    ) : (
                                                        <CBadge style={{ backgroundColor: '#556B2F' }}>Paid</CBadge>
                                                    )}
                                                </div>,
                                                item.assignee || 'N/A',
                                                item.profile1?.name || 'N/A',
                                            ].map((value, idx) => (
                                                <CTableDataCell
                                                    key={idx}
                                                    style={{
                                                        padding: '5px 15px',
                                                        maxWidth: idx === 1 ? '800px' : '',
                                                        lineHeight: '17px',
                                                        textAlign: 'center', // Center horizontally
                                                        verticalAlign: 'middle', // Center vertically
                                                    }}
                                                >
                                                    {value}
                                                </CTableDataCell>
                                            ))}
                                            <CTableDataCell
                                                style={{
                                                    padding: '12px 15px',
                                                    textAlign: 'center', // Center horizontally
                                                    lineHeight: '17px',
                                                    position: 'sticky',
                                                    right: '0',
                                                    zIndex: '1',
                                                    backgroundColor: '#f8f8f8',
                                                    verticalAlign: 'middle', // Center vertically
                                                }}
                                            >
                                                <CButton
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        setShowDetailedView(true);
                                                    }}
                                                    style={{
                                                        backgroundColor: '#556B2F',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '3px 8px',
                                                        fontSize: '0.875rem',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    Open
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    );
                                })}
                            </CTableBody>
                        </CTable>
                    </div>
                    {showDetailedView && <DetailedView item={selectedItem} />}
                    {toast.visible && (
                        <CToaster position="top-right">
                            <CToast
                                visible={toast.visible}
                                onClose={() => setToast({ ...toast, visible: false })}
                                style={{ minWidth: '250px' }}
                            >
                                <CToastHeader closeButton>
                                    <strong className="me-auto">Notification</strong>
                                </CToastHeader>
                                <CToastBody>{toast.message}</CToastBody>
                            </CToast>
                        </CToaster>
                    )}
                </div>
            </DetailedContext.Provider>
        );
    } catch (error) {
        return(<>
            Error 404   
            {() => {showToast('Error', 'Page Could Not Be Loaded', 2); console.log(error)}}
        </>);
    }
};

export default TableView;
