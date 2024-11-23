import React, { useContext, useState } from 'react';
import { CButton, CFormTextarea, CToast, CToaster, CToastBody, CToastHeader } from '@coreui/react';
import { Field, Form, Formik } from 'formik';
import { GetToken, GetURL } from '../../library/API';
import { UserContext } from '../Inquiry';
import { useNavigate } from 'react-router-dom';

const Submit = ({ inquiry_id }) => {
    const { fromPage, id } = useContext(UserContext);
    const navigate = useNavigate();

    const [toasts, setToasts] = useState([]);

    const handleSubmit = async (values, { resetForm }) => {
        const payload = {
            comment: values.comment,
            inquiry_id: inquiry_id,
        };

        try {
            let response;
            let apiUrl;

            if (fromPage !== 'reviewer' && id !== 5) {
                apiUrl = "/backend/InquiryManagement/PushComment";
            } else {
                apiUrl = "/backend/InquiryManagement/PublishInquiry";
            }

            response = await fetch(GetURL(apiUrl), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken(),
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setToasts([...toasts, { type: 'success', message: 'Comment submitted successfully!' }]);
            } else {
                const errorData = await response.json();
                setToasts([...toasts, { type: 'error', message: errorData.message || 'Something went wrong!' }]);
            }
        } catch (err) {
            setToasts([...toasts, { type: 'error', message: 'An error occurred. Please try again later.' }]);
        }

        resetForm();
        location.reload();
    };

    return (
        <>
            {/* Toast Container (coreui's toast) */}
            <CToaster position="top-end">
                {toasts.map((toast, index) => (
                    <CToast key={index} color={toast.type} closeButton={true} autohide={3000}>
                        <CToastHeader closeButton>
                            {toast.type === 'success' ? 'Success' : 'Error'}
                        </CToastHeader>
                        <CToastBody>{toast.message}</CToastBody>
                    </CToast>
                ))}
            </CToaster>

            <Formik
                initialValues={{ comment: '' }}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form
                        style={{
                            maxWidth: '100vw',
                            margin: '0 auto',
                            padding: '15px',
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {/* Comment Textarea */}
                        <div className="mb-3" style={{ marginBottom: '15px' }}>
                            <label
                                htmlFor="comment"
                                style={{ fontWeight: '500', fontSize: '14px' }}
                            >
                                Comment:
                            </label>
                            <Field
                                as={CFormTextarea}
                                id="comment"
                                name="comment"
                                rows={2}
                                placeholder="Enter your comment"
                                style={{
                                    width: '100%',
                                    fontSize: '13px',
                                    marginTop: '5px',
                                    borderColor: '#ccc',
                                    borderRadius: '4px',
                                    padding: '10px',
                                }}
                            />
                        </div>

                        {/* Submit Button */}
                        <div style={{ textAlign: 'center' }}>
                            <CButton
                                type="submit"
                                color="primary"
                                style={{
                                    fontSize: '14px',
                                    padding: '8px 20px',
                                    width: '100%',
                                    backgroundColor: '#ff9933',
                                    borderColor: '#ff9933',
                                }}
                            >
                                {fromPage === 'reviewer' ? 'Publish' : 'Submit'}
                            </CButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Submit;
