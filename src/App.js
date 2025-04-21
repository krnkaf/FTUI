import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

import { ToastProvider } from './ToastComponent';
import { GetURL, GetToken } from './library/API';

const AppWrapper = () => {
	const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
	const storedTheme = useSelector((state) => state.theme);
	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
		const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
		if (theme) {
			setColorMode(theme);
		}

		if (isColorModeSet()) {
			return;
		}

		setColorMode(storedTheme);
	}, []);

	useEffect(() => {
		if (localStorage.getItem('token') == null) {
			navigate('/login');
		}
	}, [navigate]);

	useEffect(() => {
		const handleOffline = () => navigate('/404');
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('offline', handleOffline);
		};
	}, [navigate]);

	return (
		<Suspense
			fallback={
				<div className="pt-3 text-center">
					<CSpinner color="primary" variant="grow" />
				</div>
			}
		>
			<Routes>
				<Route exact path="/login" name="Login Page" element={<Login />} />
				<Route exact path="/register" name="Register Page" element={<Register />} />
				<Route exact path="/404" name="Page 404" element={<Page404 />} />
				<Route exact path="/500" name="Page 500" element={<Page500 />} />
				<Route path="*" name="Home" element={<DefaultLayout />} />
			</Routes>
		</Suspense>
	);
};

const App = () => {
	const [inSession, setInSession] = useState(null);
	const sessionCheck = async () => {
		const response = await fetch(GetURL('/UserContoller'), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': GetToken(),
			},
		});

		const data = await response.json();
		setInSession(data.error_code);
	};

	useEffect(() => {
		sessionCheck();
	}, []);

	if (inSession === null) {
		return (
			<div className="pt-3 text-center">
				<CSpinner color="primary" variant="grow" />
			</div>
		);
	}

	if (inSession !== '0') {
		localStorage.removeItem('id');
		localStorage.removeItem('user_type_id');
		localStorage.removeItem('token');
	}

	return (
		<BrowserRouter>
			<ToastProvider>
				{inSession === '0' ? (
					<AppWrapper />
				) : (
					<Routes>
						<Route path="*" element={<Login />} />
					</Routes>
				)}
			</ToastProvider>
		</BrowserRouter>
	);
};

export default App;