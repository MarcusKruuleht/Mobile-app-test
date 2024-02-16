import React, { useEffect } from 'react';
import {SafeAreaView} from 'react-native';
import Signup from './src/screens/auth/Signup';
//import AuthHeader from './src/components/AuthHeader';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Config from "react-native-config";

const App = () => {
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '250645516622-77kdh2aq3usmuvto9kglmqrppi2t960c.apps.googleusercontent.com',
            offlineAccess: true
        });
    }, [])
    return (
        <SafeAreaView>
        <Signup />
        </SafeAreaView>
    );
};

export default App;