import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';
import Signin from './src/screens/auth/Signin';

import Home from './src/screens/app/Home'
import Favorites from './src/screens/app/Favorites'
import Profile from './src/screens/app/Profile'
import Settings from './src/screens/app/Settings'
import ProductDetails from './src/screens/app/ProductDetails'
import CreateListing from './src/screens/app/CreateListing'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors } from "./src/utils/colors";

import Config from "react-native-config";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const UserContext = React.createContext()

const ProfileStack = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}}/>
        <Stack.Screen name="CreateListing" component={CreateListing} options={{headerShown: false}}/>
    </Stack.Navigator>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;

                    if (route.name === 'Home') {
                        icon = focused
                            ? require('./src/assets/tabs/home_active.png')
                            : require('./src/assets/tabs/home.png')
                    }   else if (route.name === 'Favorites') {
                        icon = focused
                            ? require('./src/assets/tabs/bookmark_active.png')
                            : require('./src/assets/tabs/bookmark.png')
                    }   else if (route.name === 'ProfileStack') {
                        icon = focused
                            ? require('./src/assets/tabs/profile_active.png')
                            : require('./src/assets/tabs/profile.png')
                    }

                    return <Image style={{width: 24, height: 24}} source={icon} />;
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {borderTopColor: colors.lightGrey, elevation: 0}

            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} />
        </Tab.Navigator>
    );
}

const App = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        (async () => {
            const accessToken = await AsyncStorage.getItem('auth_token')
            setUser({ accessToken })
        })()
    }, [])

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '250645516622-77kdh2aq3usmuvto9kglmqrppi2t960c.apps.googleusercontent.com',
            offlineAccess: true
        });
    }, [])

    const theme = {
        colors: {
            background:colors.white
        },
    };


    return (
        <SafeAreaProvider>
            <UserContext.Provider value={{user, setUser}}>
                <NavigationContainer theme={theme}>
                    <Stack.Navigator>
                        {
                            user?.accessToken ? (
                                <>
                                    <Stack.Screen name="Tabs" component={Tabs}  options={{headerShown: false}}/>
                                    <Stack.Screen name="ProductDetails" component={ProductDetails}  options={{headerShown: false}}/>
                                </>
                            )   :   (
                                <>
                                    <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
                                    <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
                                    <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}} />
                                </>
                            )
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </UserContext.Provider>
        </SafeAreaProvider>
    );
};

export default App;