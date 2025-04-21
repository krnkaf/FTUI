import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormCheck, CFormInput, CBadge, CModal, CModalHeader, CModalBody, CModalFooter, CButtonToolbar, CButtonGroup } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { GetToken, GetURL } from '../../../library/API';
import { FaExclamationTriangle, FaEye } from 'react-icons/fa';
import { CIcon } from '@coreui/icons-react';
import { cilPencil, cilSearch } from '@coreui/icons';
import { FaSearch } from 'react-icons/fa';
import { useToast } from '../../../ToastComponent';

const List = () => {
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const [initialValues] = useState({
        name: '',
        email: '',
        city_id: '',
        dob: '',
        tob: '',
    });
    const [profiles, setProfiles] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [horoscopes, setHoroscopes] = useState([]);
    const [totalCount, setTotalCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [filterParams, setFilterParams] = useState({});
    const [verifiedStatus, setVerifiedStatus] = useState('');
    const [defaultChecked, setDefaultChecked] = useState([false, false, true]);
    const pageSize = 5;
    const navigate = useNavigate();
    const newData = {
        "_id": "67d6a3783e72b4a6d9ac90a3",
        "name": "string",
        "email": "jaagya22@tbc.edu.np",
        "city_id": "67d68b6f3e72b4a6d9abd935",
        "tz": 3.22,
        "dob": "2024-01-01",
        "tob": "23:59",
        "token": "6fe8db73-07f8-4dc2-b663-40c162433622",
        "otp": null,
        "active": true,
        "device_token": "123456",
        "device_type": "android",
        "guest_profile": null,
        "city": {
            "_id": "67d68b6f3e72b4a6d9abd935",
            "city_ascii": "Kathmandu",
            "lat": "27.7100",
            "lng": "85.3200",
            "country": "Nepal",
            "iso2": "NP",
            "iso3": "NPL",
            "city_id": "1524589448",
            "updated_date": "0001-01-01T00:00:00Z",
            "updated_by": null,
            "created_date": "0001-01-01T00:00:00Z",
            "created_by": null
        },
        "api_planet_detail": null,
        "updated_date": "2025-03-16T10:10:00.578Z",
        "updated_by": "",
        "created_date": "2025-03-16T10:10:00.578Z",
        "created_by": ""
    }

    const [showFilterModal, setShowFilterModal] = useState(false);

    const [cities, setCities] = useState([])

    const fetchCities = async (city) => {
        try {
            const response = await fetch(GetURL(`/frontend/Guests/SearchCity?search_param=${city}`), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken()
                }
            })

            const data = await response.json();
            setCities(data);
            // return String.toString(data);
        } catch (err) {
            console.err(err);
            return 'none';
        } finally {
            setLoading(true);
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const params = new URLSearchParams({
                    page_size: pageSize,
                    page_number: activePage,
                    ...filterParams,
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
                showToast('Error', 'Failed to load profiles. Please try again later.', 2);
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
                showToast('Error', 'Failed to load horoscopes. Please try again later.', 2);
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
            name: values.name,
            email: values.email,
            city_id: values.city_id,
            dob: values.dob,
            tob: values.tob,
            is_profile_verified: verifiedStatus === '' ? undefined : verifiedStatus
        });
        setActivePage(1);
        setShowFilterModal(false);
        showToast('Filter Applied', 'Filter has been applied successfully.', 3);
    };

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    const handleRadioChange = (status, index) => {
        setVerifiedStatus(status);
        index === 0 ? setDefaultChecked([true, false, false]) : index === 1 ? setDefaultChecked([false, true, false]) : index === 2 ? setDefaultChecked([false, false, true]) : null;
    };

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

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className='tablediv'>
            <CButton color='info' onClick={() => setShowFilterModal(true)} style={{ backgroundColor: '#ff9933', border: 'none' }}> <FaSearch style={{ verticalAlign: 'baseline', color: 'white' }} /> </CButton>
            <CModal visible={showFilterModal} onClose={() => setShowFilterModal(false)} size="lg">
                <CModalHeader closeButton>
                    <h5>Filter Profiles</h5>
                </CModalHeader>
                <CModalBody>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={handleFilter}
                    >
                        <Form>
                            <div className="mb-3 row">
                                <div className="col-6">
                                    <label htmlFor="name">Name</label>
                                    <Field as={CFormInput} type="text" id="name" name="name" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="email">Email</label>
                                    <Field as={CFormInput} type="text" id="email" name="email" />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <div className="col-6">
                                    <label htmlFor="city_id">City</label>
                                    <Field as={CFormInput} type="text" id="city_id" name="city_id" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <Field as={CFormInput} type="date" id="dob" name="dob" />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <div className="col-6">
                                    <label htmlFor="tob">Time of Birth</label>
                                    <Field as={CFormInput} type="time" id="tob" name="tob" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="is_profile_verified">Profile Verified</label>
                                    <div>
                                        <CFormCheck inline type="radio" name="is_profile_verified" id="verifiedYes" value="true" label="Yes" onClick={() => handleRadioChange(true, 0)} defaultChecked={defaultChecked[0]} />
                                        <CFormCheck inline type="radio" name="is_profile_verified" id="verifiedNo" value="false" label="No" onClick={() => handleRadioChange(false, 1)} defaultChecked={defaultChecked[1]} />
                                        <CFormCheck inline type="radio" name="is_profile_verified" id="verifiedBoth" value="" label="Both" onClick={() => handleRadioChange('', 2)} defaultChecked={defaultChecked[2]} />
                                    </div>
                                </div>
                            </div>

                            <CButton type="submit" color="primary" style={{ width: '100%' }}>Search</CButton>
                        </Form>
                    </Formik>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowFilterModal(false)}>Close</CButton>
                </CModalFooter>
            </CModal>

            <h4 style={{ marginTop: '20px' }}>Guests</h4>
            <button onClick={() => { console.log(cities) }}>Cities</button>
            <CTable hover>
                <thead>
                    <CTableRow>
                        <CTableHeaderCell style={{ textAlign: 'left' }}>Name</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'left' }}>Email</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'left' }}>City</CTableHeaderCell>
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
                                <CTableDataCell style={{ textAlign: 'left' }}>{profile.city.city_ascii}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>{profile.dob}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>{Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date("2024-01-01T" + profile.tob + ":27.642Z"))}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>{formatDate(profile.updated_date)}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>{profile.updated_by}</CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                    {profile.guest_profile == null ? <CBadge color='body-secondary'><span style={{ color: 'gray' }}>Not Verified</span></CBadge> : <CBadge style={{ color: 'white', backgroundColor: '#556B2F' }}>Verified</CBadge>}
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center' }}>
                                    <CFormCheck
                                        style={{ backgroundColor: 'gray', border: 'none' }}
                                        type="checkbox"
                                        checked={profile.active}
                                        disabled
                                    />
                                </CTableDataCell>
                                <CTableDataCell style={{ textAlign: 'center', alignItems: 'center' }}>
                                    {profile.guest_profile ? (
                                        <CButton
                                            style={{ padding: '4px 8px', fontSize: '14px', margin: '0 5px', borderWidth: '0px 0px 1px 1px', borderStyle: 'solid', borderColor: 'gray' }}
                                            onClick={() => viewDescription(profile._id)}
                                            size="sm"
                                        >
                                            <FaEye style={{ color: '#ff9933' }} />
                                        </CButton>
                                    ) : (
                                        <CButton
                                            style={{ padding: '4px 8px', fontSize: '14px', margin: '0 5px', borderWidth: '0px 0px 1px 1px', borderStyle: 'solid', borderColor: 'gray' }}
                                            onClick={() => { }}
                                            size="sm"
                                        >
                                            <FaExclamationTriangle style={{ color: '#ff9933' }} />
                                        </CButton>
                                    )}
                                    <CButton
                                        style={{ padding: '4px 8px', fontSize: '14px', marginLeft: '5px', borderWidth: '0px 0px 1px 1px', borderStyle: 'solid', borderColor: 'gray' }}
                                        onClick={() => handleEdit(profile._id)}
                                        size="sm"
                                    >
                                        <CIcon icon={cilPencil} style={{ color: '#ff9933' }} />
                                    </CButton>
                                </CTableDataCell>
                            </CTableRow>
                            {expandedRow === profile._id && (
                                <CTableRow>
                                    <CTableDataCell colSpan={10} style={{ padding: '10px', width: '100%' }}>
                                        <div style={{ width: '100%', wordWrap: 'break-word' }}>
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
                            style={{
                                backgroundColor: activePage === index + 1 ? 'gray' : 'white',
                                color: activePage === index + 1 ? 'white' : 'black'
                            }}
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
