import React, { createContext, useContext, useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CRow, CCol } from '@coreui/react';
import SupportVisible from './SupportVisible';
import Submit from './Submit';
import CommentHistory from './CommentHistory';
import { UserContext } from '../Inquiry';
import { GetURL, GetToken } from '../../library/API';
import ReactTimeAgo from 'react-timeago'; // Import ReactTimeAgo

export const commentContext = createContext();

const DetailedView = ({ item, onClose, fromPage, publish }) => {
    const [showCommentHistory, setShowCommentHistory] = useState(false);
    const showTwoProfiles = item.category_type_id === 2;
    const userTypeId = useContext(UserContext).id;
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const FetchComments = async (item) => {
            try {
                const response = await fetch(GetURL(`/backend/InquiryManagement/GetCommentHistory?inquiry_id=${item.inquiry_id}`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });
                const data = await response.json();
                console.log(data);
                setComments(data.data.comment);
            } catch (err) {
                alert('An error occurred. Please try again later.' + err);
            }
        };

        FetchComments(item);
        
        // Handle Escape key press to close modal
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                handleBackButtonClick();
            }
        };
        
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [item]);
    
    const navbarHeight = 60; // Replace with the actual height of your navbar if different

    const handleShowCommentHistory = () => {}
    const handleCloseCommentHistory = () => {}
    const handleBackButtonClick = () => onClose();

    const ProfileCard = ({ name, dob, tob, city_id, visible, from }) => {
        return (
            visible && (
                <CCard className="mb-3" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', width: '100%' }}>
                    <CCardHeader style={{ backgroundColor: '#f5f5f5', padding: '12px 20px' }}>
                        <h5 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{from}</h5>
                    </CCardHeader>
                    <CCardBody style={{ padding: '15px 20px', fontSize: '14px', color: '#555' }}>
                        <strong>Name:</strong> {name}  <br />
                        <strong> DOB:</strong> {dob}  <br />
                        <strong> TOB:</strong> {tob} <br />
                        <strong> POB:</strong> {city_id}
                    </CCardBody>
                </CCard>
            )
        );
    };

    return (
        <commentContext.Provider value={comments}>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)',  // Darken background for focus
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                overflow: 'hidden',
            }}>
                <div style={{
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
                    paddingTop: `${navbarHeight}px`, // Offset for navbar
                }}>
                    <CCard className="h-100 d-flex flex-column" style={{ borderRadius: '10px', border: 'none' }}>
                        <CCardHeader style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px',
                            backgroundColor: '#FFFFFF',
                            color: '#ff9933',
                            borderRadius: '10px 10px 0 0',
                            fontWeight: 500
                        }}>
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
                                        fontWeight: 600
                                    }}
                                    onClick={handleBackButtonClick}
                                >
                                    Back
                                </CButton>
                                <h4 style={{ flex: '1', margin: 0, fontSize: '20px', fontWeight: 600 }}>{item.question} - {!item.payment_successful ? <span style={{ color: 'green' }}>paid</span> : <span style={{ color: 'red' }}>not paid</span>}</h4>
                                {/* Use ReactTimeAgo to show the time in "time ago" format */}
                                Purchased:&nbsp;<ReactTimeAgo date={item.purchased_on} />
                            </div>
                        </CCardHeader>
                        <p style={{ marginLeft: '20px' }}>{item.category_type_id == 1 ? 'Horoscope' : item.category_type_id == 2 ? 'Compatibility' : 'Auspicous Time'}</p>
                        <CCardBody className="d-flex flex-column h-100 overflow-auto" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <CRow className="justify-content-center" style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
                                <CCol style={{ width: '20%', paddingRight: '5px' }}>
                                    <ProfileCard
                                        name={item.profile1.name}
                                        dob={item.profile1.dob}
                                        tob={item.profile1.tob}
                                        city_id={item.profile1.city_id}
                                        visible={true}
                                        from={"Profile 1"}
                                    />
                                </CCol>

                                {showTwoProfiles && (
                                    <CCol style={{ width: '20%', paddingRight: '5px' }}>
                                        <ProfileCard
                                            name={item.profile2.name}
                                            dob={item.profile2.dob}
                                            tob={item.profile2.tob}
                                            city_id={item.profile2.city_id}
                                            visible={true}
                                            from={"Profile 2"}
                                        />
                                    </CCol>
                                )}
                                <CCol style={{ width: showTwoProfiles ? '60%' : '80%', paddingLeft: '5px' }}>
                                    <div style={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        padding: '12px 18px',
                                        backgroundColor: '#f9f9f9',
                                    }}>
                                        {/* {(userTypeId !== 1 && userTypeId !== 2) || publish == 'true' ? (
                                            <Submit inquiry_id={item.inquiry_id} onClose={onClose} />
                                            ) : (
                                                <SupportVisible currentTask={item} inquiry_id={item.inquiry_id} onClose={onClose} />
                                                )} */}
                                        {item.comment_for_assignee}
                                        {(userTypeId !== 1 && userTypeId !== 2) || fromPage == 'reviewer' ? (
                                            <Submit inquiry_id={item.inquiry_id} onClose={onClose} />
                                        ) : (
                                            <SupportVisible currentTask={item} inquiry_id={item.inquiry_id} onClose={onClose} />
                                        )}
                                    </div>
                                </CCol>
                            </CRow>

                            <CRow className="justify-content-center" style={{ display: 'flex', flexDirection: 'row' }}>
                                <CCol md={7} style={{ paddingRight: '5px' }}>
                                    <div style={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        padding: '12px 18px',
                                        backgroundColor: '#f9f9f9',
                                        maxHeight: '400px',
                                        overflowY: 'auto',
                                    }}>
                                        <div className="text-center mb-4" onClick={handleShowCommentHistory}>
                                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                                {comments.map((m, index) => (
                                                    <li key={index} style={{
                                                        paddingBottom: '12px',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        padding: '10px',
                                                        marginBottom: '8px',
                                                        backgroundColor: '#fff',
                                                    }}>
                                                        <div style={{ flex: '0 0 150px', fontSize: '13px', color: '#888' }}>
                                                            {m.updated_on.split('T')[0]} {m.updated_on.split('T')[1].substr(0, 8)}
                                                        </div>
                                                        <div style={{ flex: '1', marginLeft: '10px', fontSize: '13px', color: '#555' }}>
                                                            Assignee: {m.assignee || 'Unassigned'}
                                                        </div>
                                                        <div style={{ flex: '2', marginLeft: '10px', fontSize: '13px', color: '#555', textAlign: 'justify' }}>
                                                            {m.description || 'No comment provided'}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                    {/* {showCommentHistory && (
                        <CommentHistory
                            text={item.comment_for_assignee}
                            onClose={handleCloseCommentHistory}
                        />
                    )} */}
                </div>
            </div>
        </commentContext.Provider>
    );
};

export default DetailedView;
