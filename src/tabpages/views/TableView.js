import React, { useState, useEffect } from 'react';
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
import { GetURL, GetToken } from '../../library/API';

const TableView = ({ page, state, status, publish }) => {
    try {
        const [inquiries, setInquiries] = useState([]);
        const [categories, setCategories] = useState([]);
        const [toast, setToast] = useState({ visible: false, message: '' });
        const [showDetailedView, setShowDetailedView] = useState(false);
        const [selectedItem, setSelectedItem] = useState(null);
        const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, inquiryNumber: '' });
    
        // Fetch inquiries data
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
    
        // Fetch category data
        const fetchCategories = async () => {
            try {
                const response = await fetch(GetURL('/backend/QuestionCategory/LoadBaseData'), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': GetToken() }
                });
                const data = await response.json();
                // Map category types into an object for easy lookup
                const categoryMap = data.data.category_type.reduce((acc, category) => {
                    acc[category.id] = category.name;
                    return acc;
                }, {});
                setCategories(categoryMap);
            } catch (err) {
                // setToast({ visible: true, message: `An error occurred while loading categories. ${err}` });
                
            }
        };
    
        // Fetch inquiries and categories when component mounts
        useEffect(() => {
            fetchInquiries();
            fetchCategories();
        }, [state, status]);
    
        const formatDateTime = (timestamp) => {
            const dateObj = new Date(timestamp);
            const date = `${dateObj.getFullYear()}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')}`;
            const time = Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(dateObj));
            return { date, time };
        };
    
        const formatAuspiciousDate = (timestamp) => {
            if (timestamp == null)
                return 'N/A';
            const dateObj = new Date(timestamp);
            return `${dateObj.getFullYear()}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')}`;
        };
    
        // Handle right-click to show context menu
        const handleRightClick = (e, inquiryNumber) => {
            e.preventDefault(); // Prevent default right-click menu
            setContextMenu({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                inquiryNumber,
            });
        };
    
        // Copy the inquiry number to clipboard
        const handleCopyToClipboard = () => {
            navigator.clipboard.writeText(contextMenu.inquiryNumber)
                .then(() => {
                    setToast({ visible: true, message: `Inquiry number copied to clipboard: ${contextMenu.inquiryNumber}` });
                })
                .catch((err) => {
                    setToast({ visible: true, message: `Failed to copy: ${err}` });
                });
            setContextMenu({ ...contextMenu, visible: false });
        };
    
        // Close the context menu
        const closeContextMenu = () => {
            setContextMenu({ ...contextMenu, visible: false });
        };
    
        return (
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
                                        color: '#6c757d',
                                        fontWeight: 'normal',
                                        lineHeight: '17px',
                                        textAlign: 'center',
                                    }}
                                    >
                                        {header}
                                    </CTableHeaderCell>
                                ))}
                                <CTableHeaderCell style={{ padding: '12px 15px', backgroundColor: '#f8f8f8', fontWeight: 'normal', }}></CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <style>
                            {
                                `
                                    
                                `
                            }
                        </style>
                        <CTableBody>
                            {inquiries.map((item, index) => {
                                const { date, time } = formatDateTime(item.purchased_on);
                                const auspiciousDate = formatAuspiciousDate(item.auspicious_from_date);
    
                                // Get the category name by matching the category id
                                const categoryName = categories[item.category_type_id] || 'Unknown Category';
    
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
                                                onContextMenu={(e) => handleRightClick(e, item.inquiry_number)}
                                                >
                                                    📋 {item.inquiry_number}
                                                </div>
                                                
                                            </span>,
                                            categoryName,
                                            <div
                                            style={{ 
                                                minWidth: '300px', 
                                                maxWidth: '300px', 
                                                lineHeight: '17px',
                                                whiteSpace: 'wrap', 
                                            }}
                                            >
                                                {item.question}
                                            </div>,
                                            date,
                                            time,
                                            <CTableDataCell style={{ padding: '12px 15px', textAlign: 'center' }}>
                                                {/* <span
                                                    style={{
                                                        backgroundColor: '#28a745',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '5px 10px',
                                                        borderRadius: '5px',
                                                        cursor: 'default',
                                                    }}
                                                >
                                                    {item.payment_successfull ? 'Paid' : 'Cancelled'}
                                                </span> */}
                                                {item.payment_successfull == false ? <CBadge color='body-secondary'><span style={{ color: 'gray' }}>Cancelled</span></CBadge> : <CBadge color='success'>Paid</CBadge>}   
                                            </CTableDataCell>,
                                            item.assignee || 'N/A',
                                            item.profile1?.name || 'N/A'
                                        ].map((value, idx) => (
                                            <CTableDataCell
                                                key={idx}
                                                style={{
                                                    padding: '5px 15px',
                                                    maxWidth: idx === 1 ? '800px' : '',
                                                    lineHeight: '17px',
                                                }}
                                            >
                                                {value}
                                            </CTableDataCell>
                                        ))}
                                        <CTableDataCell style={{ padding: '12px 15px', textAlign: 'center', lineHeight: '17px', }}>
                                            <CButton
                                                onClick={() => { setSelectedItem(item); setShowDetailedView(true); }}
                                                style={{
                                                    backgroundColor: '#28a745',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '5px 10px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    textAlign: 'center'
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
    
                {/* Custom Context Menu */}
                {contextMenu.visible && (
                    <div 
                        style={{
                            position: 'absolute',
                            top: contextMenu.y,
                            left: contextMenu.x,
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            zIndex: 9999,
                        }}
                        onClick={closeContextMenu}
                    >
                        <div 
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                            }}
                            onClick={handleCopyToClipboard}
                        >
                            <span style={{ marginRight: '10px' }}>📋</span> Copy Inquiry Number
                        </div>
                    </div>
                )}
    
                {showDetailedView && <DetailedView item={selectedItem} onClose={() => setShowDetailedView(false)}  fromPage={page} status={status}/>}
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
    } catch (error) {
        return(<></>)
    }
};

export default TableView;
