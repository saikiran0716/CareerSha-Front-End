import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const rootElement = document.getElementById('root');
if (! rootElement) {
    throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
const googleClientId = (import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim();

root.render (
    <React.StrictMode>
        <HelmetProvider>
            {googleClientId ? (
                <GoogleOAuthProvider clientId={googleClientId}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </GoogleOAuthProvider>
            ) : (
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            )}
        </HelmetProvider>
    </React.StrictMode>
);
