import React, { useEffect, useState } from 'react';
import { CButton, CFormInput, CFormSelect, CFormTextarea, CTable, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { GetURL } from '../../../library/API';
import { useNavigate, useLocation } from 'react-router-dom';

const Manage = () => {
    const [userTypes, setUserTypes] = useState([]);
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        user_type_id: '',
        password: '',
    });
    const [updateId, setUpdateId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const response = await fetch(GetURL("/backend/Users/LoadBaseData"), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                if (data.data && data.data.user_type) {
                    setUserTypes(data.data.user_type);
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        const fetchUser = async (id) => {
            try {
                const response = await fetch(GetURL(`/backend/Users/Get?id=${id}`), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                if (data.data && data.data.item) {
                    setInitialValues({
                        name: data.data.item.name,
                        email: data.data.item.email,
                        user_type_id: data.data.item.user_type_id,
                        password: '',
                    });
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        fetchUserTypes();

        const urlParams = new URLSearchParams(location.search);
        const id = urlParams.get('id');
        if (id) {
            setUpdateId(id);
            fetchUser(id);
        } else {
            setUpdateId(null);
            setInitialValues({
                name: '',
                email: '',
                user_type_id: '',
                password: '',
            });
        }
    }, [location.search]);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        user_type_id: Yup.string().required('User type is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const url = updateId ? '/backend/Users/Update' : '/backend/Users/Create';
        const method = updateId ? 'POST' : 'POST';
        const payload = updateId ? { ...values, _id: updateId } : values;

        try {
            const response = await fetch(GetURL(url), {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                navigate('/page/user?page=list');
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (err) {
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <Field as={CFormInput} type="text" id="name" name="name" />
                            {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <Field as={CFormInput} type="email" id="email" name="email" />
                            {errors.email && touched.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user_type_id">User Type</label>
                            <Field as={CFormSelect} name="user_type_id" id="user_type_id">
                                <option value="">Select User Type</option>
                                {userTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Field>
                            {errors.user_type_id && touched.user_type_id && <div className="text-danger">{errors.user_type_id}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <Field as={CFormInput} type="text" id="password" name="password" />
                            {errors.password && touched.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <CButton type="submit" color="primary">
                            {updateId ? "Update" : "Create"}
                        </CButton>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Manage;
