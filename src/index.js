import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'

localStorage.url = "http://145.223.23.200:3004";
localStorage.setItem("coreui-free-react-admin-template-theme", 'light');

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
