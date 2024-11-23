import React, { createContext, useContext, useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol } from '@coreui/react';
import SupportVisible from './SupportVisible';
import Submit from './Submit';
import { UserContext } from '../Inquiry';
import { GetURL, GetToken } from '../../library/API';
import ReactTimeAgo from 'react-timeago';

export const commentContext = createContext();

const DetailedView = ({ item, onClose, fromPage, publish }) => {
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
                    <h5 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{from}</h5>
                </CCardHeader>
                <CCardBody style={{ padding: '15px 20px', fontSize: '14px', color: '#555' }}>
                    <strong>Name:</strong> {name || 'N/A'} <br />
                    <strong>DOB:</strong> {dob || 'N/A'} <br />
                    <strong>TOB:</strong> {tob || 'N/A'} <br />
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
                    {/* Full-width Header */}
                    <CCard
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
                    </CCard>
                    {/* assignee: ""
                        auspicious_from_date: "2024-11-22T18:15:00Z"
                        category_type_id: 3
                        comment_for_assignee: null
                        final_reading: null
                        horoscope_from_date: null
                        inquiry_id: "6741ac44094af6a20d468757"
                        inquiry_number: "6f04289c3e9e40128b997aea3daa7a01"
                        payment_successfull: true
                        price: 7
                        profile1: {name: 'Aagya Kumari Jha', city_id: 'USA', dob: '2004-01-25', tob: '09:15'}
                        profile2: null
                        purchased_on: "2024-11-23T10:19:48.233Z"
                        question: "1 year"
                       
                        0: {id: '1', name: 'Horosope'}
                        1: {id: '2', name: 'Compatibility'}
                        2: {id: '3', name: 'Auspicious Time'}
                        3: {id: '4', name: 'Kundali'}
                        4: {id: '5', name: 'Support'}
                        5: {id: '6', name: 'Question'} */}

                    {/* Content Section: Vertical Split Begins Below Header */}
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <CCard
                            className="h-100 d-flex flex-column"
                            style={{
                                borderRadius: '10px',
                                border: 'none',
                                width: '50%', // 50% width for the profile section
                                padding: '20px',
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

                                {/* Render either SupportVisible or Submit component */}
                                <CRow
                                    className="justify-content-center"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'stretch',
                                    }}
                                >
                                    {(userTypeId != 1 && userTypeId != 2) || fromPage === "reviewer" ? (
                                        <Submit inquiry_id={item.inquiry_id} onClose={onClose} />
                                    ) : (
                                        <SupportVisible currentTask={item} inquiry_id={item.inquiry_id} onClose={onClose} />
                                    )}
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
                            <CCardBody
                                className="d-flex flex-column h-100"
                                style={{ paddingTop: '10px', paddingBottom: '10px' }}
                            >
                                {comments.length > 0 && (
                                    <div
                                        style={{
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px',
                                            padding: '12px 18px',
                                            backgroundColor: '#f9f9f9',
                                            maxHeight: '400px',
                                            overflowY: 'auto',
                                        }}
                                    >
                                        <div className="text-center mb-4">
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                {comments.map((m, index) => (
                                                    <li
                                                        key={index}
                                                        style={{
                                                            paddingBottom: '12px',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            border: '1px solid #ddd',
                                                            borderRadius: '8px',
                                                            padding: '10px',
                                                            marginBottom: '8px',
                                                            backgroundColor: '#fff',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                flex: '0 0 150px',
                                                                fontSize: '13px',
                                                                color: '#888',
                                                            }}
                                                        >
                                                            {m.assignee} <br />
                                                            {m.updated_on.split("T")[0]} &nbsp;|&nbsp;
                                                            {m.updated_on.split("T")[1].substr(0, 8)}
                                                        </div>
                                                        <div
                                                            style={{
                                                                flex: '1',
                                                                fontSize: '14px',
                                                                color: '#333',
                                                            }}
                                                        >
                                                            {m.description}
                                                        </div>
                                                    </li>
                                                ))}
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
