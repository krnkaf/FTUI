import React, { Suspense, useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CNav, CNavItem, CNavLink, CButton, CPagination, CModal, CModalBody, CModalFooter, CFormInput, CFormSelect, CPaginationItem } from '@coreui/react';
import TableView from './views/TableView';
import { GetToken, GetURL } from '../library/API';
import { useToast } from '../ToastComponent';
import { FaSearch } from 'react-icons/fa';
import { Pagination } from 'react-bootstrap';

export const UserContext = createContext();

const Inquiry = () => {
    try {
        const navigate = useNavigate();
        const [userList, setUserList] = useState([]);
        const [currentUser, setCurrentUser] = useState(null);
        const [userTypeId] = useState(localStorage.getItem('user_type_id'));
        const [fromPage, setFromPage] = useState('new');
        const [activeTab, setActiveTab] = useState('');
        const [visibleTabs, setVisibleTabs] = useState([]);
        const [filterVisible, setFilterVisible] = useState(false);
        const [filters, setFilters] = useState({
            inquiry_number: '',
            inquiry_date: '',
            inquiry_payment_status: '',
            question_id: '',
            assignee_id: '',
            category_type_id: ''
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
        
        const [state, setState] = useState(pathSegments[3]);
        const [status, setStatus] = useState('pending');
        const [inquiryList, setInquiryList] = useState([]);

        const [category_type, set_category_type] = useState([]);
        const [assignee_list, set_assignee_list] = useState([]);
        const [question, set_question] = useState([]);

        const [filterParams, setFilterParams] = useState({});

        const [currentPage, setCurrentPage] = useState(1);
        const [totalCount, setTotalCount] = useState(null);
        const pageSize = 10;
        const totalPages = Math.ceil(totalCount / pageSize);

        const handleTabChange = (tab) => {
            setActiveTab(tab);
            setState(tab);
            setStatus('pending');
            handleClearFilters();
            navigate(`/tabpages/inquiry/${tab}/${status}`);
        };
        
        const handleStatusChange = (status) => {
            handleClearFilters();
            setStatus(status);
            navigate(`/tabpages/inquiry/${activeTab}/${status}`);
        };

        const handleFilterChange = (e) => {
            setFilters({ ...filters, [e.target.name]: e.target.value });
        };

        const handleApplyFilters = () => {
            setFilterVisible(false);
            console.log(filters);

            setFilterParams(Object.fromEntries(
                Object.entries(filters).filter(([key, value]) => value !== null && value !== '')
            ));

            showToast('Items Filtered');
        };

        const handleClearFilters = () => {
            setFilters({
                inquiry_number: '',
                inquiry_date: '',
                inquiry_payment_status: '',
                question_id: '',
                assignee_id: '',
                category_type_id: ''
            });
        };
        
        const fetchFilterForInquiry = async () => {
            try {
                const response = await fetch(GetURL(`/backend/InquiryManagement/GetFilterForInquiry`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });

                const data = await response.json();
                set_category_type(data.data.category_type);
                set_assignee_list(data.data.assignee_list);
                set_question(data.data.question);
            } catch (e) {
                showToast('Failed', 'Cannot fetch inquiries right now. Try again later.', 2)
            }
        }

        const fetchInquiries = async (state, status) => {
            try {
                const statestatusURL = new URLSearchParams({
                    inquiry_state: state,
                    inquiry_status: status
                }).toString();

                const filterURL = new URLSearchParams(filterParams).toString();

                const paginationURL = new URLSearchParams({
                    page_number: currentPage,
                    page_size: pageSize
                }).toString();

                const fullURL = statestatusURL + (filterURL ? '&' + filterURL : '') + (paginationURL ? '&' + paginationURL : '');

                const response = await fetch(GetURL(`/backend/InquiryManagement/GetInquiries?${fullURL}`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });

                const data = await response.json();
                setInquiryList(data.data.list);
                setTotalCount(data.data.total_count)
            } catch (e) {
                showToast('Failed', 'Cannot fetch inquiries right now. Try again later.', 2)
            }
        }

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

        useEffect(() => {
            fetchInquiries(state, status);
        }, [state, status, filterParams, currentPage]);

        useEffect(() => {
            fetchFilterForInquiry();
        }, [])

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
                        {(from != 'new') && <CNavItem>
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
                        <TableView page={fromPage} state={from} status="completed" substate={substate} />
                    )}
                </>
            );
        };

        return (
            <UserContext.Provider value={{ category_type, id: userTypeId, assignee: currentUser, userList, fromPage: fromPage, state: state, setState, status: status, setStatus, inquiryList: [inquiryList], setInquiryList, fetchInquiries, category_type }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: '', marginLeft: '20px' }}>
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

                <Pagination style={{ marginLeft: '20px' }}>
                    <Pagination.First onClick={() => setCurrentPage(1)} />
                    <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />

                    {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <Pagination.Item
                                key={pageNumber}
                                active={pageNumber === currentPage}
                                onClick={() => setCurrentPage(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>
                        );
                    })}

                    <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
                    <CFormInput style={{ width: '5%' }}></CFormInput>
                </Pagination>

                <CModal visible={filterVisible} onClose={() => setFilterVisible(false)}>
                    <CModalBody>
                        <div>
                            <label htmlFor="inquiry_number" style={{ textDecoration: 'none', color: 'gray', marginTop: '5px' }}>Inquiry Number</label>
                            <CFormInput
                                type="text"
                                id="inquiry_number"
                                name="inquiry_number"
                                value={filters.inquiry_number}
                                onChange={handleFilterChange}
                            />

                            <label htmlFor="inquiry_date" style={{ textDecoration: 'none', color: 'gray', marginTop: '5px' }}>Inquiry Date</label>
                            <CFormInput
                                type="date"
                                id="inquiry_date"
                                name="inquiry_date"
                                value={filters.inquiry_date}
                                onChange={handleFilterChange}
                            />

                            <label htmlFor="inquiry_payment_status" style={{ textDecoration: 'none', color: 'gray', marginTop: '5px' }}>Payment Status</label>
                            <CFormSelect
                                name="inquiry_payment_status"
                                value={filters.inquiry_payment_status}
                                onChange={handleFilterChange}
                                placeholder='Selecta'
                            >
                                <option key={-1} value="">Select</option>
                                {['Pending', 'Paid', 'Failed'].map((e, i) => (
                                    <option key={i} value={i}>{e}</option>
                                ))}
                            </CFormSelect>
                                
                            <label htmlFor="question_id" style={{ textDecoration: 'none', color: 'gray', marginTop: '5px' }}>Question</label>
                            <CFormSelect
                                name='question_id'
                                id='question_id'
                                onChange={handleFilterChange}
                            >
                                <option key={-1} value={''}> Select </option>
                                {question.map((k, v) => (
                                    <option key={v} value={k._id}>{k.category_type} - {k.question}</option>
                                ))}
                            </CFormSelect>
                            
                            <label htmlFor="assignee_id" style={{ textDecoration: 'none', color: 'gray', marginTop: '5px' }}>Assignee</label>
                            <CFormSelect
                                name='assignee_id'
                                value={filters.assignee_id}
                                onChange={handleFilterChange}
                            >
                                <option key='-1' value=''>Select a User</option>
                                {assignee_list.map((e, i) => {
                                    if (state == 'expert' && e.user_type_id == 3) {
                                        return <option key={i} value={e._id}>{e.name}</option>
                                    }
                                    else if (state == 'translator' && e.user_type_id == 4) {
                                        return <option key={i} value={e._id}>{e.name}</option>
                                    }
                                    else if (state == 'reviewer' && e.user_type_id == 5) {
                                        return <option key={i} value={e._id}>{e.name}</option>
                                    }
                                    else
                                        return <></>
                                })}
                            </CFormSelect>

                            <label htmlFor="category_type_id" style={{ textDecoration: 'none', color: 'gray', marginTop: '5px' }}>Category Type</label>
                            <CFormSelect
                                id="category_type_id"
                                name="category_type_id"
                                onChange={handleFilterChange}
                            >   
                                <option key={-1} value={''}>Select</option>
                                {category_type.map((k, i) => {
                                    <option key={i} value={k.id}>{k.name}</option>
                                })}
                            </CFormSelect>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setFilterVisible(false)}>Close</CButton>
                        <CButton color="primary" onClick={handleApplyFilters}>Apply Filters</CButton>
                        <CButton color="danger" onClick={handleClearFilters}>Clear Filters</CButton>
                    </CModalFooter>
                </CModal>

                {/* category_type: "Horosope"
                    category_type_id: 1
                    question: "1 day"
                    question_category_id: "673eb375094af6a20d4686ce"
                    question_category_name: "Horoscope"
                    _id: "673eb390094af6a20d4686cf" */}

            </UserContext.Provider>
        );
    } catch (error) {
        return (<h1> This Page Cannot Be Opened Right Now! due to an error. &nbsp; {console.log(error)}</h1>)
    }
};

export default Inquiry;
