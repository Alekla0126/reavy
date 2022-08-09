import React from "react";
import { View } from "react-native";
import * as Font from "expo-font";

export default class LoadingScreen extends React.Component {
    async componentDidMount() {
        await Font.loadAsync({
            NunitoSans_Light: require("../assets/fonts/NunitoSans-Light.ttf"),
            NunitoSans_Regular: require("../assets/fonts/NunitoSans-Regular.ttf"),
            NunitoSans_SemiBold: require("../assets/fonts/NunitoSans-SemiBold.ttf"),
            NunitoSans_Bold: require("../assets/fonts/NunitoSans-Bold.ttf"),
            NunitoSans_ExtraBold: require("../assets/fonts/NunitoSans-Black.ttf"),
        });
        this.props.navigation.navigate('Splash');
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            </View>
        )
    }
}

