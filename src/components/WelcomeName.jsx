import Typography from "@mui/material/Typography";

import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';

export const WelcomeName = () => {

    const { instance } = useMsal();
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        const currentAccount = instance.getActiveAccount();

        console.log('Testing Welcome:', currentAccount);

        if(currentAccount) {
            setUsername(currentAccount.username);
        }
    
    }, [instance]);

    return <Typography variant="h6">Welcome, {username}</Typography>;
    
};