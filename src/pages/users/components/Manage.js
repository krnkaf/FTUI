import React, { useEffect, useState } from 'react';
import { CButton, CFormInput, CFormSelect, CFormCheck } from '@coreui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { GetToken, GetURL } from '../../../library/API';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../../../ToastComponent';

const Manage = () => {
    const [userTypes, setUserTypes] = useState([]);
    const [initialValues, setInitialValues] = useState({
        _id: '',
        name: '',
        email: '',
        user_type_id: '',
        password: '',
        active: true
    });
    const [updateId, setUpdateId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { showToast } = useToast();

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const response = await fetch(GetURL("/backend/Users/LoadBaseData"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const data = await response.json();
                if (data.data && data.data.user_type) {
                    setUserTypes(data.data.user_type);
                }
            } catch (err) {
                showToast('Failed', 'An error occurred. Please try again later.', 2);
            }
        };

        const fetchUser = async (id) => {
            try {
                const response = await fetch(GetURL(`/backend/Users/Get?id=${id}`), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const data = await response.json();
                if (data.data && data.data.item) {
                    setInitialValues({
                        _id: id,
                        name: data.data.item.name,
                        email: data.data.item.email,
                        user_type_id: data.data.item.user_type_id,
                        password: '',
                        active: data.data.item.active || false
                    });
                }
            } catch (err) {
                showToast('Failed', 'An error occurred. Please try again later.', 2);
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
                _id: '',
                name: '',
                email: '',
                user_type_id: '',
                password: '',
                active: false
            });
        }
    }, [location.search]);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        user_type_id: Yup.number().required('User type is required').positive().integer(),
        password: Yup.string().required('Password is required'),
        active: Yup.boolean()
    });

    const handleSubmit = async (values, { resetForm }) => {
        const url = updateId ? '/backend/Users/Update' : '/backend/Users/Create';
        const method = 'POST';

        const payload = {
            ...values,
            user_type_id: Number(values.user_type_id),
            active: values.active
        };

        if (updateId) {
            payload._id = updateId;
        }

        try {
            const response = await fetch(GetURL(url), {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': GetToken() 
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                navigate('/page/user?page=list');
            } else {
                const errorData = await response.json();
                showToast('Failed', errorData.message);
            }
        } catch (err) {
            showToast('Failed', 'An error occurred. Please try again later.', 2);
        }

        resetForm();
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
                            <Field as={CFormInput} type="password" id="password" name="password" />
                            {errors.password && touched.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <Field type="checkbox" id="active" name="active" />
                            <label htmlFor="active" className="ms-2">Active</label>
                            {errors.active && touched.active && <div className="text-danger">{errors.active}</div>}
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
