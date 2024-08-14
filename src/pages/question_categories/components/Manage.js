import React, { useEffect, useState } from 'react';
import { CButton, CFormInput, CFormSelect, CFormCheck } from '@coreui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { GetURL } from '../../../library/API';
import { useNavigate, useLocation } from 'react-router-dom';

const Manage = () => {
    const [categoryTypes, setCategoryTypes] = useState([]);
    const [initialValues, setInitialValues] = useState({
        category: '',
        order_id: '',
        category_type_id: '',
        active: false,
    });
    const [updateId, setUpdateId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCategoryTypes = async () => {
            try {
                const response = await fetch(GetURL("/backend/QuestionCategory/LoadBaseData"), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                if (data.data && data.data.category_type) {
                    setCategoryTypes(data.data.category_type);
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        const fetchCategory = async (id) => {
            try {
                const response = await fetch(GetURL(`/backend/QuestionCategory/Get?id=${id}`), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                if (data.data && data.data.item) {
                    setInitialValues({
                        category: data.data.item.category,
                        order_id: data.data.item.order_id,
                        category_type_id: data.data.item.category_type_id,
                        active: data.data.item.active,
                    });
                }
            } catch (err) {
                alert('An error occurred. Please try again later.');
            }
        };

        fetchCategoryTypes();

        const urlParams = new URLSearchParams(location.search);
        const id = urlParams.get('id');
        if (id) {
            setUpdateId(id);
            fetchCategory(id);
        } else {
            setUpdateId(null);
            setInitialValues({
                category: '',
                order_id: '',
                category_type_id: '',
                active: false,
            });
        }
    }, [location.search]);

    const validationSchema = Yup.object({
        category: Yup.string().required('Category is required'),
        order_id: Yup.number().required('Order ID is required').positive('Order ID must be positive').integer('Order ID must be an integer'),
        category_type_id: Yup.string().required('Category type is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const url = updateId ? '/backend/QuestionCategory/Update' : '/backend/QuestionCategory/Create';
        const method = updateId ? 'POST' : 'POST';
        const payload = updateId ? { ...values, _id: updateId } : values;

        try {
            const response = await fetch(GetURL(url), {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                navigate('/page/questioncategory?page=list');
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
                            <label htmlFor="category">Category</label>
                            <Field as={CFormInput} type="text" id="category" name="category" />
                            {errors.category && touched.category && <div className="text-danger">{errors.category}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="order_id">Order ID</label>
                            <Field as={CFormInput} type="number" id="order_id" name="order_id" />
                            {errors.order_id && touched.order_id && <div className="text-danger">{errors.order_id}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category_type_id">Category Type</label>
                            <Field as={CFormSelect} name="category_type_id" id="category_type_id">
                                <option value="">Select Category Type</option>
                                {categoryTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Field>
                            {errors.category_type_id && touched.category_type_id && <div className="text-danger">{errors.category_type_id}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="active">Is Active?</label>
                            <Field type="checkbox" id="active" name="active" />
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
