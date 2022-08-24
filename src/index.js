import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from './App';

import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
    auth : {
        clientId: '2ca99614-c399-414a-bfdc-f31a0134516e',
        authority: 'https://login.microsoftonline.com/common/',
        redirectUri: 'http://localhost:3000'
    },
    cache : {
        cacheLocation : 'localStorage',
        storeAuthStateInCookie: false,
    },
    system : {
        loggerOptions: {
            loggerCallback : (level, message, containsPII) => {
                console.log(message);
            },
            logLevel: "Verbose"
        }
    }
});


//KS: Need to deregister when unmounted
pca.addEventCallback(event => {
    if(event.eventType === EventType.LOGIN_SUCCESS) {
        console.log(event);
        pca.setActiveAccount(event.payload.account);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App msalInstance={pca}/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
