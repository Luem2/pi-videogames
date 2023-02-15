import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css'

axios.defaults.baseURL =
    import.meta.env.REACT_APP_API || 'http://localhost:3000'

createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
