import React, { useState } from "react";
import { View, Text } from "react-native";
import AuthHeader from "../../../components/AuthHeader";
import Input from "../../../components/Input";
import Checkbox from "../../../components/Checkbox";
import Button from "../../../components/Button";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import { styles } from "./styles";
import { SafeAreaView } from 'react-native-safe-area-context'

const Signup = ({navigation}) => {
    const [checked, setChecked] = useState(false)

    const onBack = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <AuthHeader onBackPress={onBack} title="Sign Up"/>
                <Input label="Name" placeholder="John Doe"/>
                <Input label="Email" placeholder="example@gmail.com"/>
                <Input isPassword label="Password" placeholder="********"/>
                <View style={styles.agreeRow}>
                    <Checkbox checked={checked} onCheck={setChecked}/>
                    <Text style={styles.agreeText}>I agree with <Text style={styles.agreeTextBold}>Terms</Text> & <Text style={styles.agreeTextBold}>Privacy</Text></Text>
                </View>
                <Button style={styles.button} title="Sign In" />
                <Separator text="Or sign up with" />
                <GoogleLogin />
                <Text style={styles.footerText}>Already have an account?
                    <Text style={styles.footerLink}> Sign In</Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}
export default React.memo(Signup)