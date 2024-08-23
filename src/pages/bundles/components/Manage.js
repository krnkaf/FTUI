import React, { useEffect, useState } from 'react';
import { CButton, CFormInput, CFormSelect, CFormTextarea, CFormSwitch } from '@coreui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { GetToken, GetURL } from '../../../library/API';
import { useNavigate, useLocation } from 'react-router-dom';

const Manage = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: '',
        effective_from: '',
        effective_to: '',
        active: true,
        price: '',
        horoscope_question_count: '',
        compatibility_question_count: '',
        auspicious_question_id: '',
        image_blob: ''
    });
    const [auspiciousOptions, setAuspiciousOptions] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [bundleName, setBundleName] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchAuspiciousOptions = async () => {
            try {
                const response = await fetch(GetURL("/backend/Bundle/LoadBaseData"), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const data = await response.json();
                if (data.data && data.data.question_for_auspicious_time) {
                    setAuspiciousOptions(data.data.question_for_auspicious_time);
                }
            } catch (err) {
                alert('An error occurred while fetching Auspicious options.');
            }
        };

        const fetchBundleData = async (id) => {
            try {
                const response = await fetch(GetURL(`/backend/Bundle/Get?id=${id}`), {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': GetToken() 
                    }
                });
                const data = await response.json();
                const bundle = data.data?.item || {};
                setBundleName(bundle.name || '');
                setImagePreview(bundle.image_blob || '');
                setInitialValues({
                    name: bundle.name || '',
                    description: bundle.description || '',
                    effective_from: bundle.effective_from ? new Date(bundle.effective_from).toISOString().split('T')[0] : '',
                    effective_to: bundle.effective_to ? new Date(bundle.effective_to).toISOString().split('T')[0] : '',
                    active: bundle.active || true,
                    price: bundle.price || '',
                    horoscope_question_count: bundle.horoscope_question_count || '',
                    compatibility_question_count: bundle.compatibility_question_count || '',
                    auspicious_question_id: bundle.auspicious_question_id || '',
                    image_blob: bundle.image_blob || ''
                });
                setUpdateId(id);
            } catch (err) {
                alert('An error occurred while fetching bundle data.');
            }
        };

        const urlParams = new URLSearchParams(location.search);
        const id = urlParams.get('id');
        if (id) {
            fetchAuspiciousOptions();
            fetchBundleData(id);
        } else {
            fetchAuspiciousOptions();
        }
    }, [location.search]);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        effective_from: Yup.date().required('Effective From is required'),
        effective_to: Yup.date().required('Effective To is required'),
        active: Yup.boolean().required('Active status is required'),
        price: Yup.number().required('Price is required').positive('Price must be a positive number'),
        horoscope_question_count: Yup.number().required('Horoscope Question Count is required').positive('Must be a positive number').integer('Must be an integer'),
        compatibility_question_count: Yup.number().required('Compatibility Question Count is required').positive('Must be a positive number').integer('Must be an integer'),
        auspicious_question_id: Yup.string().required('Auspicious Question is required')
    });

    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                let base64String = reader.result.split(',')[1];
                setFieldValue('image_blob', base64String);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (setFieldValue) => {
        setFieldValue('image_blob', '');
        setImagePreview('');
    };

    const handleSubmit = async (values) => {
        const payload = updateId
            ? { ...values, _id: updateId }
            : { ...values };

        try {
            const response = await fetch(GetURL('/backend/Bundle/' + (updateId ? 'Update' : 'Create')), {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': GetToken() 
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                navigate('/page/bundles?page=list');
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (err) {
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h3>{updateId ? `Updating Bundle: ${bundleName}` : 'Creating New Bundle'}</h3>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, setFieldValue }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <Field as={CFormInput} type="text" id="name" name="name" />
                            {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <Field as={CFormTextarea} id="description" name="description" />
                            {errors.description && touched.description && <div className="text-danger">{errors.description}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="effective_from">Effective From</label>
                            <Field as={CFormInput} type="date" id="effective_from" name="effective_from" />
                            {errors.effective_from && touched.effective_from && <div className="text-danger">{errors.effective_from}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="effective_to">Effective To</label>
                            <Field as={CFormInput} type="date" id="effective_to" name="effective_to" />
                            {errors.effective_to && touched.effective_to && <div className="text-danger">{errors.effective_to}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="active">Active</label>
                            <Field
                                as={CFormSwitch}
                                id="active"
                                name="active"
                                onChange={e => setFieldValue('active', e.target.checked)}
                                checked={initialValues.active}
                            />
                            {errors.active && touched.active && <div className="text-danger">{errors.active}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price">Price</label>
                            <Field as={CFormInput} type="number" id="price" name="price" />
                            {errors.price && touched.price && <div className="text-danger">{errors.price}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="horoscope_question_count">Horoscope Question Count</label>
                            <Field as={CFormInput} type="number" id="horoscope_question_count" name="horoscope_question_count" />
                            {errors.horoscope_question_count && touched.horoscope_question_count && <div className="text-danger">{errors.horoscope_question_count}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="compatibility_question_count">Compatibility Question Count</label>
                            <Field as={CFormInput} type="number" id="compatibility_question_count" name="compatibility_question_count" />
                            {errors.compatibility_question_count && touched.compatibility_question_count && <div className="text-danger">{errors.compatibility_question_count}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="auspicious_question_id">Auspicious Question</label>
                            <Field as={CFormSelect} name="auspicious_question_id" id="auspicious_question_id">
                                <option value="">Select Auspicious Question</option>
                                {auspiciousOptions.map(option => (
                                    <option key={option.question_category_id} value={option.question_category_id}>
                                        {option.question_category}
                                    </option>
                                ))}
                            </Field>
                            {errors.auspicious_question_id && touched.auspicious_question_id && <div className="text-danger">{errors.auspicious_question_id}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image_blob">Image</label>
                            <input
                                type="file"
                                id="image_blob"
                                name="image_blob"
                                accept="image/*"
                                onChange={e => handleImageChange(e, setFieldValue)}
                            />
                            {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px', display: 'block', marginTop: '10px' }} />}
                            <CButton
                                type="button"
                                color="danger"
                                onClick={() => handleRemoveImage(setFieldValue)}
                                style={{ display: imagePreview ? 'block' : 'none', marginTop: '10px' }}
                            >
                                Remove Image
                            </CButton>
                            {errors.image_blob && touched.image_blob && <div className="text-danger">{errors.image_blob}</div>}
                        </div>
                        <CButton type="submit" color="primary">
                            {updateId ? 'Update' : 'Create'}
                        </CButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Manage;
