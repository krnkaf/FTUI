
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { GetURL } from '../../../library/API';

import { useToast } from '../../../ToastComponent';

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const { showToast } = useToast();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    clearErrors();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    clearErrors();
  };

  const clearErrors = () => {
    setValidationError('');
    setApiError('');
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateInputs = () => {
    if (!validateEmail(email)) {
      setValidationError('Please provide a valid email.');
      return false;
    }
    if (password.length < 5) {
      setValidationError('Password must be at least 5 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (!validateInputs()) return;

    try {
      const response = await fetch(GetURL('/UserContoller/Login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error_code === '0') {
        saveToLocalStorage('token', data.data.token);
        saveToLocalStorage('user_type_id', data.data.user_type_id);
        navigate('/dashboard');
        location.reload();
      } else {
        showToast('Failure', data.message || 'Invalid credentials.', 2);
        setApiError(data.message || 'Invalid credentials.');
        setPassword(''); 
      }
    } catch (err) {
      showToast('Failure', 'An unexpected error occurred. Please try again.', 2);
      setApiError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        isInvalid={!!validationError && !validateEmail(email)}
                      />
                      <CFormFeedback invalid>{validationError}</CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        isInvalid={!!validationError && password.length < 5}
                      />
                      <CFormFeedback invalid>{validationError}</CFormFeedback>
                    </CInputGroup>
                    {apiError && <p className="text-danger">{apiError}</p>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
