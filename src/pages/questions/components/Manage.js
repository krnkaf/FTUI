import React, { useEffect, useState } from 'react';
import { CButton, CFormInput, CFormSelect } from '@coreui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { GetURL } from '../../../library/API';

const Manage = () => {
    const [categories, setCategories] = useState([]);
    const [initialValues, setInitialValues] = useState({
        _id: '',
        question: '',
        order_id: '',
        question_category_id: '',
        active: 'false',
        price: ''
    });

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(GetURL("/backend/Question/LoadBaseData"), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
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
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const data = await response.json();
                    setInitialValues({
                        _id: data.data.item._id,
                        question: data.data.item.question,
                        order_id: data.data.item.order_id,
                        question_category_id: data.data.item.question_category_id,
                        active: data.data.item.active ? 'true' : 'false',
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
        const urlPath = location.pathname + location.search;
        const endpoint = urlPath.includes('/page/questions?page=manage') && location.search.split("&").length === 2 ? '/backend/Question/Update' : '/backend/Question/Create';

        const formattedValues = {
            ...values,
            active: values.active === 'true'
        };

        if (formattedValues._id) {
            fetch(GetURL('/backend/Question/Update'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedValues)
            })
            .then(response => response.json())
            .then(() => navigate('/page/questions?page=list'))
            .catch(error => console.error('An error occurred:', error));
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
                            <label htmlFor="question">Question</label>
                            <Field as={CFormInput} id="question" name="question" />
                            {errors.question && touched.question && <div className="text-danger">{errors.question}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="order_id">Order ID</label>
                            <Field as={CFormInput} type="number" id="order_id" name="order_id" />
                            {errors.order_id && touched.order_id && <div className="text-danger">{errors.order_id}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="question_category_id">Category</label>
                            <Field as={CFormSelect} id="question_category_id" name="question_category_id">
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.question_category_id} value={category.question_category_id}>
                                        {category.question_category}
                                    </option>
                                ))}
                            </Field>
                            {errors.question_category_id && touched.question_category_id && <div className="text-danger">{errors.question_category_id}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price">Price</label>
                            <Field as={CFormInput} type="number" id="price" name="price" />
                            {errors.price && touched.price && <div className="text-danger">{errors.price}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="active">Is Active?</label>
                            <Field as={CFormSelect} id="active" name="active">
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </Field>
                        </div>
                        <CButton type="submit" color="primary">Save</CButton>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Manage;
