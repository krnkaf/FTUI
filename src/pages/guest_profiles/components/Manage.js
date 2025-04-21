import React, { useEffect, useState } from 'react';
import { CButton, CFormInput, CFormSelect, CFormTextarea } from '@coreui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { GetToken, GetURL } from '../../../library/API';
import { useNavigate, useLocation } from 'react-router-dom';

const Manage = () => {
    const [initialValues, setInitialValues] = useState({
        basic_description: '',
        lucky_number: '',
        lucky_gem: '',
        lucky_color: '',
        rashi_id: '',
        compatibility_description: ''
    });
    const [rashiOptions, setRashiOptions] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const seePlanetAPI = async (payload) => {
        try {
            const response = await fetch(GetURL(`/backend/GuestProfileUpdate/PlanetDetailAPIForGuest?guest_id=${updateId}`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken()
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const fetchRashiOptions = async () => {
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
                    setRashiOptions(data.data.rashi);
                }
            } catch (err) {
                alert('An error occurred while fetching Rashi options.');
            }
        };

        const fetchGuestProfile = async (id) => {
            try {
                const response = await fetch(GetURL(`/backend/GuestProfileUpdate/GetAllGuestProfile`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': GetToken()
                    }
                });
                const data = await response.json();
                const mail = data.data.list.filter(f => (
                    f._id == urlParams.get('id')
                ))[0].email;
                if (data.data && data.data.list) {
                    const profile = data.data.list.filter(f => (
                        f._id == urlParams.get('id')
                    ))[0];
                    setEmail(mail || '');
                    setInitialValues({
                        basic_description: profile.guest_profile?.basic_description || '',
                        lucky_number: profile.guest_profile?.lucky_number || '',
                        lucky_gem: profile.guest_profile?.lucky_gem || '',
                        lucky_color: profile.guest_profile?.lucky_color || '',
                        rashi_id: profile.guest_profile?.rashi_id || '',
                        compatibility_description: profile.guest_profile?.compatibility_description || ''
                    });
                    setUpdateId(id);
                }
            } catch (err) {
                alert('An error occurred while fetching guest profile.');
            }
        };

        const urlParams = new URLSearchParams(location.search);
        const id = urlParams.get('id');
        if (id) {
            fetchRashiOptions();
            fetchGuestProfile(id);
        }
    }, [location.search]);

    const validationSchema = Yup.object({
        basic_description: Yup.string().required('Basic Description is required'),
        lucky_number: Yup.string().required('Lucky Number is required'),
        lucky_gem: Yup.string().required('Lucky Gem is required'),
        lucky_color: Yup.string().required('Lucky Color is required'),
        rashi_id: Yup.string().required('Rashi is required'),
        compatibility_description: Yup.string().required('Compatibility Description is required')
    });

    const handleSubmit = async (values) => {
        const payload = {
            guest_id: updateId,
            basic_description: values.basic_description,
            lucky_number: values.lucky_number,
            lucky_gem: values.lucky_gem,
            lucky_color: values.lucky_color,
            rashi_id: values.rashi_id,
            compatibility_description: values.compatibility_description
        };

        seePlanetAPI(payload);

        try {
            const response = await fetch(GetURL('/backend/GuestProfileUpdate/UpdateGuestProfile'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken()
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                navigate('/page/guestprofiles?page=list');
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
            <h3 style={{ marginLeft: '10px', marginBottom: '20px' }}>Updating Profile for: {email}</h3>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="rashi_id">Rashi</label>
                            <Field as={CFormSelect} name="rashi_id" id="rashi_id">
                                <option value="">Select Rashi</option>
                                {rashiOptions.map(rashi => (
                                    <option key={rashi.id} value={rashi.id}>{rashi.name}</option>
                                ))}
                            </Field>
                            {errors.rashi_id && touched.rashi_id && <div className="text-danger">{errors.rashi_id}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="basic_description">Basic Description</label>
                            <Field as={CFormTextarea} type="text" id="basic_description" name="basic_description" />
                            {errors.basic_description && touched.basic_description && <div className="text-danger">{errors.basic_description}</div>}
                        </div>
                        <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <label htmlFor="lucky_number">Lucky Number</label>
                                <Field as={CFormInput} type="text" id="lucky_number" name="lucky_number" />
                                {errors.lucky_number && touched.lucky_number && <div className="text-danger">{errors.lucky_number}</div>}
                            </div>
                            <div style={{ flex: 1 }}>
                                <label htmlFor="lucky_gem">Lucky Gem</label>
                                <Field as={CFormInput} type="text" id="lucky_gem" name="lucky_gem" />
                                {errors.lucky_gem && touched.lucky_gem && <div className="text-danger">{errors.lucky_gem}</div>}
                            </div>
                            <div style={{ flex: 1 }}>
                                <label htmlFor="lucky_color">Lucky Color</label>
                                <Field as={CFormInput} type="text" id="lucky_color" name="lucky_color" />
                                {errors.lucky_color && touched.lucky_color && <div className="text-danger">{errors.lucky_color}</div>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="compatibility_description">Compatibility Description</label>
                            <Field as={CFormTextarea} id="compatibility_description" name="compatibility_description" />
                            {errors.compatibility_description && touched.compatibility_description && <div className="text-danger">{errors.compatibility_description}</div>}
                        </div>
                        <CButton type="submit" style={{ border: 'none', backgroundColor: '#ff9933', color: 'white' }}>
                            Update
                        </CButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Manage;
