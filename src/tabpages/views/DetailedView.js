import React, { createContext, useContext, useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol, CBadge, CModal, CModalHeader, CTable, CTableHead, CTableHeaderCell, CTableBody, CTableDataCell, CTableRow } from '@coreui/react';
import SupportVisible from './SupportVisible';
import Submit from './Submit';
import { GetURL, GetToken } from '../../library/API';
import ReactTimeAgo from 'react-timeago';
import { UserContext } from '../Inquiry';
import { DetailedContext } from './TableView';
import { useToast } from '../../ToastComponent';
import { Modal, Button } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import '../../scss/style.scss'
import HoroscopePlanetDetail from './Vedic Plots/HoroscopePlanetDetail';
import MatchingNorthMatchWithAstro from './Vedic Plots/MatchingNorthMatchWithAstro';
import Panchang from './Vedic Plots/Panchang';
import DashaCurrentMahaDashaFull from './Vedic Plots/DashaCurrentMahaDashaFull';

export const commentContext = createContext();

const DetailedView = ({ i_no }) => {

    const [item, setItem] = useState(null)

    const [comments, setComments] = useState([]);
    const [expandedComments, setExpandedComments] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);

    const { fromPage, status, state, fetchInquiries, category_type } = useContext(UserContext);
    const { setShowDetailedView } = useContext(DetailedContext);
    const handleBackButtonClick = () => setShowDetailedView(false);
    const { showToast } = useToast();

    const [data, setData] = useState([]);
    const [showVedicResponse1and2, setShowVedicResponse1and2] = useState(false);
    const [showVedicResponse3, setShowVedicResponse3] = useState(false);
    const [showVedicResponse4, setShowVedicResponse4] = useState(false);
    const [showVedicResponse5, setShowVedicResponse5] = useState(false);

    const callVedicAPI = async (inquiry_id, vedic_api_type) => {
        try {
            const response = await fetch(GetURL(`/backend/InquiryManagement/CallVedicAPI?inquiry_id=${inquiry_id}&vedic_api_type_id=${vedic_api_type}`), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': GetToken()
                }
            })
            if (response.status == 200) {
                fetchSpecificInquiry(i_no);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const fetchSpecificInquiry = async (inq) => {
        try {
            const response = await fetch(GetURL(`/backend/InquiryManagement/GetInquiriyByNumber?inquiry_number=${inq}`), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken()
                }
            });
            const data = await response.json();
            const item = data.data.inquiry;
            setItem(item);
        } catch (e) {
            console.log(e);
        }
    };

    // const fetchSpecificInquiry = async (inq) => {
    //     try {
    //         const response = await fetch(GetURL(`/backend/InquiryManagement/GetInquiriyByNumber?inquiry_number=${inq}`), {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': GetToken()
    //             }
    //         });
    //         const data = await response.json();
    //         const item = data.data.inquiry;
    //         setItem(item);
    //         return item; // Return the item so we can use it right away if needed
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    
    // const callVedicAPI = async (inquiry_id, vedic_api_type) => {
    //     try {
    //         const response = await fetch(GetURL(`/backend/InquiryManagement/CallVedicAPI?inquiry_id=${inquiry_id}&vedic_api_type_id=${vedic_api_type}`), {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'authorization': GetToken()
    //             }
    //         });
    //         if (response.status === 200) {
    //             await fetchSpecificInquiry(inquiry_id); // Also await this inside callVedicAPI
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    
    
    useEffect(() => {

        fetchSpecificInquiry(i_no);

        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                handleBackButtonClick();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    useEffect(() => {
        const FetchComments = async (item) => {
            try {
                if (item && item.inquiry_id) {  // Check if item is not null and has inquiry_id
                    const response = await fetch(GetURL(`/backend/InquiryManagement/GetCommentHistory?inquiry_id=${item.inquiry_id}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': GetToken(),
                        },
                    });
                    const data = await response.json();
                    setComments(data.data.comment);
                }
            } catch (err) {
                showToast('Failed', 'Cannot fetch comments right now.', 2);
            }
        };

        if (item) {
            FetchComments(item);
        }
    }, [item]);

    const handleCheckmarkClick = (index) => {
        setSelectedCommentIndex(index);
        setShowConfirmation(true);
    };

    const handleConfirmPublish = () => {
        if (selectedCommentIndex !== null) {
            handlePublish(selectedCommentIndex);
            setShowConfirmation(false);
        }
    };

    const handleCloseModal = () => {
        setShowConfirmation(false);
    };

    const toggleExpanded = (index) => {
        setExpandedComments((prevState) => {
            if (prevState.includes(index)) {
                return prevState.filter((i) => i !== index);
            } else {
                return [...prevState, index];
            }
        });
    };

    const ProfileCard = ({ name, dob, tob, city_id, time_zone, visible, from }) => {
        return (
            <CCard
                className="mb-3"
                style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    width: '100%',
                    visibility: visible ? 'visible' : 'hidden',
                }}
            >
                <CCardHeader style={{ backgroundColor: '#f5f5f5', padding: '12px 20px' }}>
                    <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{from}</h5>
                </CCardHeader>
                <CCardBody style={{ padding: '10x 20px', fontSize: '13px', color: '#555' }}>
                    <strong>Name:</strong> {name || 'N/A'} <br />
                    <strong>DOB:</strong> {dob || 'N/A'} <br />
                    <strong>TOB:</strong> {Intl.DateTimeFormat('en-us', { hour: '2-digit', minute: '2-digit', hour12: true }).format((new Date(`1970-01-01T${tob}:00Z`))) || 'N/A'} <br />
                    <strong>POB:</strong> {city_id || 'N/A'} <br />
                    <strong>Timezone:</strong> {time_zone || 'N/A'}
                </CCardBody>
            </CCard>
        );
    };

    const handleReviewerPush = async () => {
        const latestComment = comments[0];
        const payload = {
            comment: latestComment?.description || '',
            inquiry_id: item.inquiry_id,
        };

        try {
            const response = await fetch(GetURL("/backend/InquiryManagement/PushComment"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken(),
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.error_code == 0) {
                    fetchInquiries(state, status);
                    setShowDetailedView(false);
                    showToast('Success', 'Inquiry set to publish!', 1);
                } else {
                    showToast('Failed', 'Unable to push inquiry.', 2);
                }
            } else {
                const errorData = await response.json();
                showToast('Error', errorData.message || 'Something went wrong!', 2);
            }
        } catch (err) {
            showToast('Error', 'An error occurred. Please try again later.', 2);
        }
    };

    const handlePublish = async () => {
        const latestComment = comments[0];
        const payload = {
            comment: latestComment?.description || 'Default Message. Nobody Commented. Please Contact Support',
            inquiry_id: item.inquiry_id,
        };

        try {
            const response = await fetch(GetURL("/backend/InquiryManagement/PublishInquiry"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken(),
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.error_code == 0) {
                    fetchInquiries(state, status);
                    setShowDetailedView(false);
                    showToast('Success', 'Inquiry published successfully!', 1);
                } else {
                    showToast('Failed', 'Unable to publish inquiry.', 2);
                }
            } else {
                const errorData = await response.json();
                showToast('Error', errorData.message || 'Something went wrong!', 2);
            }
        } catch (err) {
            showToast('Error', 'An error occurred. Please try again later.', 2);
        }
    };

    const getPlanet = async (inq_id, type) => {
        await callVedicAPI(inq_id, String(type));
        await fetchSpecificInquiry(i_no);
        let r_list = item.vedic_api_response_list;

        if (r_list == null || r_list == []) {
            alert("no vedic responses yet");
            return;
        }

        var index = 0;
        var found = false;

        for (let i = 0; i < r_list.length; i++) {
            console.log("i:", i)
            console.log(i, "data:", r_list[i].vedic_api_type_id)
            if (r_list[i].vedic_api_type_id == type) {
                index = i;
                found = true;
            }
        }

        if (found) {
            setData(JSON.parse(r_list[index].vedic_api_response).response)
        } else {
            return 0;
        }

        if (type == 1 || type == 2) {
            setShowVedicResponse3(false);
            setShowVedicResponse4(false);
            setShowVedicResponse5(false);
            setShowVedicResponse1and2(true);
        } else if (type == 3) {
            setShowVedicResponse1and2(false);
            setShowVedicResponse4(false);
            setShowVedicResponse5(false);
            setShowVedicResponse3(true);
        } else if (type == 4) {
            setShowVedicResponse1and2(false);
            setShowVedicResponse3(false);
            setShowVedicResponse5(false);
            setShowVedicResponse4(true);
        } else if (type == 5) {
            setShowVedicResponse1and2(false);
            setShowVedicResponse3(false);
            setShowVedicResponse4(false);
            setShowVedicResponse5(true);
        } else {
            alert("Error Fetching Type")
        }

    }

    // const getPlanet = async (inq_id, type) => {
    //     await callVedicAPI(inq_id, String(type));
    //     await fetchSpecificInquiry(i_no); // Make sure this is awaited properly
    
    //     // Now read the freshly updated item
    //     let updatedItem = await getUpdatedItem(); // You'll need to access the latest item, explained below
    //     let r_list = updatedItem?.vedic_api_response_list;
    
    //     if (!r_list || r_list.length === 0) {
    //         alert("no vedic responses yet");
    //         return;
    //     }
    
    //     let index = r_list.findIndex(r => r.vedic_api_type_id == type);
    //     if (index === -1) return;
    
    //     setData(JSON.parse(r_list[index].vedic_api_response).response);
    
    //     // set the response flags
    //     setShowVedicResponse1and2(type === 1 || type === 2);
    //     setShowVedicResponse3(type === 3);
    //     setShowVedicResponse4(type === 4);
    //     setShowVedicResponse5(type === 5);
    
    //     if (![1,2,3,4,5].includes(type)) {
    //         alert("Error Fetching Type");
    //     }
    // };
    

    if (item == null) {
        return <div>Null Item!</div>
    }

    return (
        <CModal visible={true}>
            <CModalHeader>
                <commentContext.Provider value={comments}>
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                background: 'white',
                                borderRadius: '8px',
                                overflow: 'auto',
                                width: '100%',
                                maxWidth: '100vw',
                                height: '100%',
                                maxHeight: '100vh',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                // paddingTop: `${navbarHeight}px`,
                            }}
                        >
                            <CCard
                                className="h-auto"
                                style={{
                                    borderRadius: '10px',
                                    border: 'none',
                                    width: '100%',
                                    padding: '0px 15px 0px 15px',
                                }}
                            >
                                {/* First Row: Back Button, Purchased Info, and Payment Badge */}
                                <CCardHeader
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '15px',
                                        backgroundColor: '#FFFFFF',
                                        color: '#FF9933',
                                        borderRadius: '10px 10px 0 0',
                                        fontWeight: 500,
                                        width: '100%',
                                    }}
                                >
                                    <button onClick={async () => {
                                        const category = category_type.find(e => e.id == item.category_type_id)?.name;
                                        fetch("http://localhost:3001/send-notification", {
                                            method: 'POST',
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                "title": category + " - " + item.question,
                                                "body": "Click here to view reply",
                                                "deviceToken": "fU4TlznlS16sYApf8b_p_c:APA91bHLN1J0dVEGqYDE9764Yi0zvSZG7DRIIdr0E3YAuAT-dT2f_oy5RpMrLQwKfp2_-fFt480fpsgM5k9L1F5gueNyIfr-a1kAZhjvPwSMqHCyDsBc9tM",
                                                "data": {
                                                    "route": "/chat",
                                                    "inquiry_id": item.inquiry_id,
                                                    "inquiry": item
                                                }
                                            })
                                        });
                                    }}>Send Notification</button>
                                    <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                                        {/* Back Button */}
                                        <CButton
                                            color="secondary"
                                            style={{
                                                flex: '0 0 6%',
                                                marginRight: '15px',
                                                padding: '8px 15px',
                                                backgroundColor: '#fff',
                                                color: '#FF9933',
                                                border: '1px solid #FF9933',
                                                borderRadius: '5px',
                                                fontWeight: 600,
                                            }}
                                            onClick={handleBackButtonClick}
                                        >
                                            <span className="material-icons"><FaSignOutAlt /></span>
                                        </CButton>
                                        {/* Purchased Info */}
                                        <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 600, fontSize: '16px' }}>Purchased: &nbsp;<ReactTimeAgo date={item.purchased_on} /></span>
                                            {/* Payment Badge */}
                                            <CBadge
                                                style={{
                                                    padding: '5px 10px',
                                                    borderRadius: '5px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: 'white',
                                                    backgroundColor: !item.payment_successful ? '#556B2F' : 'darkred'
                                                }}
                                            >
                                                {!item.payment_successful ? 'Paid' : 'Cancelled'}
                                            </CBadge>
                                        </div>
                                    </div>
                                </CCardHeader>
                                {/* Second Row: Category Name and Question */}
                                <CCardHeader
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '15px 15px 15px 15px',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '0 0 10px 10px',
                                        fontWeight: 500,
                                        width: '100%',
                                    }}
                                >
                                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 200 }}>
                                        {category_type.find(e => e.id == item.category_type_id)?.name} - {item.question} {
                                            (() => {
                                                if (item.auspicious_from_date == null && item.horoscope_from_date == null) {
                                                    return null;
                                                } else if (item.auspicious_from_date == null) {
                                                    return <>- Start From: {item.horoscope_from_date.split('T')[0]}</>;
                                                } else if (item.horoscope_from_date == null) {
                                                    return <>- Start From: {item.auspicious_from_date.split('T')[0]}</>;
                                                } else {
                                                    return null;
                                                }
                                            })()
                                        }
                                    </h4>

                                    {(localStorage.getItem('user_type_id') == 1 || localStorage.getItem('user_type_id') == 3) && (
                                        <span style={{ display: 'flex', flexDirection: 'row', alignSelf: 'flex-end' }}>
                                            <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginLeft: '1px' }} onClick={() => getPlanet(item.inquiry_id, 1)}>
                                                API 1
                                            </CButton>
                                            <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginLeft: '1px' }} onClick={() => getPlanet(item.inquiry_id, 2)}>
                                                API 2
                                            </CButton>
                                            <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginLeft: '1px' }} onClick={() => getPlanet(item.inquiry_id, 3)}>
                                                API 3
                                            </CButton>
                                            <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginLeft: '1px' }} onClick={() => getPlanet(item.inquiry_id, 4)}>
                                                API 4
                                            </CButton>
                                            <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginLeft: '1px' }} onClick={() => getPlanet(item.inquiry_id, 5)}>
                                                API 5
                                            </CButton>
                                        </span>
                                    )}
                                </CCardHeader>

                            </CCard>
                            {/* Content Section: Vertical Split Begins Below Header */}
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <CCard
                                    className="h-100 d-flex flex-column"
                                    style={{
                                        borderRadius: '10px',
                                        border: 'none',
                                        width: '50%', // 50% width for the profile section
                                        padding: '0px 20px 0px 20px',
                                    }}
                                >
                                    <CCardBody className="d-flex flex-column h-100" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                        <CRow
                                            className="justify-content-center"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row', // Ensures cards are placed side by side
                                                alignItems: 'stretch',
                                            }}
                                        >
                                            <CCol
                                                style={{
                                                    width: '50%', // Each profile takes 50% width
                                                    padding: '5px',
                                                    boxSizing: 'border-box',
                                                }}
                                            >
                                                <ProfileCard
                                                    name={item.profile1.name}
                                                    dob={item.profile1.dob}
                                                    tob={item.profile1.tob}
                                                    city_id={item.profile1.city.city_ascii}
                                                    time_zone={item.profile1.tz.toString()}
                                                    visible={true}
                                                    from={"Profile 1"}
                                                />
                                            </CCol>
                                            {/* Only display Profile 2 if available */}
                                            {item.profile2 && (
                                                <CCol
                                                    style={{
                                                        width: '50%', // Each profile takes 50% width
                                                        padding: '5px',
                                                        boxSizing: 'border-box',
                                                    }}
                                                >
                                                    <ProfileCard
                                                        name={item.profile2.name}
                                                        dob={item.profile2.dob}
                                                        tob={item.profile2.tob}
                                                        city_id={item.profile2.city.city_ascii}
                                                        time_zone={item.profile1.tz}
                                                        visible={item.profile2}
                                                        from={"Profile 2"}
                                                    />
                                                </CCol>
                                            )}
                                        </CRow>
                                        {item.comment_for_assignee != null ?
                                            <CRow
                                                className="justify-content-center"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'stretch',
                                                }}
                                            >
                                                Comment for you: {item.comment_for_assignee}
                                            </CRow> : null
                                        }
                                        <CRow
                                            className="justify-content-center"
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'stretch',
                                            }}
                                        >
                                            {
                                                (() => {
                                                    // var x = localStorage.getItem('user_type_id');
                                                    var x = useContext(UserContext).id;
                                                    if (x == 1 || x == 2) {
                                                        // if (fromPage === 'reviewer') {
                                                        //     if (status === 'completed') {
                                                        //         return <>
                                                        //             <SupportVisible currentTask={item} inquiry_id={item.inquiry_id}/>
                                                        //         </>
                                                        //     }
                                                        // }
                                                        // Users 1 & 2: Always show SupportVisible
                                                        return <SupportVisible currentTask={item} inquiry_id={item.inquiry_id} />;
                                                    }
                                                    else if ((x == 3 && fromPage === 'expert') || (x == 4 && fromPage === 'translator')) {
                                                        // Users 3, 4, & 5: Show Submit if status is pending
                                                        if (status === 'pending') {
                                                            return <Submit inquiry_id={item.inquiry_id} />;
                                                        }
                                                    }
                                                    else if ((x == 5 && fromPage === 'reviewer')) {
                                                        if (status === 'pending') {
                                                            return <CButton onClick={handleReviewerPush} style={{ marginTop: '20px', backgroundColor: '#ff9933', color: 'white' }}>Approve</CButton>
                                                        }
                                                    }
                                                    return <>-/-</>; // Render nothing for all other cases
                                                })()
                                            }
                                        </CRow>
                                    </CCardBody>
                                </CCard>
                                {/* Divider between profiles and comment/task section */}
                                <div
                                    style={{
                                        borderLeft: '2px solid #e0e0e0',
                                        height: '100%',
                                    }}
                                ></div>
                                <CCard
                                    className="h-100 d-flex flex-column"
                                    style={{
                                        borderRadius: '10px',
                                        border: 'none',
                                        width: '50%', // 50% width for the comment/task section
                                        padding: '20px',
                                    }}
                                >
                                    <CCardBody className="d-flex flex-column h-100" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                        {comments.length > 0 && (
                                            <div
                                                style={{
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    padding: '12px 18px',
                                                    backgroundColor: '#f9f9f9',
                                                    maxHeight: '60vh',
                                                    overflowY: 'auto',
                                                }}
                                            >
                                                <div className="text-center mb-4">
                                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                                        {comments.map((m, index) => {
                                                            const isLatestComment = index === 0;
                                                            const isPendingReviewer = (fromPage === 'reviewer' && status === 'completed');
                                                            return (
                                                                <li
                                                                    key={index}
                                                                    style={{
                                                                        paddingBottom: '12px',
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        border: '1px solid #ddd',
                                                                        borderRadius: '8px',
                                                                        padding: '10px',
                                                                        marginBottom: '8px',
                                                                        backgroundColor: '#fff',
                                                                    }}
                                                                >
                                                                    {(useContext(UserContext).id == 1 || useContext(UserContext).id == 2) && isLatestComment && isPendingReviewer && (
                                                                        <div
                                                                            onClick={() => {
                                                                                handleCheckmarkClick(index);
                                                                                const category = category_type.find(e => e.id == item.category_type_id)?.name;
                                                                                fetch("http://localhost:3001/send-notification", {
                                                                                    method: 'POST',
                                                                                    headers: {
                                                                                        "Content-Type": "application/json"
                                                                                    },
                                                                                    body: JSON.stringify({
                                                                                        "title": category + " - " + item.question,
                                                                                        "body": "Click here to view reply",
                                                                                        "deviceToken": "fU4TlznlS16sYApf8b_p_c:APA91bHLN1J0dVEGqYDE9764Yi0zvSZG7DRIIdr0E3YAuAT-dT2f_oy5RpMrLQwKfp2_-fFt480fpsgM5k9L1F5gueNyIfr-a1kAZhjvPwSMqHCyDsBc9tM",
                                                                                        "data": {
                                                                                            "route": "/chat",
                                                                                            "inquiry_id": item.inquiry_id,
                                                                                            "inquiry": item
                                                                                        }
                                                                                    })
                                                                                })
                                                                            }}
                                                                            style={{
                                                                                color: '#ff9933',
                                                                                fontSize: '16px',
                                                                                cursor: 'pointer',
                                                                                marginRight: '8px',
                                                                                borderWidth: '1px 1px 1px 1px',
                                                                                borderColor: '#ff9933',
                                                                                borderStyle: 'solid'
                                                                            }}
                                                                        >
                                                                            Publish
                                                                        </div>
                                                                    )}
                                                                    <div
                                                                        style={{
                                                                            fontSize: '13px',
                                                                            color: '#888',
                                                                            marginBottom: '5px',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                        }}
                                                                    >
                                                                        {Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(m.updated_on))} | {m.updated_on.split("T")[0]} | {m.assignee}
                                                                    </div>
                                                                    <div style={{ height: '8px' }}></div>
                                                                    <div
                                                                        style={{
                                                                            fontSize: '14px',
                                                                            color: '#333',
                                                                            textAlign: 'left',
                                                                            whiteSpace: 'pre-wrap',
                                                                            overflow: 'hidden',
                                                                            display: '-webkit-box',
                                                                            WebkitBoxOrient: 'vertical',
                                                                            WebkitLineClamp: expandedComments.includes(index) || isLatestComment ? 'none' : 3,
                                                                        }}
                                                                    >
                                                                        {m.description}
                                                                    </div>
                                                                    {!isLatestComment && !expandedComments.includes(index) && m.description.length > 0 && (
                                                                        <button
                                                                            style={{
                                                                                background: 'none',
                                                                                border: 'none',
                                                                                color: '#ff9c33',
                                                                                cursor: 'pointer',
                                                                                padding: '0',
                                                                                textDecoration: 'none',
                                                                            }}
                                                                            onClick={() => toggleExpanded(index)}
                                                                        >
                                                                            View More
                                                                        </button>
                                                                    )}
                                                                    {expandedComments.includes(index) && (
                                                                        <button
                                                                            style={{
                                                                                background: 'none',
                                                                                border: 'none',
                                                                                color: '#ff9c33',
                                                                                cursor: 'pointer',
                                                                                padding: '0',
                                                                                textDecoration: 'none',
                                                                            }}
                                                                            onClick={() => toggleExpanded(index)}
                                                                        >
                                                                            View Less
                                                                        </button>
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                        {/* Confirmation Modal */}
                                        <Modal show={showConfirmation} onHide={handleCloseModal}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirm Publish</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure you want to publish this comment?</Modal.Body>
                                            <Modal.Footer>
                                                <Button style={{ backgroundColor: '#ff9933', border: 'none' }} onClick={handleConfirmPublish}>
                                                    Yes
                                                </Button>
                                                <Button variant="secondary" style={{ border: 'none' }} onClick={handleCloseModal}>
                                                    No
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </CCardBody>
                                </CCard>
                            </div>

                            {(showVedicResponse1and2 && data != null) && (
                                <div>
                                    <button onClick={() => setShowVedicResponse1and2(false)}><CIcon icon={cilX} size='sm' /></button>
                                    <br />
                                    <HoroscopePlanetDetail data={data} getPlanet={getPlanet} item={item}/>
                                </div>
                            )}
                            {(showVedicResponse3 && data != null) && (
                                <div>
                                    <button onClick={() => setShowVedicResponse3(false)}><CIcon icon={cilX} size='sm' /></button>
                                    <br />
                                    <MatchingNorthMatchWithAstro data={data} getPlanet={getPlanet} item={item}/>
                                </div>
                            )}
                            {(showVedicResponse4 && data != null) && (
                                <div>
                                    <button onClick={() => setShowVedicResponse4(false)}><CIcon icon={cilX} size='sm' /></button>
                                    <br />
                                    <Panchang data={data} getPlanet={getPlanet} item={item}/>
                                </div>
                            )}
                            {(showVedicResponse5 && data != null) && (
                                <div>
                                    <button onClick={() => setShowVedicResponse5(false)}><CIcon icon={cilX} size='sm' /></button>
                                    <br />
                                    <DashaCurrentMahaDashaFull data={data} getPlanet={getPlanet} item={item}/>
                                </div>
                            )}
                        </div>
                    </div>
                </commentContext.Provider>
            </CModalHeader>
        </CModal>
    );
};

export default DetailedView;
