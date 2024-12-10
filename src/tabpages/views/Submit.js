import React, { useContext } from 'react';
import { CButton, CFormTextarea } from '@coreui/react';
import { Field, Form, Formik } from 'formik';
import { GetToken, GetURL } from '../../library/API';
import { UserContext } from '../Inquiry';
import { DetailedContext } from './TableView';
import { useToast } from '../../ToastComponent';

const Submit = ({ inquiry_id }) => {
    const { setShowDetailedView } = useContext(DetailedContext);
    const { fetchInquiries, state, status } = useContext(UserContext);

    const { showToast } = useToast();

    const handleSubmit = async (values, { resetForm }) => {
        const payload = {
            comment: values.comment,
            inquiry_id: inquiry_id,
        };

        try {
            const response = await fetch(GetURL("/backend/InquiryManagement/PushComment"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': GetToken(),
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.error_code == 0) {
                    resetForm();
                    fetchInquiries(state, status);
                    setShowDetailedView(false);
                    showToast('Success', 'Comment Posted Successfully!', 1);
                } else if (data.error_code == 1) {
                    showToast('Failed', 'You Are Not Allowed To Post Comment Here.', 2)
                } else {
                    showToast('Failed', 'An Unknown Error Has Occurred. Try Again Later', 2)
                }
            } else {
                const errorData = await response.json();
                showToast('Error', errorData.message || 'Something Went Wrong!', 2);
            }
        } catch (err) {
            showToast('Error', 'An Error Occurred. Please Try Again Later.' + err, 2);
        }
    };

    return (
        <>
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
                                {/* {fromPage === 'reviewer' ? 'Publish' : 'Submit'} */}
                                Submit
                            </CButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default Submit;
