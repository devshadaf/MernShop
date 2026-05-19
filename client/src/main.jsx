import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import "./assets/css/main.css"
import "./assets/css/animate.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-loading-skeleton/dist/skeleton.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
