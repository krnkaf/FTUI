import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormCheck, CFormInput } from '@coreui/react';
import { CButtonToolbar, CButtonGroup } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { GetToken, GetURL } from '../../../library/API';

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
                alert('An error occurred. Please try again later.');
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
                alert('An error occurred. Please try again later.');
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

    const pageCount = totalCount ? Math.ceil(totalCount / pageSize) : 0;

    return (
        <div className='tablediv'>
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
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Email</CTableHeaderCell>
                        <CTableHeaderCell>City ID</CTableHeaderCell>
                        <CTableHeaderCell>Date of Birth</CTableHeaderCell>
                        <CTableHeaderCell>Time of Birth</CTableHeaderCell>
                        <CTableHeaderCell>Updated Date</CTableHeaderCell>
                        <CTableHeaderCell>Updated By</CTableHeaderCell>
                        <CTableHeaderCell>Created Date</CTableHeaderCell>
                        <CTableHeaderCell>Created By</CTableHeaderCell>
                        <CTableHeaderCell>Description</CTableHeaderCell>
                        <CTableHeaderCell>Active</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                </thead>
                <CTableBody>
                    {profiles.map(profile => (
                        <React.Fragment key={profile._id}>
                            <CTableRow>
                                <CTableDataCell>{profile.name}</CTableDataCell>
                                <CTableDataCell>{profile.email}</CTableDataCell>
                                <CTableDataCell>{profile.city_id}</CTableDataCell>
                                <CTableDataCell>{profile.dob}</CTableDataCell>
                                <CTableDataCell>{profile.tob}</CTableDataCell>
                                <CTableDataCell>{profile.updated_date}</CTableDataCell>
                                <CTableDataCell>{profile.updated_by}</CTableDataCell>
                                <CTableDataCell>{profile.created_date}</CTableDataCell>
                                <CTableDataCell>{profile.created_by}</CTableDataCell>
                                <CTableDataCell>
                                    {profile.guest_profile ? (
                                        <CButton color='info' onClick={() => viewDescription(profile._id)}>View</CButton>
                                    ) : (
                                        "Data not available"
                                    )}
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CFormCheck 
                                        type="checkbox" 
                                        checked={profile.active} 
                                        disabled 
                                    />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="warning" onClick={() => handleEdit(profile._id)}>Update</CButton>
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
