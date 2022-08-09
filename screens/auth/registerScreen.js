import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

class RegisterScreen extends Component {

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
        fullName: null,
        email: null,
        mobileNo: null,
        password: null,
        securePassword: true,
        confirmPassword: null,
        secureConfirmPassword: true,
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
                        {this.registerTitle()}
                        {this.fullNameTextField()}
                        {this.emailTextField()}
                        {this.mobileNoTextField()}
                        {this.passwordTextField()}
                        {this.confirmPasswordTextField()}
                        {this.registerButton()}
                        {this.orLoginWithText()}
                        {this.googleAndFacebookButton()}
                        {this.alreadyAccountInfo()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    alreadyAccountInfo() {
        return (
            <Text style={{ textAlign: 'center' }}>
                <Text style={{ ...Fonts.grayColor14SemiBold }}>
                    Already have an account?{` `}
                </Text>
                <Text
                    onPress={() => this.props.navigation.push('Login')}
                    style={{ ...Fonts.primaryColor14SemiBold }}
                >
                    Login Now
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

    registerButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('Verification')}
                style={styles.registerButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18ExtraBold }}>
                    Register
                </Text>
            </TouchableOpacity>
        )
    }

    confirmPasswordTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="lock"
                        color={Colors.grayColor}
                        size={18}
                    />
                    <TextInput
                        secureTextEntry={this.state.secureConfirmPassword}
                        placeholder="Confirm Password"
                        placeholderTextColor={Colors.grayColor}
                        style={{ flex: 1, ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding, }}
                        value={this.state.confirmPassword}
                        onChangeText={(text) => this.setState({ confirmPassword: text })}
                    />
                </View>
                <MaterialIcons
                    name={this.state.secureConfirmPassword ? "visibility-off" : 'visibility'}
                    color={Colors.grayColor}
                    size={16}
                    onPress={() => this.setState({ secureConfirmPassword: !this.state.secureConfirmPassword })}
                />
            </View>
        )
    }

    passwordTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle, }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="lock"
                        color={Colors.grayColor}
                        size={18}
                    />
                    <TextInput
                        secureTextEntry={this.state.securePassword}
                        placeholder="Create Password"
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

    mobileNoTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <MaterialIcons
                    name="phone-android"
                    color={Colors.grayColor}
                    size={16}
                />
                <TextInput
                    placeholder="Mobile Number"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding, }}
                    value={this.state.mobileNo}
                    onChangeText={(text) => this.setState({ mobileNo: text })}
                    selectionColor={Colors.primaryColor}
                    keyboardType='numeric'
                />
            </View>
        )
    }

    fullNameTextField() {
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <MaterialIcons
                    name="person"
                    color={Colors.grayColor}
                    size={18}
                />
                <TextInput
                    placeholder="Full Name"
                    placeholderTextColor={Colors.grayColor}
                    style={{ flex: 1, ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding, }}
                    value={this.state.fullName}
                    onChangeText={(text) => this.setState({ fullName: text })}
                    selectionColor={Colors.primaryColor}
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

    registerTitle() {
        return (
            <Text style={{ textAlign: 'center', margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor20Bold }}>
                Register
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
        marginBottom: Sizes.fixPadding,
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
    registerButtonStyle: {
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding + 5.0,
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

RegisterScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(RegisterScreen);