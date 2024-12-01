import React, { Suspense, useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CNav, CNavItem, CNavLink, CButton, CToaster, CToast, CToastBody, CToastHeader, CModal, CModalBody, CModalFooter, CFormInput, CFormSelect } from '@coreui/react';
import TableView from './views/TableView';
import { GetToken, GetURL } from '../library/API';

export const UserContext = createContext();

const Inquiry = () => {
    try {
        const navigate = useNavigate();
        const [userList, setUserList] = useState([]);
        const [currentUser, setCurrentUser] = useState(null);
        const [userTypeId, setUserTypeId] = useState(localStorage.getItem('user_type_id'));
        const [fromPage, setFromPage] = useState('NewInquiry');
        const [currentStatus, setCurrentStatus] = useState('pending');
        const [activeTab, setActiveTab] = useState('');
        const [visibleTabs, setVisibleTabs] = useState([]);
        const [filterVisible, setFilterVisible] = useState(false);
        const [filters, setFilters] = useState({
            inquiryNumber: '',
            date: '',
            paymentStatus: '',
            category: '',
            guestName: '',
            status: '',
        });

        const [toasts, setToasts] = useState([]);

        const pathSegments = window.location.pathname.split('/');
        const currentState = pathSegments[3];

        const tabVisibility = {
            1: ['new_inquiry', 'expert_reading', 'translator', 'reviewer', 'publish', 'cancelled'],
            2: ['new_inquiry', 'expert_reading', 'translator', 'reviewer', 'publish', 'cancelled'],
            3: ['expert_reading'],
            4: ['translator'],
            5: ['reviewer']
        };

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
                    setToasts([...toasts, {
                        title: 'Error',
                        content: 'An error occurred while fetching user types. Please try again later.',
                        color: 'danger'
                    }]);
                }
            };

            fetchUserTypes();
        }, []);

        useEffect(() => {
            setVisibleTabs(tabVisibility[userTypeId]);
        }, [userTypeId]);

        useEffect(() => {
            try {
                if (visibleTabs.length > 0) {
                    setActiveTab(visibleTabs[0]);
                }
            } catch (error) {
                setToasts([...toasts, {
                    title: 'Error',
                    content: 'An error occurred while setting tabs. Please try again later.',
                    color: 'danger'
                }]);
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

        const handleFilterChange = (e) => {
            setFilters({ ...filters, [e.target.name]: e.target.value });
        };
    
        const handleApplyFilters = () => {
            setFilterVisible(false); // Close the filter modal
        };
    
        const handleClearFilters = () => {
            setFilters({
                inquiryNumber: '',
                date: '',
                paymentStatus: '',
                category: '',
                guestName: '',
                status: '',
            });
        };

        const SubTabs = ({ from, substate, publish }) => {
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
                        {(from != 'new') &&  <CNavItem>
                            <CNavLink
                                active={currentStatus === 'completed'}
                                onClick={() => handleStatusChange('completed')}
                                style={{ padding: '8px 16px' }}
                            >
                                Completed
                            </CNavLink>
                        </CNavItem>}
                    </CNav>

                    {currentStatus === 'pending' && (
                        <TableView page={fromPage} state={from} status="pending" substate={substate} publish={publish} />
                    )}
                    {currentStatus === 'completed' && (
                        <TableView page={fromPage} state={from} status="completed" substate={substate} publish={publish} />
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: '' }}>
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

                        <CButton style={{ backgroundColor: 'grey' }} onClick={() => setFilterVisible(true)}>🔍</CButton>
                    </CNav>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    {activeTab === 'new_inquiry' && <SubTabs from='new' />}
                    {activeTab === 'expert_reading' && <SubTabs from='expert' />}
                    {activeTab === 'reviewer' && <SubTabs from='reviewer' />}
                    {activeTab === 'translator' && <SubTabs from='translator' />}
                    {activeTab === 'publish' && <SubTabs from='new' publish='true' />}
                    {activeTab === 'cancelled' && <SubTabs from='new' substate='cancelled' />}
                </Suspense>

                <CToaster position="top-right">
                    {toasts.map((toastItem, index) => (
                        <CToast key={index} color={toastItem.color}>
                            <CToastHeader closeButton>{toastItem.title}</CToastHeader>
                            <CToastBody>{toastItem.content}</CToastBody>
                            {console.log(toastItem)}
                        </CToast>
                    ))}
                </CToaster>

                {/* Filter Modal */}
                <CModal visible={filterVisible} onClose={() => setFilterVisible(false)}>
                    <CModalBody>
                        <div>
                            <label htmlFor="inquiryNumber">Inquiry Number</label>
                            <CFormInput type="text" id="inquiryNumber" name="inquiryNumber" value={filters.inquiryNumber} onChange={handleFilterChange} />

                            <label htmlFor="date">Date</label>
                            <CFormInput type="date" id="date" name="date" value={filters.date} onChange={handleFilterChange} />

                            <label htmlFor="paymentStatus">Payment Status</label>
                            <CFormSelect name="paymentStatus" value={filters.paymentStatus} onChange={handleFilterChange}>
                                <option value="">Select</option>
                                <option value="paid">Paid</option>
                                <option value="unpaid">Unpaid</option>
                            </CFormSelect>

                            <label htmlFor="category">Category</label>
                            <CFormInput type="text" id="category" name="category" value={filters.category} onChange={handleFilterChange} />

                            <label htmlFor="guestName">Guest Name</label>
                            <CFormInput type="text" id="guestName" name="guestName" value={filters.guestName} onChange={handleFilterChange} />

                            <label htmlFor="status">Status</label>
                            <CFormSelect name="status" value={filters.status} onChange={handleFilterChange}>
                                <option value="">Select</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </CFormSelect>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setFilterVisible(false)}>Close</CButton>
                        <CButton color="primary" onClick={handleApplyFilters}>Apply Filters</CButton>
                        <CButton color="danger" onClick={handleClearFilters}>Clear Filters</CButton>
                    </CModalFooter>
                </CModal>
            </UserContext.Provider>
        );
    } catch (error) {
        return (<h1> This Page Cannot Be Opened Right Now! due to an error. &nbsp; {console.log(error)}</h1>)
    }
};

export default Inquiry;
