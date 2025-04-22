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
                await fetchSpecificInquiry(i_no);
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
    }, [item, data])
    
    useEffect(() => {
        // fetchSpecificInquiry(i_no);

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

    const [loading, setLoading] = useState(false);

    // const getPlanet = async (inq_id, type) => {
    //     try {
    //         setLoading(true)
    //         await callVedicAPI(inq_id, String(type));
    //         await fetchSpecificInquiry(i_no);
    //         let r_list = item.vedic_api_response_list;
    
    //         if (r_list == null || r_list == []) {
    //             alert("no vedic responses yet");
    //             return;
    //         }
    
    //         var index = 0;
    //         var found = false;
    
    //         for (let i = 0; i < r_list.length; i++) {
    //             console.log("i:", i)
    //             console.log(i, "data:", r_list[i].vedic_api_type_id)
    //             if (r_list[i].vedic_api_type_id == type) {
    //                 index = i;
    //                 found = true;
    //             }
    //         }
    
    //         if (found) {
    //             setData(JSON.parse(r_list[index].vedic_api_response).response)
    //         } else {
    //             return 0;
    //         }
    
    //         if (type == 1 || type == 2) {
    //             setShowVedicResponse3(false);
    //             setShowVedicResponse4(false);
    //             setShowVedicResponse5(false);
    //             setShowVedicResponse1and2(true);
    //         } else if (type == 3) {
    //             setShowVedicResponse1and2(false);
    //             setShowVedicResponse4(false);
    //             setShowVedicResponse5(false);
    //             setShowVedicResponse3(true);
    //         } else if (type == 4) {
    //             setShowVedicResponse1and2(false);
    //             setShowVedicResponse3(false);
    //             setShowVedicResponse5(false);
    //             setShowVedicResponse4(true);
    //         } else if (type == 5) {
    //             setShowVedicResponse1and2(false);
    //             setShowVedicResponse3(false);
    //             setShowVedicResponse4(false);
    //             setShowVedicResponse5(true);
    //         } else {
    //             alert("Error Fetching Type")
    //         }
    
    //     } catch (error) {
    //         console.error("Failed to get planet:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const getPlanet = (inq_id, type) => {
             callVedicAPI(inq_id, String(type));
             fetchSpecificInquiry(i_no);
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
                                                Horoscope Planet Detail (Current)
                                            </CButton>
                                            <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginLeft: '1px' }} onClick={() => getPlanet(item.inquiry_id, 2)}>
                                                Horoscope Planet Detail (Birth)
                                            </CButton>
                                            <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginLeft: '1px' }} onClick={() => getPlanet(item.inquiry_id, 3)}>
                                                Matching North Match With Astro
                                            </CButton>
                                            <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginLeft: '1px' }} onClick={() => getPlanet(item.inquiry_id, 4)}>
                                                Panchang
                                            </CButton>
                                            <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginLeft: '1px' }} onClick={() => getPlanet(item.inquiry_id, 5)}>
                                                Dasha Current Maha Dasha Full
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
                                                    var x = useContext(UserContext).id;
                                                    if (x == 1 || x == 2) {
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

                            {loading? (<div>Loading...</div>) : (<>
                            {(showVedicResponse1and2 && data != null) && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}><CButton onClick={() => setShowVedicResponse1and2(false)} style={{ marginRight: '50px' }} size='sm' color='secondary' variant='outline'><CIcon icon={cilX} size='sm' /></CButton></div>
                                    <br />
                                    {
                                        (() => {
                                            return <div className="container text-center">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-table-main" style={{ marginBottom: '5px' }}>
                                                            <CTableHead>
                                                                <CTableRow>
                                                                    <CTableHeaderCell></CTableHeaderCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableHeaderCell className='text-center' key={e}>
                                                                                {data[`${e}`].name}
                                                                            </CTableHeaderCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                            </CTableHead>
                                                            <CTableBody>
                                                                <CTableRow>
                                                                    <CTableDataCell>Full Name</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].full_name}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Local Degree</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        const localDegree = data[`${e}`].local_degree;
                                                                        return (
                                                                            <CTableDataCell key={e} className='text-warp'>
                                                                                {localDegree.toFixed(2)}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Global Degree</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        const globalDegree = data[`${e}`].global_degree;
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {globalDegree.toFixed(2)}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Process%</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        const progressPercentage = data[`${e}`].progress_in_percentage;
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {progressPercentage.toFixed(2)}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Rasi Number</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].rasi_no}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Zodiac</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].zodiac}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>House</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].house}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Speed Radians/Day</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].speed_radians_per_day}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Retro</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].retro ? 'True' : 'False'}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Nakshtra</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].nakshatra}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Nakshatra Lord</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].nakshatra_lord}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Nakshatra Pada</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].nakshatra_pada}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Nakshatra Number</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].nakshatra_no}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Zodiac Lord</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].zodiac_lord}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Lord Status</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].lord_status}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Basic Avastha</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].basic_avastha}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Is Planet Set?</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].is_planet_set ? 'True' : 'False'}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                                <CTableRow>
                                                                    <CTableDataCell>Is Combust</CTableDataCell>
                                                                    {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                        return (
                                                                            <CTableDataCell key={e}>
                                                                                {data[`${e}`].is_combust ? 'True' : 'False'}
                                                                            </CTableDataCell>
                                                                        );
                                                                    })}
                                                                </CTableRow>
                                                            </CTableBody>
                                                        </CTable>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="row">
                                                            <div className="col">
                                                                <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-small-1" style={{ width: '100%' }}>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Birth Dasa</CTableHeaderCell>
                                                                            <CTableDataCell>{data.birth_dasa}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Current Dasa</CTableHeaderCell>
                                                                            <CTableDataCell>{data.current_dasa}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Birth Dasa Time</CTableHeaderCell>
                                                                            <CTableDataCell>{data.birth_dasa_time}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Current Dasa Time</CTableHeaderCell>
                                                                            <CTableDataCell>{data.current_dasa_time}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-small-2" style={{ width: '100%' }}>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Rasi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.rasi}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Nakshatra</CTableHeaderCell>
                                                                            <CTableDataCell>{data.nakshatra}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Nakshatra Pada</CTableHeaderCell>
                                                                            <CTableDataCell>{data.nakshatra_pada}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-small-3" style={{ width: '100%' }}>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Lucky Gem</CTableHeaderCell>
                                                                            <CTableDataCell>{data.lucky_gem.join(", ")}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Lucky Number</CTableHeaderCell>
                                                                            <CTableDataCell>{data.lucky_num.join(", ")}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Lucky Colors</CTableHeaderCell>
                                                                            <CTableDataCell>{data.lucky_colors.join(", ")}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Lucky Letters</CTableHeaderCell>
                                                                            <CTableDataCell>{data.lucky_letters.join(", ")}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Lucky Name Start</CTableHeaderCell>
                                                                            <CTableDataCell>{data.lucky_name_start.join(", ")}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-2'>
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <CTable className="w-30 table-striped table-bordered table-hover table-sm table-responsive" id='vedic-med-1'>
                                                                    <CTableHead>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2} className='text-center'>
                                                                                Panchang
                                                                            </CTableHeaderCell>
                                                                        </CTableRow>
                                                                    </CTableHead>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Ayanamsa</CTableHeaderCell>
                                                                            <CTableDataCell>{data.panchang.ayanamsa}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Ayanamsa Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.panchang.ayanamsa_name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Date Of Birth</CTableHeaderCell>
                                                                            <CTableDataCell>{data.panchang.day_of_birth}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Day Lord</CTableHeaderCell>
                                                                            <CTableDataCell>{data.panchang.day_lord}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Hora Lord</CTableHeaderCell>
                                                                            <CTableDataCell>{data.panchang.hora_lord}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Sunrise At Birth</CTableHeaderCell>
                                                                            <CTableDataCell>{data.panchang.sunrise_at_birth}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Sunset At Birth</CTableHeaderCell>
                                                                            <CTableDataCell>{data.panchang.sunset_at_birth}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Karana</CTableHeaderCell>
                                                                            <CTableDataCell>{data.panchang.karana}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Toga</CTableHeaderCell>
                                                                            <CTableDataCell>{data.panchang.yoga}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Tithi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.panchang.tithi}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <CTable className="w-30 table-striped table-bordered table-hover table-sm table-responsive" id='vedic-med-2'>
                                                                    <CTableHead>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2} className='text-center'>
                                                                                Ghatka Chakra
                                                                            </CTableHeaderCell>
                                                                        </CTableRow>
                                                                    </CTableHead>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Rasi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.ghatka_chakra.rasi}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Tithi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.ghatka_chakra.tithi.join(", ")}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Day</CTableHeaderCell>
                                                                            <CTableDataCell>{data.ghatka_chakra.day}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Nakshatra</CTableHeaderCell>
                                                                            <CTableDataCell>{data.ghatka_chakra.nakshatra}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Tatva</CTableHeaderCell>
                                                                            <CTableDataCell>{data.ghatka_chakra.tatva}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Lord</CTableHeaderCell>
                                                                            <CTableDataCell>{data.ghatka_chakra.lord}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Same Sex Lagna</CTableHeaderCell>
                                                                            <CTableDataCell>{data.ghatka_chakra.same_sex_lagna}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Opposite Sex Lagna</CTableHeaderCell>
                                                                            <CTableDataCell>{data.ghatka_chakra.opposite_sex_lagna}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-1' style={{ alignContent: 'center' }}>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 1)}>
                                                            Horoscope Planet Detail (Current)
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 2)}>
                                                            Horoscope Planet Detail (Birth)
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 3)}>
                                                            Matching North Match With Astro
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 4)}>
                                                            Panchang
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 5)}>
                                                            Dasha Current Maha Dasha Full
                                                        </CButton>
                                                    </div>
                                                </div>
                                            </div>
                                        })()
                                    }
                                </div>
                            )}
                            {(showVedicResponse3 && data != null) && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}><CButton onClick={() => setShowVedicResponse3(false)} style={{ marginRight: '50px' }} size='sm' color='secondary' variant='outline'><CIcon icon={cilX} size='sm' /></CButton></div>
                                    <br />
                                    {
                                        (() => {

                                            return <div className='container text-center' style={{ margin: '0px', marginLeft: '5px', marginBottom: '5px' }}>
                                                <div className='row'>
                                                    <div className='col-11'>
                                                        <div className='row' style={{ fontSize: 'xx-small' }}>
                                                            Score: {data.score} | Bot Response: {data.bot_response}
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col compact-1'>
                                                                <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2}>Tara</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Tara</CTableHeaderCell>
                                                                            <CTableDataCell>{data.tara.tara}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Boy Tara</CTableHeaderCell>
                                                                            <CTableDataCell>{data.tara.boy_tara}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Girl Tara</CTableHeaderCell>
                                                                            <CTableDataCell>{data.tara.girl_tara}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.tara.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Description</CTableHeaderCell>
                                                                            <CTableDataCell>{data.tara.description}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Full Score</CTableHeaderCell>
                                                                            <CTableDataCell>{data.tara.full_score}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col compact-1'>
                                                                <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2}>Gana</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Gana</CTableHeaderCell>
                                                                            <CTableDataCell>{data.gana.gana}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Boy Gana</CTableHeaderCell>
                                                                            <CTableDataCell>{data.gana.boy_gana}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Girl Gana</CTableHeaderCell>
                                                                            <CTableDataCell>{data.gana.girl_gana}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.gana.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Description</CTableHeaderCell>
                                                                            <CTableDataCell>{data.gana.description}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Full Score</CTableHeaderCell>
                                                                            <CTableDataCell>{data.gana.full_score}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col compact-1'>
                                                                <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2}>Yoni</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Yoni</CTableHeaderCell>
                                                                            <CTableDataCell>{data.yoni.yoni}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Boy Yoni</CTableHeaderCell>
                                                                            <CTableDataCell>{data.yoni.boy_yoni}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Girl Yoni</CTableHeaderCell>
                                                                            <CTableDataCell>{data.yoni.girl_yoni}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.yoni.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Description</CTableHeaderCell>
                                                                            <CTableDataCell>{data.yoni.description}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Full Score</CTableHeaderCell>
                                                                            <CTableDataCell>{data.yoni.full_score}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col compact-1'>
                                                                <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2}>Bhakoot</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Bhakoot</CTableHeaderCell>
                                                                            <CTableDataCell>{data.bhakoot.bhakoot}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Boy Rasi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.bhakoot.boy_rasi}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Girl Rasi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.bhakoot.girl_rasi}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Boy Rasi Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.bhakoot.boy_rasi_name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Girl Rasi Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.bhakoot.girl_rasi_name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.bhakoot.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Description</CTableHeaderCell>
                                                                            <CTableDataCell>{data.bhakoot.description}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Full Score</CTableHeaderCell>
                                                                            <CTableDataCell>{data.bhakoot.full_score}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col compact-1'>
                                                                <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2}>Grahamaitri</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Grahamaitri</CTableHeaderCell>
                                                                            <CTableDataCell>{data.grahamaitri.grahamaitri}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Boy Lord</CTableHeaderCell>
                                                                            <CTableDataCell>{data.grahamaitri.boy_lord}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Girl Lord</CTableHeaderCell>
                                                                            <CTableDataCell>{data.grahamaitri.girl_lord}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.grahamaitri.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Description</CTableHeaderCell>
                                                                            <CTableDataCell>{data.grahamaitri.description}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Full Score</CTableHeaderCell>
                                                                            <CTableDataCell>{data.grahamaitri.full_score}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col compact-1'>
                                                                <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2}>Vasya</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Vasya</CTableHeaderCell>
                                                                            <CTableDataCell>{data.vasya.vasya}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Boy Vasya</CTableHeaderCell>
                                                                            <CTableDataCell>{data.vasya.boy_vasya}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Girl Vasya</CTableHeaderCell>
                                                                            <CTableDataCell>{data.vasya.girl_vasya}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.vasya.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Description</CTableHeaderCell>
                                                                            <CTableDataCell>{data.vasya.description}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Full Score</CTableHeaderCell>
                                                                            <CTableDataCell>{data.vasya.full_score}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col compact-1'>
                                                                <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2}>Nadi</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Nadi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.nadi.nadi}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Boy Nadi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.nadi.boy_nadi}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Girl Nadi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.nadi.girl_nadi}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.nadi.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Description</CTableHeaderCell>
                                                                            <CTableDataCell>{data.nadi.description}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Full Score</CTableHeaderCell>
                                                                            <CTableDataCell>{data.nadi.full_score}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col compact-1'>
                                                                <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2}>Varna</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Varna</CTableHeaderCell>
                                                                            <CTableDataCell>{data.varna.varna}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Boy Varna</CTableHeaderCell>
                                                                            <CTableDataCell>{data.varna.boy_varna}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Girl Varna</CTableHeaderCell>
                                                                            <CTableDataCell>{data.varna.girl_varna}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.varna.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Description</CTableHeaderCell>
                                                                            <CTableDataCell>{data.varna.description}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Full Score</CTableHeaderCell>
                                                                            <CTableDataCell>{data.varna.full_score}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col-1' style={{ alignContent: 'center' }}>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 1)}>
                                                            Horoscope Planet Detail (Current)
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 2)}>
                                                            Horoscope Planet Detail (Birth)
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 3)}>
                                                            Matching North Match With Astro
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 4)}>
                                                            Panchang
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 5)}>
                                                            Dasha Current Maha Dasha Full
                                                        </CButton>
                                                    </div>
                                                        </div>
                                                        <div className='row' style={{ margin: 'none', marginTop: '5px', flexWrap: 'nowrap' }}>
                                                            <div className='col'>
                                                                <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-table-main">
                                                                    <CTableHead>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Boy Planetary Details</CTableHeaderCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableHeaderCell className='text-center' key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].name}
                                                                                    </CTableHeaderCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                    </CTableHead>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Full Name</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].full_name}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Local Degree</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                const localDegree = data.boy_planetary_details[`${e}`].local_degree;
                                                                                return (
                                                                                    <CTableDataCell key={e} className='text-warp'>
                                                                                        {localDegree.toFixed(2)}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Global Degree</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                const globalDegree = data.boy_planetary_details[`${e}`].global_degree;
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {globalDegree.toFixed(2)}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Process%</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                const progressPercentage = data.boy_planetary_details[`${e}`].progress_in_percentage;
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {progressPercentage.toFixed(2)}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Rasi Number</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].rasi_no}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Zodiac</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].zodiac}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>House</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].house}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Speed Radians/Day</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].speed_radians_per_day}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Retro</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].retro ? 'True' : 'False'}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Nakshtra</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].nakshatra}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Nakshatra Lord</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].nakshatra_lord}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Nakshatra Pada</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].nakshatra_pada}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Nakshatra Number</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].nakshatra_no}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Zodiac Lord</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].zodiac_lord}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Lord Status</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].lord_status}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Basic Avastha</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].basic_avastha}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Is Planet Set?</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].is_planet_set ? 'True' : 'False'}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Is Combust</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.boy_planetary_details[`${e}`].is_combust ? 'True' : 'False'}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable className="table-striped table-bordered table-hover table-sm table-responsive" id="vedic-table-main">
                                                                    <CTableHead>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Girl Planetary Details</CTableHeaderCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableHeaderCell className='text-center' key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].name}
                                                                                    </CTableHeaderCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                    </CTableHead>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Full Name</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].full_name}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Local Degree</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                const localDegree = data.girl_planetary_details[`${e}`].local_degree;
                                                                                return (
                                                                                    <CTableDataCell key={e} className='text-warp'>
                                                                                        {localDegree.toFixed(2)}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Global Degree</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                const globalDegree = data.girl_planetary_details[`${e}`].global_degree;
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {globalDegree.toFixed(2)}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Process%</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                const progressPercentage = data.girl_planetary_details[`${e}`].progress_in_percentage;
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {progressPercentage.toFixed(2)}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Rasi Number</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].rasi_no}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Zodiac</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].zodiac}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>House</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].house}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Speed Radians/Day</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].speed_radians_per_day}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Retro</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].retro ? 'True' : 'False'}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Nakshtra</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].nakshatra}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Nakshatra Lord</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].nakshatra_lord}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Nakshatra Pada</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].nakshatra_pada}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Nakshatra Number</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].nakshatra_no}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Zodiac Lord</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].zodiac_lord}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Lord Status</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].lord_status}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Basic Avastha</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].basic_avastha}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Is Planet Set?</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].is_planet_set ? 'True' : 'False'}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableDataCell>Is Combust</CTableDataCell>
                                                                            {Array.from({ length: 10 }, (_, index) => index).map(e => {
                                                                                return (
                                                                                    <CTableDataCell key={e}>
                                                                                        {data.girl_planetary_details[`${e}`].is_combust ? 'True' : 'False'}
                                                                                    </CTableDataCell>
                                                                                );
                                                                            })}
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                        <div className='row' >
                                                            <div className='col'>
                                                                <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={4}>Boy Astro Details</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Gana</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.gana}</CTableDataCell>
                                                                            <CTableHeaderCell>Lucky Gem</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.lucky_gem.join(', ')}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Yoni</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.yoni}</CTableDataCell>
                                                                            <CTableHeaderCell>Lucky Num</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.lucky_num.join(', ')}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Vasya</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.vasya}</CTableDataCell>
                                                                            <CTableHeaderCell>Lucky Colors</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.lucky_colors.join(', ')}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Nadi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.nadi}</CTableDataCell>
                                                                            <CTableHeaderCell>Lucky Letters</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.lucky_letters.join(', ')}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Varna</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.varna}</CTableDataCell>
                                                                            <CTableHeaderCell>Lucky Name Start</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.lucky_name_start.join(', ')}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Paya</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.paya}</CTableDataCell>
                                                                            <CTableHeaderCell>Rasi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.rasi}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Tatva</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.tatva}</CTableDataCell>
                                                                            <CTableHeaderCell>Nakshatra</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.nakshatra}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Birth Dasa</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.birth_dasa}</CTableDataCell>
                                                                            <CTableHeaderCell>Nakshatra Pada</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.nakshatra_pada}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Current Dasa</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.current_dasa}</CTableDataCell>
                                                                            <CTableHeaderCell>Ascendant Sign</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.ascendant_sign}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Birth Dasa Time</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.birth_dasa_time}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Current Dasa Time</CTableHeaderCell>
                                                                            <CTableDataCell>{data.boy_astro_details.current_dasa_time}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable style={{ fontSize: 'xx-small' }} className='table-sm p-0 m-0' bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={4}>Girl Astro Details</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Gana</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.gana}</CTableDataCell>
                                                                            <CTableHeaderCell>Lucky Gem</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.lucky_gem.join(', ')}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Yoni</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.yoni}</CTableDataCell>
                                                                            <CTableHeaderCell>Lucky Num</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.lucky_num.join(', ')}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Vasya</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.vasya}</CTableDataCell>
                                                                            <CTableHeaderCell>Lucky Colors</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.lucky_colors.join(', ')}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Nadi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.nadi}</CTableDataCell>
                                                                            <CTableHeaderCell>Lucky Letters</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.lucky_letters.join(', ')}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Varna</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.varna}</CTableDataCell>
                                                                            <CTableHeaderCell>Lucky Name Start</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.lucky_name_start.join(', ')}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Paya</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.paya}</CTableDataCell>
                                                                            <CTableHeaderCell>Rasi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.rasi}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Tatva</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.tatva}</CTableDataCell>
                                                                            <CTableHeaderCell>Nakshatra</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.nakshatra}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Birth Dasa</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.birth_dasa}</CTableDataCell>
                                                                            <CTableHeaderCell>Nakshatra Pada</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.nakshatra_pada}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Current Dasa</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.current_dasa}</CTableDataCell>
                                                                            <CTableHeaderCell>Ascendant Sign</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.ascendant_sign}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Birth Dasa Time</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.birth_dasa_time}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Current Dasa Time</CTableHeaderCell>
                                                                            <CTableDataCell>{data.girl_astro_details.current_dasa_time}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })()
                                    }
                                </div>
                            )}
                            {(showVedicResponse4 && data != null) && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}><CButton onClick={() => setShowVedicResponse4(false)} style={{ marginRight: '50px' }} size='sm' color='secondary' variant='outline'><CIcon icon={cilX} size='sm' /></CButton></div>
                                    <br />
                                    {
                                        (() => {

                                            return <div className='container text-center' style={{ marginBottom: '5px' }}>
                                                <div className='row'>
                                                    <div className='col-11'>
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <CTable className="table-sm p-0 m-0" style={{ fontSize: 'xx-small' }} bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Day</CTableHeaderCell>
                                                                            <CTableDataCell>{data.day.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Rasi</CTableHeaderCell>
                                                                            <CTableDataCell>{data.rasi.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Ayanamsa</CTableHeaderCell>
                                                                            <CTableDataCell>{data.ayanamsa.name}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable className="table-sm p-0 m-0" style={{ fontSize: 'xx-small' }} bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Moon Position</CTableHeaderCell>
                                                                            <CTableHeaderCell>Moon Degree</CTableHeaderCell>
                                                                            <CTableDataCell>{data.moon_position.moon_degree}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell rowSpan={5}>Sun Position</CTableHeaderCell>
                                                                            <CTableHeaderCell>Zodiac</CTableHeaderCell>
                                                                            <CTableDataCell>{data.sun_position.zodiac}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Nakshatra</CTableHeaderCell>
                                                                            <CTableDataCell>{data.sun_position.nakshatra}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Rasi No.</CTableHeaderCell>
                                                                            <CTableDataCell>{data.sun_position.rasi_no}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Nakshatra No.</CTableHeaderCell>
                                                                            <CTableDataCell>{data.sun_position.nakshatra_no}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Sun Degree At Rise</CTableHeaderCell>
                                                                            <CTableDataCell>{data.sun_position.sun_degree_at_rise}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable className="table-sm p-0 m-0" style={{ fontSize: 'xx-small' }} bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Rahukaal</CTableHeaderCell>
                                                                            <CTableDataCell>{data.rahukaal}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Gulika</CTableHeaderCell>
                                                                            <CTableDataCell>{data.gulika}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Yamakanta</CTableHeaderCell>
                                                                            <CTableDataCell>{data.yamakanta}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Date</CTableHeaderCell>
                                                                            <CTableDataCell>{data.date}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <CTable className="table-sm p-0 m-0" style={{ fontSize: 'xx-small' }} bordered>
                                                                    <CTableHead>
                                                                        <CTableRow>
                                                                            {["", "Tithi", "Nakshatra", "Karana", "Yoga"].map((v, k) => (
                                                                                <CTableHeaderCell key={k}>{v}</CTableHeaderCell>
                                                                            ))}
                                                                        </CTableRow>
                                                                    </CTableHead>
                                                                    <CTableBody>
                                                                        {["Name", "Number", "Lord", "Diety", "Start", "Next Nakshatra", "End", "Meaning", "Special", "Summary"].map((v, k) => (
                                                                            <CTableRow key={k}>
                                                                                <CTableHeaderCell>{v}</CTableHeaderCell>
                                                                                {["tithi", "nakshatra", "karana", "yoga"].map((k2, v2) => (
                                                                                    <CTableDataCell key={v2}>{data[k2]?.[v.replace(/\s+/g, "_").toLowerCase()
                                                                                    ]}</CTableDataCell>
                                                                                ))}
                                                                            </CTableRow>
                                                                        ))}
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <CTable className="table-sm p-0 m-0" style={{ fontSize: 'xx-small' }} bordered>
                                                                    <CTableHead>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={10}>Advanced Details</CTableHeaderCell>
                                                                        </CTableRow>
                                                                    </CTableHead>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            {["Sun Rise", "Sun Set", "Moon Rise", "Moon Set", "Next Full Moon", "Next New Moon", "Moon Yogini Nivas", "Ahargana", "Vaara", "Disha Shool"].map(m => (
                                                                                <CTableHeaderCell key={m}>{m}</CTableHeaderCell>
                                                                            ))}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            {["sun_rise", "sun_set", "moon_rise", "moon_set", "next_full_moon", "next_new_moon", "moon_yogini_nivas", "ahargana", "vaara", "disha_shool"].map(m => (
                                                                                <CTableDataCell key={m}>{data.advanced_details[m]}</CTableDataCell>
                                                                            ))}
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <CTable className='table-sm p-0 m-0' style={{ fontSize: 'xx-small' }} bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={4}>Masa</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Amanta Number</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.amanta_number}</CTableDataCell>
                                                                            <CTableHeaderCell>Amanta Date</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.amanta_date}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Amanta Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.amanta_name}</CTableDataCell>
                                                                            <CTableHeaderCell>Alternate Amanta Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.alternate_amanta_name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Amanta Start</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.amanta_start}</CTableDataCell>
                                                                            <CTableHeaderCell>Amanta End</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.amanta_end}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Amanta Maasa</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.amanta_maasa}</CTableDataCell>
                                                                            <CTableHeaderCell>Ayana</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.ayana}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Real Ayana</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.real_ayana}</CTableDataCell>
                                                                            <CTableHeaderCell>Tamil Month Num</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.tamil_month_num}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Tamil Month</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.tamil_month}</CTableDataCell>
                                                                            <CTableHeaderCell>Tamil Day</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.tamil_day}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Purnimanta Date</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.purnimanta_date}</CTableDataCell>
                                                                            <CTableHeaderCell>Purnimanta Number</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.purnimanta_number}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Purnimanta Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.purnimanta_name}</CTableDataCell>
                                                                            <CTableHeaderCell>Alternate Purnimanta Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.alternate_purnimanta_name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Purnimanta Start</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.purnimanta_start}</CTableDataCell>
                                                                            <CTableHeaderCell>Purnimanta End</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.purnimanta_end}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Moon Phase</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.moon_phase}</CTableDataCell>
                                                                            <CTableHeaderCell>Paksha</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.paksha}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Ritu</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.ritu}</CTableDataCell>
                                                                            <CTableHeaderCell>Ritu Tamil</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.masa.ritu_tamil}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable className='table-sm p-0 m-0' style={{ fontSize: 'xx-small' }} bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2}>Years</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Kali</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.years.kali}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Saka</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.years.saka}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Vikram Samvaat</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.years.vikram_samvaat}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Kali Samvaat Number</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.years.kali_samvaat_number}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Kali Samvaat Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.years.kali_samvaat_name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Vikram Samvaat Number</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.years.vikram_samvaat_number}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Vikram Samvaat Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.years.vikram_samvaat_name}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Saka Samvaat Number</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.years.saka_samvaat_number}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Saka Samvaat Name</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.years.saka_samvaat_name}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable className='table-sm p-0 m-0' style={{ fontSize: 'xx-small' }} bordered>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={2}>Abhijit Muhurta</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Start</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.abhijit_muhurta.start}</CTableDataCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>End</CTableHeaderCell>
                                                                            <CTableDataCell>{data.advanced_details.abhijit_muhurta.end}</CTableDataCell>
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-1' style={{ alignContent: 'center' }}>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 1)}>
                                                            Horoscope Planet Detail (Current)
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 2)}>
                                                            Horoscope Planet Detail (Birth)
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 3)}>
                                                            Matching North Match With Astro
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 4)}>
                                                            Panchang
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 5)}>
                                                            Dasha Current Maha Dasha Full
                                                        </CButton>
                                                    </div>
                                                </div>
                                            </div>

                                        })()
                                    }
                                </div>
                            )}
                            {(showVedicResponse5 && data != null) && (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}><CButton onClick={() => setShowVedicResponse3(false)} style={{ marginRight: '50px' }} size='sm' color='secondary' variant='outline'><CIcon icon={cilX} size='sm' /></CButton></div>
                                    <br />
                                    {
                                        (() => {

                                            return <div className='container text-center' style={{ marginBottom: '5px' }}>
                                                <div className='row'>
                                                    <div className='col-11'>
                                                        <div className='row'>
                                                            <CTable>
                                                                <CTableBody>
                                                                    <CTableRow>
                                                                        <CTableHeaderCell colSpan={5}>Order Names</CTableHeaderCell>
                                                                    </CTableRow>
                                                                    <CTableRow>
                                                                        {Array.from({ length: 6 }, (_, i) => i).map(m => (
                                                                            <CTableDataCell>{data.order_names[m]}</CTableDataCell>
                                                                        ))}
                                                                    </CTableRow>
                                                                </CTableBody>
                                                            </CTable>
                                                        </div>
                                                        <div className='row' style={{ /*flexWrap: '' */ }}>
                                                            <div className='col'>
                                                                <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={28}>Mahadasha</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.mahadasha[m].name}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Start</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.mahadasha[m].start}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>End</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.mahadasha[m].end}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Key</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.mahadasha[m].key}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={28}>Antardasha</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.antardasha[m].name}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Start</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.antardasha[m].start}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>End</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.antardasha[m].end}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Key</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.antardasha[m].key}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={28}>Paryantardasha</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.paryantardasha[m].name}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Start</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.paryantardasha[m].start}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>End</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.paryantardasha[m].end}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Key</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.paryantardasha[m].key}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={28}>Shookshamadasha</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.Shookshamadasha[m].name}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Start</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.Shookshamadasha[m].start}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>End</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.Shookshamadasha[m].end}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Key</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.Shookshamadasha[m].key}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={28}>Pranadasha</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Name</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.Pranadasha[m].name}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Start</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.Pranadasha[m].start}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>End</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.Pranadasha[m].end}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell>Key</CTableHeaderCell>
                                                                            {Array.from({ length: 8 }, (_, i) => i).map(m => {
                                                                                return <CTableDataCell colSpan={3}>{data.Pranadasha[m].key}</CTableDataCell>
                                                                            })}
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                            <div className='col'>
                                                                <CTable className='table-sm p-0 m-0' bordered style={{ fontSize: 'xx-small' }}>
                                                                    <CTableBody>
                                                                        <CTableRow>
                                                                            <CTableHeaderCell colSpan={5}>Order of Dashas</CTableHeaderCell>
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            {["", "Major", "Minor", "Sub Minor", "Sub Sub Minor"].map(m => (
                                                                                <CTableHeaderCell>{m}</CTableHeaderCell>
                                                                            ))}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            {["Name", "major", "minor", "sub_minor", "sub_sub_minor"].map((k, v) => (
                                                                                v === 0
                                                                                    ? <CTableHeaderCell key={v}>{k}</CTableHeaderCell>
                                                                                    : <CTableDataCell key={v}>{data.order_of_dashas[k]?.name}</CTableDataCell>
                                                                            ))}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            {["Start", "major", "minor", "sub_minor", "sub_sub_minor"].map((k, v) => (
                                                                                v === 0
                                                                                    ? <CTableHeaderCell key={v}>{k}</CTableHeaderCell>
                                                                                    : <CTableDataCell key={v}>{data.order_of_dashas[k]?.start}</CTableDataCell>
                                                                            ))}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            {["End", "major", "minor", "sub_minor", "sub_sub_minor"].map((k, v) => (
                                                                                v === 0
                                                                                    ? <CTableHeaderCell key={v}>{k}</CTableHeaderCell>
                                                                                    : <CTableDataCell key={v}>{data.order_of_dashas[k]?.end}</CTableDataCell>
                                                                            ))}
                                                                        </CTableRow>
                                                                        <CTableRow>
                                                                            {["Key", "major", "minor", "sub_minor", "sub_sub_minor"].map((k, v) => (
                                                                                v === 0
                                                                                    ? <CTableHeaderCell key={v}>{k}</CTableHeaderCell>
                                                                                    : <CTableDataCell key={v}>{data.order_of_dashas[k]?.key}</CTableDataCell>
                                                                            ))}
                                                                        </CTableRow>
                                                                    </CTableBody>
                                                                </CTable>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-1' style={{ alignContent: 'center' }}>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 1)}>
                                                            Horoscope Planet Detail (Current)
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 2)}>
                                                            Horoscope Planet Detail (Birth)
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 3)}>
                                                            Matching North Match With Astro
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 4)}>
                                                            Panchang
                                                        </CButton>
                                                        <CButton className="btn btn-sm" style={{ border: '1px solid black', marginRight: '1px', fontSize: 'xx-small', padding: '3px', marginTop: '2px' }} onClick={() => getPlanet(item.inquiry_id, 5)}>
                                                            Dasha Current Maha Dasha Full
                                                        </CButton>
                                                    </div>
                                                </div>
                                            </div>

                                        })()
                                    }
                                </div>
                            )}
                            </>)}

                        </div>
                    </div>
                </commentContext.Provider>
            </CModalHeader>
        </CModal>
    );
};

export default DetailedView;
