import React, { Suspense, useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CNav, CNavItem, CNavLink, CButton, CToaster, CToast, CToastBody, CToastHeader, CModal, CModalBody, CModalFooter, CFormInput, CFormSelect } from '@coreui/react';
import TableView from './views/TableView';
import { GetToken, GetURL } from '../library/API';
import { useToast } from '../ToastComponent';
import { FaSearch } from 'react-icons/fa';

export const UserContext = createContext();

const Inquiry = () => {
    try {
        const navigate = useNavigate();
        const [userList, setUserList] = useState([]);
        const [currentUser, setCurrentUser] = useState(null);
        const [userTypeId, setUserTypeId] = useState(localStorage.getItem('user_type_id'));
        const [fromPage, setFromPage] = useState('new');
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

        const { showToast } = useToast();
        const pathSegments = window.location.pathname.split('/');
        const currentState = pathSegments[3];

        const tabVisibility = {
            // 1: ['new', 'expert', 'translator', 'reviewer', 'publish', 'cancelled'],
            1: ['new', 'expert', 'translator', 'reviewer'],
            // 2: ['new', 'expert', 'translator', 'reviewer', 'publish', 'cancelled'],
            2: ['new', 'expert', 'translator', 'reviewer'],
            3: ['expert'],
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
                    showToast('Response Error', 'No Network Connection', 2);
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
                console.log(err);
                showToast('Failed', 'An error has occurred', 1);
            }
        }, [visibleTabs]);
        
        const handleTabChange = (tab) => {
            setActiveTab(tab);
            setState(tab);
            navigate(`/tabpages/inquiry/${tab}/${status}`);
        };

        const handleStatusChange = (status) => {
            setStatus(status);
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
            setFilterVisible(false);
            showToast('Items Filtered');
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

        const SubTabs = ({ from, substate }) => {
            return (
                <>
                    <CNav variant="tabs" style={{ marginLeft: '20px', marginBottom: '20px' }}>
                        <CNavItem>
                            <CNavLink
                                active={status === 'pending'}
                                onClick={() => handleStatusChange('pending')}
                                style={{ padding: '8px 16px', color: '#ff9933' }}
                            >
                                Pending
                            </CNavLink>
                        </CNavItem>
                        {(from != 'new') &&  <CNavItem>
                            <CNavLink
                                active={status === 'completed'}
                                onClick={() => handleStatusChange('completed')}
                                style={{ padding: '8px 16px', color: '#ff9933' }}
                            >
                                Completed
                            </CNavLink>
                        </CNavItem>}
                    </CNav>

                    {status === 'pending' && (
                        <TableView page={fromPage} state={from} status="pending" substate={substate} />
                    )}
                    {status === 'completed' && (
                        <TableView page={fromPage} state={from} status="completed" substate={substate}   />
                    )}
                </>
            );
        };

        const [state, setState] = useState(pathSegments[3]);
        const [status, setStatus] = useState('pending');
        const [inquiryList, setInquiryList] = useState([]);

        const fetchInquiries = async (state, status) => {
            try {
                const response = await fetch(GetURL(`/backend/InquiryManagement/GetInquiries?inquiry_state=${state}&inquiry_status=${status}`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });

                const data = await response.json();
                setInquiryList(data.data.list);
            } catch(e) {
                showToast('Failed', 'Cannot fetch inquiries right now. Try again later.', 2)
            }
        }

        useEffect(() => {
            fetchInquiries(state, status);
        }, [state, status]);

        return (
            <UserContext.Provider value={{ id: userTypeId, assignee: currentUser, userList, fromPage: fromPage, state: state, setState, status: status, setStatus, inquiryList: [inquiryList], setInquiryList, fetchInquiries }}>
                {/* <div style={{ margin: '20px 0', display: 'flex', gap: '15px' }}>
                    <CButton name='User' onClick={() => handleIncrement()} style={{ padding: '8px 16px', backgroundColor: '#ff9933', color: 'white' }}> Next User Id</CButton> 
                    <span style={{ fontWeight: 'bold', alignSelf: 'center' }}>{userTypeId}</span>
                    <CButton name='Change User' onClick={() => handleUserChange()} style={{ padding: '8px 16px', backgroundColor: '#ff9933', color: 'white' }}> Change User</CButton>
                    <CButton name='Change User' onClick={() => console.log(inquiryList)} style={{ padding: '8px 16px', backgroundColor: '#ff9933', color: 'white' }}> InquiryList</CButton>
                </div>  */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: '' }}>
                    <CNav variant="tabs" onSelect={handleTabChange} style={{ marginBottom: '20px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                        {visibleTabs.includes('new') && (
                            <CNavItem>
                                <CNavLink
                                    active={activeTab === 'new'}
                                    onClick={() => handleTabChange('new')}
                                    style={{ padding: '10px 20px', color: '#ff9933' }}
                                >
                                    New Inquiry
                                </CNavLink>
                            </CNavItem>
                        )}
                        {visibleTabs.includes('expert') && (
                            <CNavItem>
                                <CNavLink
                                    active={activeTab === 'expert'}
                                    onClick={() => handleTabChange('expert')}
                                    style={{ padding: '10px 20px', color: '#ff9933' }}
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
                                    style={{ padding: '10px 20px', color: '#ff9933' }}
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
                                    style={{ padding: '10px 20px', color: '#ff9933' }}
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
                                    style={{ padding: '10px 20px', color: '#ff9933' }}
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
                                    style={{ padding: '10px 20px', color: '#ff9933' }}
                                >
                                    Cancelled
                                </CNavLink>
                            </CNavItem>
                        )}
                    </CNav>
                        <CButton style={{ textAlign: 'center', maxHeight: '6vh', backgroundColor: '#ff9933', marginRight: '20px' }} onClick={() => setFilterVisible(true)}><FaSearch style={{ color: 'white' }} /></CButton>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    {activeTab === 'new' && <SubTabs from='new' />}
                    {activeTab === 'expert' && <SubTabs from='expert' />}
                    {activeTab === 'reviewer' && <SubTabs from='reviewer' />}
                    {activeTab === 'translator' && <SubTabs from='translator' />}
                    {activeTab === 'publish' && <SubTabs from='new' publish='true' />}
                    {activeTab === 'cancelled' && <SubTabs from='new' substate='cancelled' />}
                </Suspense>

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
