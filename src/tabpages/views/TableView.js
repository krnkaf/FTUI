import React, { useState, useContext, createContext } from 'react';
import {
    CTable,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableHead,
    CTableDataCell,
    CButton,
    CBadge
} from '@coreui/react';
import DetailedView from './DetailedView';
import { UserContext } from '../Inquiry';

export const DetailedContext = createContext();

const TableView = () => {
    try {
        const [showDetailedView, setShowDetailedView] = useState(false);
        const [selectedItem, setSelectedItem] = useState(null);

        const [inquiries] = useContext(UserContext)?.inquiryList || [];
        const { category_type } = useContext(UserContext);

        const formatDateTime = (create_timestamp, update_timestamp) => {
            const createDateObj = new Date(create_timestamp);
            const created_date = `${createDateObj.getFullYear()}/${(createDateObj.getMonth() + 1).toString().padStart(2, '0')}/${createDateObj.getDate().toString().padStart(2, '0')}`;
            const created_time = Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(createDateObj));
            const updateDateObj = new Date(update_timestamp);
            const updated_date = `${updateDateObj.getFullYear()}/${(updateDateObj.getMonth() + 1).toString().padStart(2, '0')}/${updateDateObj.getDate().toString().padStart(2, '0')}`;
            const updated_time = Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(updateDateObj));
            return { created_date, created_time, updated_date, updated_time };
        };

        return (
            <DetailedContext.Provider value={{ setShowDetailedView }}>
                <div style={{ padding: '20px' }}>
                    <div
                        style={{
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
                                    {['SN', 'Inq no.', 'Category', 'Question', 'Created Date', 'Updated Date', 'Status', 'Assignee', 'Guest Name'].map(header => (
                                        <CTableHeaderCell
                                            key={header}
                                            style={{
                                                padding: '12px 15px',
                                                backgroundColor: '#f8f8f8',
                                                color: 'gray',
                                                fontWeight: 'normal',
                                                lineHeight: '17px',
                                                textAlign: 'center',
                                                verticalAlign: 'middle',
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
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                        }}
                                    >
                                        Action
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {inquiries.map((item, index) => {
                                    const { created_date, created_time, updated_date, updated_time } = formatDateTime(item.purchased_on, item.updated_date);
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
                                                            cursor: 'copy'
                                                        }}

                                                        onClick={() => {
                                                            navigator.clipboard.writeText(item.inquiry_number)
                                                                .catch((err) => {
                                                                    console.error('Failed to copy: ', err);
                                                                });
                                                        }}
                                                    >
                                                        📋 {item.inquiry_number}
                                                    </div>
                                                </span>,
                                                <div
                                                    style={{
                                                        textAlign: 'left', // Left-align the category type
                                                        padding: '5px 15px',
                                                        lineHeight: '17px',
                                                    }}
                                                >
                                                    {category_type[item.category_type_id - 1]?.name}
                                                </div>,
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
                                                <div style={{ fontSize: '15px' }}>
                                                    {created_date + " | " + created_time},
                                                </div>,
                                                <div style={{ fontSize: '15px' }}>
                                                    {updated_date + " | " + updated_time}
                                                </div>,
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
                                                <div
                                                    style={{
                                                        textAlign: 'left', // Left-align the category type
                                                        padding: '5px 15px',
                                                        lineHeight: '17px',
                                                    }}
                                                >
                                                    {item.profile1?.name || 'N/A'}
                                                </div>,
                                            ].map((value, idx) => (
                                                <CTableDataCell
                                                    key={idx}
                                                    style={{
                                                        padding: '5px 15px',
                                                        maxWidth: idx === 1 ? '800px' : '',
                                                        lineHeight: '17px',
                                                        textAlign: 'center',
                                                        verticalAlign: 'middle',
                                                    }}
                                                >
                                                    {value}
                                                </CTableDataCell>
                                            ))}
                                            <CTableDataCell
                                                style={{
                                                    padding: '12px 15px',
                                                    textAlign: 'center',
                                                    lineHeight: '17px',
                                                    position: 'sticky',
                                                    right: '0',
                                                    zIndex: '1',
                                                    backgroundColor: '#f8f8f8',
                                                    verticalAlign: 'middle',
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
                </div>
            </DetailedContext.Provider>
        );
    } catch (error) {
        return (<>
            Error 404
            {() => { showToast('Error', 'Page Could Not Be Loaded', 2); console.log(error) }}
        </>);
    }
};

export default TableView;
