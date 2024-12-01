import React, { createContext, useContext, useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol, CBadge } from '@coreui/react';
import SupportVisible from './SupportVisible';
import Submit from './Submit';
import { UserContext } from '../Inquiry';
import { GetURL, GetToken } from '../../library/API';
import ReactTimeAgo from 'react-timeago';

export const commentContext = createContext();

const DetailedView = ({ item, onClose, fromPage, publish, status }) => {
    const [showCommentHistory, setShowCommentHistory] = useState(false);
    const showTwoProfiles = item.category_type_id === 2;
    const userTypeId = useContext(UserContext).id;
    const [comments, setComments] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const FetchComments = async (item) => {
            try {
                const response = await fetch(GetURL(`/backend/InquiryManagement/GetCommentHistory?inquiry_id=${item.inquiry_id}`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken(),
                    },
                });
                const data = await response.json();
                setComments(data.data.comment);
            } catch (err) {
                alert('An error occurred. Please try again later.' + err);
            }
        };

        const FetchCategories = async () => {
            try {
                const response = await fetch(GetURL(`/backend/QuestionCategory/LoadBaseData`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken(),
                    },
                });
                const data = await response.json();
                setCategories(data.data.category_type);
            } catch (err) {
                alert('An error occurred. Please try again later.' + err);
            }
        };

        FetchComments(item);
        FetchCategories();

        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                handleBackButtonClick();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [item]);

    const navbarHeight = 60;
    const category = categories.find(category => category.id == item.category_type_id);
    const categoryName = category ? category.name : 'Category not found';

    const handleBackButtonClick = () => onClose();
    const [expandedComments, setExpandedComments] = useState([]);

    const toggleExpanded = (index) => {
        setExpandedComments((prevState) => {
            if (prevState.includes(index)) {
                // If already expanded, remove the index to collapse it
                return prevState.filter((i) => i !== index);
            } else {
                // Otherwise, add the index to expand it
                return [...prevState, index];
            }
        });
    };

    const ProfileCard = ({ name, dob, tob, city_id, visible, from }) => {
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
                {console.log(categoryName)}
                <CCardHeader style={{ backgroundColor: '#f5f5f5', padding: '12px 20px' }}>
                    <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{from}</h5>
                </CCardHeader>
                <CCardBody style={{ padding: '10x 20px', fontSize: '13px', color: '#555' }}>
                    <strong>Name:</strong> {name || 'N/A'} <br />
                    <strong>DOB:</strong> {dob || 'N/A'} <br />
                    <strong>TOB:</strong> {Intl.DateTimeFormat('en-us', { hour: '2-digit', minute: '2-digit', hour12: true }).format((new Date(`1970-01-01T${tob}:00Z`))) || 'N/A'} <br />
                    <strong>POB:</strong> {city_id || 'N/A'}
                </CCardBody>
            </CCard>
        );
    };

    return (
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
                        paddingTop: `${navbarHeight}px`,
                    }}
                >
                    <CCard
                        className="h-auto"
                        style={{
                            borderRadius: '10px',
                            border: 'none',
                            width: '100%',
                            padding: '20px 15px 0px 15px',
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
                                    <span className="material-icons">&lt;-</span>
                                </CButton>

                                {/* Purchased Info */}
                                <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 600, fontSize: '16px' }}>Purchased: &nbsp;<ReactTimeAgo date={item.purchased_on} /></span>
                                    {/* Payment Badge */}
                                    <CBadge
                                        color={!item.payment_successful ? 'success' : 'danger'}
                                        style={{
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            fontSize: '14px',
                                            fontWeight: '500',
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
                                padding: '15px 15px 15px 15px',
                                backgroundColor: '#FFFFFF',
                                borderRadius: '0 0 10px 10px',
                                fontWeight: 500,
                                width: '100%',
                            }}
                        >
                            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 200 }}>
                                {categoryName} - {item.question} {
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
                        </CCardHeader>
                    </CCard>

                    {/* Full-width Header */}
                    {/* <CCard
                        className="h-auto"
                        style={{
                            borderRadius: '10px',
                            border: 'none',
                            width: '100%',
                            padding: '20px',
                        }}
                    >
                        <CCardHeader
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '15px',
                                backgroundColor: '#FFFFFF',
                                color: '#ff9933',
                                borderRadius: '10px 10px 0 0',
                                fontWeight: 500,
                                width: '100%', // Full width
                            }}
                        >
                            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
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
                                    Back
                                </CButton>
                                <h4 style={{ flex: '1', margin: 0, fontSize: '20px', fontWeight: 600 }}>
                                    {categoryName} - &nbsp;
                                    {item.question} - {!item.payment_successful ? (
                                        <span style={{ color: 'green' }}>paid</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>not paid</span>
                                    )}
                                </h4>
                                Purchased: &nbsp; <ReactTimeAgo date={item.purchased_on} />
                            </div>
                        </CCardHeader>
                    </CCard> */}

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
                                            city_id={item.profile1.city_id}
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
                                                city_id={item.profile2.city_id}
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
                                            var x = localStorage.getItem('user_type_id');
                                            
                                            if (x == 1 || x == 2) {
                                                // Users 1 & 2: Always show SupportVisible
                                                return <SupportVisible currentTask={item} inquiry_id={item.inquiry_id} onClose={onClose} />;
                                            } else if (
                                                (x == 3 && fromPage === 'expert') ||
                                                (x == 4 && fromPage === 'translator') ||
                                                (x == 5 && fromPage === 'reviewer')
                                            ) {
                                                // Users 3, 4, & 5: Show Submit if status is pending
                                                if (status === 'pending') {
                                                    return <Submit inquiry_id={item.inquiry_id} onClose={onClose} />;
                                                }
                                            }
                                            return null; // Render nothing for all other cases
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
                                                    const isLatestComment = index === 0; // The first item is always the latest comment

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
                                                            <div
                                                                style={{
                                                                    fontSize: '13px',
                                                                    color: '#888',
                                                                    marginBottom: '5px',
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
                            </CCardBody>

                        </CCard>
                    </div>
                </div>
            </div>
        </commentContext.Provider>
    );
};

export default DetailedView;
