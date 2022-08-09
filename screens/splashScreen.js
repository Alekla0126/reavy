import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors } from "../constants/styles";

class SplashScreen extends Component {

    render() {
        setTimeout(() => {
            this.props.navigation.navigate('Onboarding')
        }, 2000);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {this.logo()}
                </View>
            </SafeAreaView>
        )
    }

    logo() {
        return (
            <Image
                source={require('../assets/images/logo.png')}
                style={{ height: 125.0, width: '100%', resizeMode: 'contain' }}
            />
        )
    }
}

export default withNavigation(SplashScreen);