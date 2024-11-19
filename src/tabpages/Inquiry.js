import React, { Suspense, useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CNav, CNavItem, CNavLink, CButton } from '@coreui/react';
import TableView from './views/TableView';
import { GetToken, GetURL } from '../library/API';

export const UserContext = createContext();

const Inquiry = () => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [userTypeId, setUserTypeId] = useState(localStorage.getItem('user_type_id'));
    const [fromPage, setFromPage] = useState('NewInquiry');
    const [currentStatus, setCurrentStatus] = useState('pending');
    const [activeTab, setActiveTab] = useState('');
    const [visibleTabs, setVisibleTabs] = useState([]);

    // Extracting state from the URL path
    const pathSegments = window.location.pathname.split('/');
    const currentState = pathSegments[3];

    const tabVisibility = {
        1: ['new_inquiry', 'expert_reading', 'reviewer', 'translator', 'publish', 'cancelled'],
        2: ['new_inquiry', 'expert_reading', 'reviewer', 'translator', 'publish', 'cancelled'],
        3: ['expert_reading'],
        4: ['translator'],
        5: ['reviewer']
    };

    // Update fromPage based on currentState
    useEffect(() => {
        const stateMap = {
            new: 'new',
            expert: 'expert',
            translator: 'translator',
            reviewer: 'reviewer',
            publish: 'published',
            cancelled: 'new'
        };
        setFromPage(stateMap[currentState] || 'new');
    }, [currentState]);

    // Fetch user types and set visibility for tabs based on the user type
    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const response = await fetch(GetURL('/backend/InquiryManagement/GetAssigneeList'), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });
                const data = await response.json();
                setUserList(data.data.user);
                setCurrentUser(data.data.user[0]);
                setVisibleTabs(tabVisibility[userTypeId]);
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        fetchUserTypes();
    }, []);

    // Set visible tabs whenever user type changes
    useEffect(() => {
        setVisibleTabs(tabVisibility[userTypeId]);
    }, [userTypeId]);

    useEffect(() => {
        if (visibleTabs.length > 0) {
            setActiveTab(visibleTabs[0]);
        }
    }, [visibleTabs]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`/tabpages/inquiry/${tab}/${currentStatus}`);
    };

    const handleStatusChange = (status) => {
        setCurrentStatus(status);
        navigate(`/tabpages/inquiry/${activeTab}/${status}`);
    };

    const handleUserChange = () => {
        const currentIndex = userList.indexOf(currentUser);
        const nextIndex = (currentIndex + 1) % userList.length;
        const nextUser = userList[nextIndex];
        setCurrentUser(nextUser);   
    };

    const handleIncrement = () => {
        setUserTypeId((p) => ((p % 5) + 1));
    };

    const SubTabs = ({from, substate, publish}) => {
        return (
            <>
                <CNav variant="tabs" style={{ marginLeft: '20px', marginBottom: '20px' }}>
                    <CNavItem>
                        <CNavLink 
                            active={currentStatus === 'pending'} 
                            onClick={() => handleStatusChange('pending')}
                            style={{ padding: '8px 16px' }}
                        >
                            Pending
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink 
                            active={currentStatus === 'completed'} 
                            onClick={() => handleStatusChange('completed')}
                            style={{ padding: '8px 16px' }}
                        >
                            Completed
                        </CNavLink>
                    </CNavItem>
                </CNav>

                {currentStatus === 'pending' && (
                    <TableView page={fromPage} state={from} status="pending" substate={substate} publish={publish}/>
                )}
                {currentStatus === 'completed' && (
                    <TableView page={fromPage} state={from} status="completed" substate={substate} publish={publish}/>
                )}
            </>
        );
    };

    return (
        <UserContext.Provider value={{ id: userTypeId, assignee: currentUser, fromPage }}>
            <div style={{ margin: '20px 0', display: 'flex', gap: '15px' }}>
                <CButton color={'primary'} name='User' onClick={() => handleIncrement()} style={{ padding: '8px 16px' }}> Next User Id</CButton> 
                <span style={{ fontWeight: 'bold', alignSelf: 'center' }}>{userTypeId}</span>
                <CButton color={'primary'} name='Change User' onClick={() => handleUserChange()} style={{ padding: '8px 16px' }}> Change User</CButton>
            </div>
            
            <CNav variant="tabs" onSelect={handleTabChange} style={{ marginBottom: '20px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                {visibleTabs.includes('new_inquiry') && (
                    <CNavItem>
                        <CNavLink 
                            active={activeTab === 'new_inquiry'}
                            onClick={() => handleTabChange('new_inquiry')}
                            style={{ padding: '10px 20px', fontWeight: 'bold' }}
                        >
                            New Inquiry
                        </CNavLink>
                    </CNavItem>
                )}
                {visibleTabs.includes('expert_reading') && (
                    <CNavItem>
                        <CNavLink 
                            active={activeTab === 'expert_reading'}
                            onClick={() => handleTabChange('expert_reading')}
                            style={{ padding: '10px 20px', fontWeight: 'bold' }}
                        >
                            Expert Reading
                        </CNavLink>
                    </CNavItem>
                )}
                {visibleTabs.includes('reviewer') && (
                    <CNavItem>
                        <CNavLink 
                            active={activeTab === 'reviewer'}
                            onClick={() => handleTabChange('reviewer')}
                            style={{ padding: '10px 20px', fontWeight: 'bold' }}
                        >
                            Reviewer
                        </CNavLink>
                    </CNavItem>
                )}
                {visibleTabs.includes('translator') && (
                    <CNavItem>
                        <CNavLink 
                            active={activeTab === 'translator'}
                            onClick={() => handleTabChange('translator')}
                            style={{ padding: '10px 20px', fontWeight: 'bold' }}
                        >
                            Translator
                        </CNavLink>
                    </CNavItem>
                )}
                {visibleTabs.includes('publish') && (
                    <CNavItem>
                        <CNavLink 
                            active={activeTab === 'publish'}
                            onClick={() => handleTabChange('publish')}
                            style={{ padding: '10px 20px', fontWeight: 'bold' }}
                        >
                            Publish
                        </CNavLink>
                    </CNavItem>
                )}
                {visibleTabs.includes('cancelled') && (
                    <CNavItem>
                        <CNavLink 
                            active={activeTab === 'cancelled'}
                            onClick={() => handleTabChange('cancelled')}
                            style={{ padding: '10px 20px', fontWeight: 'bold' }}
                        >
                            Cancelled
                        </CNavLink>
                    </CNavItem>
                )}
            </CNav>

            <Suspense fallback={<div>Loading...</div>}>
                {activeTab === 'new_inquiry' && <SubTabs from='new' />}
                {activeTab === 'expert_reading' && <SubTabs from='expert' />}
                {activeTab === 'reviewer' && <SubTabs from='reviewer' />}
                {activeTab === 'translator' && <SubTabs from='translator' />}
                {activeTab === 'publish' && <SubTabs from='new' publish='true' />}
                {activeTab === 'cancelled' && <SubTabs from='new' substate='cancelled' />}
            </Suspense>
        </UserContext.Provider>
    );
};

export default Inquiry;
