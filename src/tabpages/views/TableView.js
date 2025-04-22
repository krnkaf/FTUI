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
import DetailedView from './DetailedViewCopy';
import { UserContext } from '../Inquiry';
import Test from './Test';
import { GetToken, GetURL } from '../../library/API';

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

        const [data, setData] = useState([]);
        const [showVedicResponse, setShowVedicResponse] = useState(false);

        const clipboardIcon = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cg transform='scale(0.5)'%3E%3Crect x='-10' y='-10' width='520' height='540' fill='rgba(0, 0, 0, 0.6)' rx='20'/%3E%3Cpath d='M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z' fill='%23ffffff'/%3E%3C/g%3E%3C/svg%3E"), pointer`;

        const callVedicAPI = async (inquiry_id, vedic_api_type) => {
            try {
                const response = await fetch(GetURL(`/backend/InquiryManagement/CallVedicAPI?inquiry_id=${inquiry_id}&vedic_api_type=${vedic_api_type}`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': GetToken()
                    }
                })
                console.log("Status: ", response.status);
            } catch (err) {
                console.log(err)
            }
        }

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
                                                // <CButton color='secondary' onClick={() => callVedicAPI(item.inquiry_id, 5)}>
                                                //     Call
                                                // </CButton>,
                                                // <CButton color='secondary' onClick={() => {setData(item.vedic_api_response_list ? item.vedic_api_response_list[0].vedic_api_response :  JSON.parse(response = "none")); setShowVedicResponse(true)}}>
                                                //     {() => console.log(item.vedic_api_response_list ? (JSON.parse(item.vedic_api_response_list[0].vedic_api_response).status == 200 ? JSON.parse(item.vedic_api_response_list[0].vedic_api_response).response : JSON.parse(respone = 'none')) :  JSON.parse(response = "none"))}
                                                //     Send
                                                // </CButton>,
                                                <span>
                                                    <div
                                                        style={{
                                                            maxWidth: '65px',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            lineHeight: '17px',
                                                            cursor: clipboardIcon,
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
                    {/* {showDetailedView && <DetailedView item={selectedItem} />} */}
                    {showDetailedView && <DetailedView i_no={selectedItem.inquiry_number} />}
                    {/* {showDetailedView && <Test item={selectedItem} />} */}
                    {showVedicResponse && <div>
                        <button onClick={() => setShowVedicResponse(false)}>X</button><br />
                        {() => {
                            if ('response' in data.keys()) {
                                console.log(data)
                            }
                            else {
                                console.log(JSON.parse(data).response)
                                JSON.parse(data).response.toString()}
                            }
                        }
                    </div>}
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
