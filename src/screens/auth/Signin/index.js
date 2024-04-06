import React, { useContext, useState } from "react";
import { View, Text, Alert } from "react-native"
import AuthHeader from "../../../components/AuthHeader";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { styles } from "./styles";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from "../../../../App"

const Signin = ({navigation}) => {
    const [values, setValues] = useState({})
    const {user, setUser} = useContext(UserContext)

    const onBack = () => {
        navigation.goBack()
    }

    const onSignup = () => {
        navigation.navigate('Signup')
    }

    const onChange = (key, value) => {
     setValues(v => ({...v, [key]: value}))
    }

    const onSignin = () => {
        console.log('login values => ', values)
        if(!values?.email || !values?.password){
            Alert.alert('All fields are required!')
            return
        }
        axios.post('http://192.168.18.4/api/user/login', values)
        .then(async (response) => {
            console.log(response?.data?.accessToken)
            const accessToken = response?.data?.accessToken
            setUser({ accessToken })

            if (response?.data?.token) {
                await AsyncStorage.setItem('auth_token', `${response?.dat?.token}`)
            }
        })
        .catch(error => {
            console.log('login error => ', error.response.data)
        })
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <AuthHeader onBackPress={onBack} title="Sign In"/>
                <Input value={values.email} onChangeText={(v) => onChange('email', v)} label="Email" placeholder="example@gmail.com"/>
                <Input value={values.password} onChangeText={(v) => onChange('password' , v)} isPassword label="Password" placeholder="******"/>
                <Button style={styles.button} title="Sign In" />
                <Separator text="Or sign up with" />
                <GoogleLogin />
                <Text style={styles.footerText}>Don’t have an account?
                    <Text onPress={onSignup} style={styles.footerLink}> Sign Up</Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}
export default React.memo(Signin)