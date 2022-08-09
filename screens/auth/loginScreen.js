import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

class LoginScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    state = {
        email: null,
        password: null,
        securePassword: true,
        rememberPassword: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
                    >
                        {this.loginTitle()}
                        {this.emailTextField()}
                        {this.passwordTextField()}
                        {this.rememberPassordAndForgetInfo()}
                        {this.loginButton()}
                        {this.orLoginWithText()}
                        {this.googleAndFacebookButton()}
                        {this.dontAccountInfo()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    dontAccountInfo() {
        return (
            <Text style={{ textAlign: 'center' }}>
                <Text style={{ ...Fonts.grayColor14SemiBold }}>
                    Don’t have an account?{` `}
                </Text>
                <Text
                    onPress={() => this.props.navigation.push('Register')}
                    style={{ ...Fonts.primaryColor14SemiBold }}
                >
                    Register Now
                </Text>
            </Text>
        )
    }

    googleAndFacebookButton() {
        return (
            <View style={styles.googleAndFacebookButtonWrapStyle}>
                <View style={{
                    ...styles.googleAndFacebookButtonStyle,
                    paddingHorizontal: Sizes.fixPadding * 2.4,
                }}>
                    <Image
                        source={require('../../assets/images/icons/google.png')}
                        style={{ width: 25.0, height: 25.0, }}
                        resizeMode="contain"
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.blackColor14SemiBold }}>
                        Google
                    </Text>
                </View>
                <View style={{
                    ...styles.googleAndFacebookButtonStyle,
                    paddingHorizontal: Sizes.fixPadding + 3.0,
                }}>
                    <Image
                        source={require('../../assets/images/icons/facebook.png')}
                        style={{ width: 25.0, height: 25.0, }}
                        resizeMode="contain"
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.blackColor14SemiBold }}>
                        Facebook
                    </Text>
                </View>
            </View>
        )
    }

    orLoginWithText() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.grayColor16SemiBold }}>
                Or login with
            </Text>
        )
    }

    loginButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('Register')}
                style={styles.loginButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18ExtraBold }}>
                    Login
                </Text>
            </TouchableOpacity>
        )
    }

    rememberPassordAndForgetInfo() {
        return (
            <View style={styles.rememberPassordAndForgetInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.setState({ rememberPassword: !this.state.rememberPassword })}
                        style={{
                            ...styles.checkBoxStyle,
                            backgroundColor: this.state.rememberPassword ? Colors.primaryColor : 'transparent'
                        }}
                    >
                        {
                            this.state.rememberPassword ?
                                <MaterialIcons
                                    name="done"
                                    color={Colors.whiteColor}
                                    size={12}
                                />
                                :
                                null
                        }
                    </TouchableOpacity>
                    <Text style={{ marginLeft: Sizes.fixPadding - 3.0, ...Fonts.primaryColor12SemiBold }}>
                        Remember Password
                    </Text>
                </View>
                <Text style={{ ...Fonts.redColor12SemiBold }}>
                    Forget password?
                </Text>
            </View>
        )
    }

    passwordTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, marginTop: Sizes.fixPadding + 10.0, }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="lock"
                        color={Colors.grayColor}
                        size={18}
                    />
                    <TextInput
                        secureTextEntry={this.state.securePassword}
                        placeholder="Password"
                        placeholderTextColor={Colors.grayColor}
                        style={{ flex: 1, ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding, }}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </View>
                <MaterialIcons
                    name={this.state.securePassword ? "visibility-off" : 'visibility'}
                    color={Colors.grayColor}
                    size={16}
                    onPress={() => this.setState({ securePassword: !this.state.securePassword })}
                />
            </View>
        )
    }

    emailTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <MaterialIcons
                    name="email"
                    color={Colors.grayColor}
                    size={18}
                />
                <TextInput
                    placeholder="Email Address"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding, }}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    selectionColor={Colors.primaryColor}
                />
            </View>
        )
    }

    loginTitle() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor20Bold }}>
                Login
            </Text>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{ height: 120.0, width: '100%', resizeMode: 'contain' }}
                />
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.whiteColor}
                    size={22}
                    style={{ position: 'absolute', top: 20.0, left: 20.0, }}
                    onPress={() => this.props.navigation.pop()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 200 - StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    textFieldWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: '#e0e0e0',
        borderWidth: 0.50,
        elevation: 2.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        height: 50.0,
    },
    checkBoxStyle: {
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 16.0,
        height: 16.0,
        borderRadius: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rememberPassordAndForgetInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    loginButtonStyle: {
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.5,
        marginBottom: Sizes.fixPadding + 5.0,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: Colors.primaryColor,
        elevation: 5.0,
        borderColor: 'rgba(34, 105, 190, 0.7)',
        borderWidth: 1.0,
    },
    googleAndFacebookButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: '#e0e0e0',
        borderWidth: 0.50,
        paddingVertical: Sizes.fixPadding,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding,
    },
    googleAndFacebookButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding,
    }
});

LoginScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(LoginScreen);