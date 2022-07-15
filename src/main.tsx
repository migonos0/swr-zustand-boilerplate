/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import './index.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import {Form} from './components/Form';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Form></Form>
    </React.StrictMode>
);
