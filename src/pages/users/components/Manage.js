import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Card, Container, Alert } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm } from 'formik';
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
            <Container className="py-5">
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center">{updateId ? "Update User" : "Create User"}</Card.Title>

                        <Formik
                            initialValues={initialValues}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ handleSubmit, errors, touched }) => (
                                <FormikForm onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Col sm={6}>
                                            <Form.Label htmlFor="name">Name</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="text"
                                                id="name"
                                                name="name"
                                                isInvalid={touched.name && !!errors.name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.name}
                                            </Form.Control.Feedback>
                                        </Col>

                                        <Col sm={6}>
                                            <Form.Label htmlFor="email">Email</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="email"
                                                id="email"
                                                name="email"
                                                isInvalid={touched.email && !!errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Col sm={6}>
                                            <Form.Label htmlFor="user_type_id">User Type</Form.Label>
                                            <Field
                                                as={Form.Select}
                                                id="user_type_id"
                                                name="user_type_id"
                                                isInvalid={touched.user_type_id && !!errors.user_type_id}
                                            >
                                                <option value="">Select User Type</option>
                                                {userTypes.map(type => (
                                                    <option key={type.id} value={type.id}>{type.name}</option>
                                                ))}
                                            </Field>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.user_type_id}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Col sm={6}>
                                            <Form.Label htmlFor="password">Password</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="password"
                                                id="password"
                                                name="password"
                                                isInvalid={touched.password && !!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Row>

                                    <Row className="mb-3 align-items-center">
                                        <Col sm={1}>
                                            <Field type="checkbox" id="active" name="active" />
                                            <Form.Label htmlFor="active">Active</Form.Label>
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-center">
                                        <Button type="submit" style={{ color: 'white', backgroundColor: '#ff9933', border: 'none' }} size="lg" className="w-50">
                                            {updateId ? "Update" : "Create"}
                                        </Button>
                                    </div>
                                </FormikForm>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default Manage;
