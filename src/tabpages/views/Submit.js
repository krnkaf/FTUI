import React, { useContext, useEffect } from 'react';
import { CButton, CFormTextarea } from '@coreui/react';
import { Formik, Field, Form } from 'formik';
import { GetURL, GetToken } from '../../library/API';
import { UserContext } from '../Inquiry';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Submit = ({ inquiry_id }) => {
    const fromPage = useContext(UserContext).fromPage;
    const navigate = useNavigate();
    const id = useContext(UserContext).id;

    useEffect(() => {
        window.addEventListener('keydown', () => {});
        return () => window.removeEventListener('keydown', () => {});
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        const payload = {
            comment: values.comment,
            inquiry_id: inquiry_id,
        };

        try {
            let response;
            let apiUrl;

            if (fromPage != 'reviewer' && id != 5) {
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
                toast.success('Comment submitted successfully!'); // Show success toast
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Something went wrong!'); // Show error toast
            }
        } catch (err) {
            toast.error('An error occurred. Please try again later.'); // Show error toast
        }

        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);

        resetForm();
    };

    return (
        <>
            {/* Toast Container (You only need this once in your app, typically in App.js) */}
            <ToastContainer />

            <Formik
                initialValues={{ comment: '' }}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <Form
                        style={{
                            maxWidth: '500px',
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
                                {fromPage == 'reviewer' ? 'Publish' : 'Submit'}
                            </CButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Submit;
