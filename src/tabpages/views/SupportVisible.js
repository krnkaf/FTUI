import React, { useContext, useEffect, useState } from 'react';
import { CButton, CFormSelect, CFormTextarea, CToast, CToastBody, CToastHeader } from '@coreui/react';
import { GetToken, GetURL } from '../../library/API';
import { Formik, Form, Field } from 'formik';
import { UserContext } from '../Inquiry';
import { DetailedContext } from './TableView';
import { useToast } from '../../ToastComponent';

const SupportVisible = ({ inquiry_id }) => {
    const [userTypes, setUserTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { setShowDetailedView } = useContext(DetailedContext)
    const { fetchInquiries, state, status, userList } = useContext(UserContext);
    const { showToast } = useToast();

    const fetchData = async () => {
        try {
            const typesResponse = await fetch(GetURL("/backend/Users/LoadBaseData"), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken()
                }
            }).catch(e => showToast('Failed', 'Failed to load user list.' + e, 2));

            const typesData = await typesResponse.json();
            if (typesData.data && typesData.data.user_type) {
                setUserTypes(typesData.data.user_type);
            }

            const usersResponse = await fetch(GetURL("/backend/Users/GetAllList"), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken()
                }
            }).catch(e => showToast('Failed', 'Failed to load user.' + e, 2));
            const usersData = await usersResponse.json();
            if (usersData.data && usersData.data.list) {
                setUsers(usersData.data.list);
                setFilteredUsers(usersData.data.list);
            }
        } catch (err) {
            // alert('An error occurred. Please try again later.');
            showToast('Failed', 'An error occuring while loading the component.' + err, 2);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        const payload = {
            assignee_id: values.selectedUser,
            comment: values.comment,
            inquiry_id: inquiry_id,
        };

        if (values.selectedType && values.selectedUser) {
            try {
                const response = await fetch(GetURL("/backend/InquiryManagement/ChangeAssignee"), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    resetForm();
                    fetchInquiries(state, status);
                    setShowDetailedView(false);
                    showToast('Success', `Inquiry assigned to ${userList.find(e => e._id = values.selectedUser).name}`, 1)
                } else {
                    showToast('Failed', `Unable to assign inquiry`, 2)
                }
            } catch (err) {
                showToast('Failed', `An error has occurred ${err}`)
            }
        } else {
            showToast('Info', 'Please select both user type and user.', 3)
        }
    };

    return (
        <div style={{
            maxWidth: '100vw',
            margin: '0 auto',
            padding: '15px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}>
            <h4 style={{ textAlign: 'center', fontWeight: '600', marginBottom: '20px' }}>Assign Task</h4>
            <Formik
                initialValues={{ comment: '', selectedType: '', selectedUser: '' }}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, resetForm }) => (
                    <Form>
                        {/* Comment Textarea */}
                        <div className="mb-3" style={{ marginBottom: '15px' }}>
                            <label htmlFor="comment" style={{ fontWeight: '500', fontSize: '14px' }}>Comment:</label>
                            <Field
                                as={CFormTextarea}
                                id="comment"
                                name="comment"
                                rows={2}
                                placeholder="Enter your comment"
                                style={{ width: '100%', marginTop: '5px', fontSize: '13px' }}
                            />
                        </div>

                        {/* User Type and User Select */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <div style={{ flex: '1', marginRight: '10px' }}>
                                <label htmlFor="userType" style={{ fontWeight: '500', fontSize: '14px' }}>For:</label>
                                <Field
                                    as={CFormSelect}
                                    id="userType"
                                    name="selectedType"
                                    onChange={e => {
                                        const typeId = e.target.value;
                                        setFieldValue("selectedType", typeId);
                                        const filtered = users.filter(user => user.user_type_id.toString() === typeId);
                                        setFilteredUsers(filtered);
                                        setFieldValue("selectedUser", '');
                                    }}
                                    style={{ width: '100%', fontSize: '13px' }}
                                >
                                    <option value="">Select User Type</option>
                                    {userTypes.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </Field>
                            </div>

                            <div style={{ flex: '1' }}>
                                <label htmlFor="user" style={{ fontWeight: '500', fontSize: '14px' }}>To:</label>
                                <Field
                                    as={CFormSelect}
                                    id="user"
                                    name="selectedUser"
                                    disabled={!values.selectedType}
                                    style={{ width: '100%', fontSize: '13px' }}
                                >
                                    <option value="">Select User</option>
                                    {filteredUsers.map(user => (
                                        <option key={user._id} value={user._id}>{user.name}</option>
                                    ))}
                                </Field>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div style={{ textAlign: 'center' }}>
                            <CButton 
                                type="submit" 
                                color="primary" 
                                style={{ fontSize: '14px', padding: '8px 20px', width: '100%', backgroundColor: '#ff9933', borderColor: '#ff9933' }} >
                                Assign
                            </CButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SupportVisible;
