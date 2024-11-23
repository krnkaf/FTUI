import React, { useEffect, useState } from 'react';
import { CButton, CFormInput, CFormSelect } from '@coreui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetToken, GetURL } from '../../../library/API';

const Manage = () => {
    const [categories, setCategories] = useState([]);
    const [initialValues, setInitialValues] = useState({
        _id: '',
        question: '',
        order_id: '',
        question_category_id: '',
        active: true,
        price: ''
    });

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(GetURL("/backend/Question/LoadBaseData"), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.data.question_category_items);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        const fetchQuestion = async (id) => {
            try {
                const response = await fetch(GetURL(`/backend/Question/Get?id=${id}`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": GetToken()
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setInitialValues({
                        _id: data.data.item._id,
                        question: data.data.item.question,
                        order_id: data.data.item.order_id,
                        question_category_id: data.data.item.question_category_id,
                        active: data.data.item.active,
                        price: data.data.item.price
                    });
                } else {
                    console.error('Failed to fetch question');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchCategories();

        const query = new URLSearchParams(location.search);
        const id = query.get('id');
        if (id) {
            fetchQuestion(id);
        }

    }, [location.search]);

    const validationSchema = Yup.object({
        question: Yup.string().required('Question is required'),
        order_id: Yup.number().required('Order ID is required'),
        question_category_id: Yup.string().required('Category is required'),
        price: Yup.number().required('Price is required'),
    });

    const handleSubmit = (values) => {
        const formattedValues = {
            ...values,
            active: values.active
        };

        if (formattedValues._id) {
            fetch(GetURL('/backend/Question/Update'), {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': GetToken() 
                },
                body: JSON.stringify(formattedValues)
            })
            .then(response => response.json())
            .then(() => navigate('/page/questions?page=list'))
            .catch(error => console.error('An error occurred:', error));
        } else {
            fetch(GetURL('/backend/Question/Create'), {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': GetToken() 
                },
                body: JSON.stringify(formattedValues)
            })
            .then(response => response.json())
            .then(() => navigate('/page/questions?page=list'))
            .catch(error => console.error('An error occurred:', error));
        }
    };

    return (
        <div style={{ 
            padding: '30px', 
            maxWidth: '1000px',  // Increase max-width for larger form
            margin: '0 auto', 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
            borderRadius: '10px', 
            backgroundColor: '#fff',
            height: 'auto' 
        }}>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="question" className="form-label">Question</label>
                            <Field
                                as={CFormInput}
                                id="question"
                                name="question"
                                placeholder="Enter the question"
                                className={`form-control ${errors.question && touched.question ? 'is-invalid' : ''}`}
                                style={{ fontSize: '1.1rem', padding: '12px 16px' }}  // Larger text and padding
                            />
                            {errors.question && touched.question && (
                                <div className="invalid-feedback">{errors.question}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="question_category_id" className="form-label">Category</label>
                            <Field as={CFormSelect} id="question_category_id" name="question_category_id" className={`form-select ${errors.question_category_id && touched.question_category_id ? 'is-invalid' : ''}`} style={{ fontSize: '1.1rem', padding: '12px 16px' }}>
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.question_category_id} value={category.question_category_id}>
                                        {category.question_category}
                                    </option>
                                ))}
                            </Field>
                            {errors.question_category_id && touched.question_category_id && (
                                <div className="invalid-feedback">{errors.question_category_id}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="order_id" className="form-label">Order ID</label>
                            <Field
                                as={CFormInput}
                                type="number"
                                id="order_id"
                                name="order_id"
                                placeholder="Enter order ID"
                                className={`form-control ${errors.order_id && touched.order_id ? 'is-invalid' : ''}`}
                                style={{ fontSize: '1.1rem', padding: '12px 16px' }}  // Larger text and padding
                            />
                            {errors.order_id && touched.order_id && (
                                <div className="invalid-feedback">{errors.order_id}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="price" className="form-label">Price</label>
                            <Field
                                as={CFormInput}
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Enter price"
                                className={`form-control ${errors.price && touched.price ? 'is-invalid' : ''}`}
                                style={{ fontSize: '1.1rem', padding: '12px 16px' }}  // Larger text and padding
                            />
                            {errors.price && touched.price && (
                                <div className="invalid-feedback">{errors.price}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="active" className="form-label">Is Active?</label>
                            <Field type="checkbox" id="active" name="active" className="form-check-input" />
                        </div>

                        <CButton type="submit" color="primary" className="w-100" style={{ fontSize: '1.2rem', padding: '14px' }}>Save</CButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Manage;
