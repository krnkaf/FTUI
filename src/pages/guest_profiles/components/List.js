import React, { useEffect, useState } from 'react';
import { CButton, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormCheck } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { GetToken, GetURL } from '../../../library/API';

const List = () => {
    const [profiles, setProfiles] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(GetURL("/backend/GuestProfileUpdate/GetAllGuestProfile"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const data = await response.json();
                if (data.data && data.data.list) {
                    setProfiles(data.data.list);
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`/page/guestprofiles?page=manage&id=${id}`);
    };

    const viewDescription = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div className='tablediv'>
            <h4>Categories</h4>
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
                                    {profile.guest_profile != null ? (
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
                                    <CTableDataCell colSpan={11}>
                                        <div>
                                            <strong>Basic Description:</strong> {profile.guest_profile?.basic_description || 'N/A'}<br />
                                            <strong>Lucky Number:</strong> {profile.guest_profile?.lucky_number || 'N/A'}<br />
                                            <strong>Lucky Gem:</strong> {profile.guest_profile?.lucky_gem || 'N/A'}<br />
                                            <strong>Lucky Color:</strong> {profile.guest_profile?.lucky_color || 'N/A'}<br />
                                            <strong>Rashi:</strong> {profile.guest_profile?.rashi_id || 'N/A'}<br />
                                            <strong>Compatibility Description:</strong> {profile.guest_profile?.compatibility_description || 'N/A'}
                                        </div>
                                    </CTableDataCell>
                                </CTableRow>
                            )}
                        </React.Fragment>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
};

export default List;
