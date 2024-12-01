import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormCheck, CFormInput, CBadge } from '@coreui/react';
import { CButtonToolbar, CButtonGroup } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { GetToken, GetURL } from '../../../library/API';
import { FaExclamationTriangle, FaEye } from 'react-icons/fa';
import { CIcon } from '@coreui/icons-react';
import { cilPencil, cilSearch } from '@coreui/icons';
import { Button } from '@coreui/coreui';

const List = () => {
    const [initialValues] = useState({
        profile_name: '',
        email: '',
        city_id: '',
        dob: '',
        tob: '',
    });
    const [profiles, setProfiles] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [filterIndex, setFilterIndex] = useState(false);
    const [horoscopes, setHoroscopes] = useState([]);
    const [totalCount, setTotalCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [filterParams, setFilterParams] = useState({});
    const [verifiedStatus, setVerifiedStatus] = useState('');
    const [defaultChecked, setDefaultChecked] = useState([false, false, true]);
    const pageSize = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = new URLSearchParams({
                    page_size: pageSize,
                    page_number: activePage,
                    ...filterParams
                });

                const response = await fetch(GetURL(`/backend/GuestProfileUpdate/GetAllGuestProfile?${params.toString()}`), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const data = await response.json();
                if (data.data && data.data.list) {
                    setProfiles(data.data.list);
                    setTotalCount(data.data.total_count);
                }
            } catch (err) {
                console.log('An error occurred. Please try again later.');
            }
        };

        const fetchHoroscopes = async () => {
            try {
                const response = await fetch(GetURL("/backend/DailyRashiUpdates/LoadBaseData"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const data = await response.json();
                if (data.data && data.data.rashi) {
                    setHoroscopes(data.data.rashi);
                }
            } catch (err) {
                console.log('An error occurred. Please try again later.');
            }
        };

        fetchData();
        fetchHoroscopes();
    }, [activePage, filterParams]);

    const handleEdit = (id) => {
        navigate(`/page/guestprofiles?page=manage&id=${id}`);
    };

    const viewDescription = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const handleFilter = (values) => {
        setFilterParams({
            name: values.profile_name,
            email: values.email,
            city_id: values.city_id,
            dob: values.dob,
            tob: values.tob,
            is_profile_verified: verifiedStatus === '' ? undefined : verifiedStatus
        });
        setActivePage(1);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    const handleRadioChange = (status, index) => {
        setVerifiedStatus(status)
        index === 0 ? setDefaultChecked([true, false, false]) : index === 1 ? setDefaultChecked([false, true, false]) : index === 2 ? setDefaultChecked([false, false, true]) : null;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} | ${hours}:${minutes}`;
    };

    const pageCount = totalCount ? Math.ceil(totalCount / pageSize) : 0;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='tablediv'>
            <CButton variant="primary" onClick="hangleshow">Filter</CButton>
            <CButton color='info' onClick={() => setFilterIndex(p => !p)}>Filter</CButton>
            {filterIndex ? 
            <div>
                <Formik 
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={handleFilter}
                >
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="profile_name">Name</label>
                            <Field as={CFormInput} type="text" id="profile_name" name="profile_name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <Field as={CFormInput} type="text" id="email" name="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city_id">City</label>
                            <Field as={CFormInput} type="text" id="city_id" name="city_id" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob">Date of Birth</label>
                            <Field as={CFormInput} type="date" id="dob" name="dob" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tob">Time of Birth</label>
                            <Field as={CFormInput} type="time" id="tob" name="tob" />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="is_profile_verified">Profile Verified</label>
                        <div>
                            <CFormCheck inline type="radio" name="is_profile_verified" id="verifiedYes" value="true" label="Yes" onClick={() => handleRadioChange(true, 0)} defaultChecked={defaultChecked[0]} />
                            <CFormCheck inline type="radio" name="is_profile_verified" id="verifiedNo" value="false" label="No" onClick={() => handleRadioChange(false, 1)} defaultChecked={defaultChecked[1]} />
                            <CFormCheck inline type="radio" name="is_profile_verified" id="verifiedBoth" value="" label="Both" onClick={() => handleRadioChange('', 2)} defaultChecked={defaultChecked[2]} />
                        </div>
                    </div>
                        <CButton type="submit" color="primary">
                            Search
                        </CButton>
                    </Form>
                </Formik>
            </div> 
            : null
            }
            <h4>Guests</h4>
            <CTable hover>
                <thead>
                    <CTableRow>
                        <CTableHeaderCell style={{ textAlign: 'left' }}>Name</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'left' }}>Email</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'left' }}>City ID</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Date of Birth</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Time of Birth</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Updated Date</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Updated By</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Verified</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Active</CTableHeaderCell>
                        <CTableHeaderCell style={{ minWidth: '105px', textAlign: 'center' }}>Action</CTableHeaderCell>
                    </CTableRow>
                </thead>
                <CTableBody>
                    {profiles.map(profile => (
                        <React.Fragment key={profile._id}>
                            <CTableRow>
                                <CTableDataCell style={{ textAlign: 'left' }}>{profile.name}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'left' }}>{profile.email}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'left' }}>{profile.city_id}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>{profile.dob}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>{Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date("2024-01-01T"+profile.tob+":27.642Z"))}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>{formatDate(profile.updated_date)}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>{profile.updated_by}</CTableDataCell>
                                {/* <CTableDataCell>
                                    {profile.guest_profile ? (
                                        <CButton color='info' onClick={() => viewDescription(profile._id)}>View</CButton>
                                    ) : (
                                        "Data not available"
                                    )}
                                </CTableDataCell> */}
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                    {profile.guest_profile == null ? <CBadge color='body-secondary'><span style={{ color: 'gray' }}>Not Verified</span></CBadge> : <CBadge color='success'>Verified</CBadge>}
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                    <CFormCheck 
                                        type="checkbox" 
                                        checked={profile.active} 
                                        disabled 
                                    />
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                    {profile.guest_profile ? (
                                        <CButton color='info' onClick={() => viewDescription(profile._id)}><FaEye /></CButton>
                                    ) : (
                                        <CButton color='info' onClick={() => {}}><FaExclamationTriangle /></CButton>
                                    )}
                                    <CButton color="warning" onClick={() => handleEdit(profile._id)} style={{ marginLeft: '5px' }}><CIcon icon={cilPencil} /></CButton>
                                </CTableDataCell>
                            </CTableRow>
                            {expandedRow === profile._id && (
                                <CTableRow>
                                    <CTableDataCell colSpan={12}>
                                        <div>
                                            <strong>Basic Description:</strong> {profile.guest_profile?.basic_description || 'N/A'}<br />
                                            <strong>Lucky Number:</strong> {profile.guest_profile?.lucky_number || 'N/A'}<br />
                                            <strong>Lucky Gem:</strong> {profile.guest_profile?.lucky_gem || 'N/A'}<br />
                                            <strong>Lucky Color:</strong> {profile.guest_profile?.lucky_color || 'N/A'}<br />
                                            <strong>Rashi:</strong> {
                                                horoscopes.find(h => h.id == profile.guest_profile?.rashi_id)?.name || 'N/A'
                                            }<br />
                                            <strong>Compatibility Description:</strong> {profile.guest_profile?.compatibility_description || 'N/A'}
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            )}
                        </React.Fragment>
                    ))}
                </CTableBody>
            </CTable>
            <CButtonToolbar role="group" aria-label="Toolbar with button groups">
                <CButtonGroup role="group" aria-label="Pagination">
                    {[...Array(pageCount)].map((_, index) => (
                        <CButton
                            key={index}
                            color={activePage === index + 1 ? 'secondary' : 'primary'}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </CButton>
                    ))}
                </CButtonGroup>
            </CButtonToolbar>
        </div>
    );
};

export default List;
