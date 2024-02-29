import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./styles";

const Favourites = () => {
    return(
        <SafeAreaView>
            <View style={styles.container}>
                <Text>Favourites</Text>
            </View>
        </SafeAreaView>
    )
}
export default React.memo(Favourites)