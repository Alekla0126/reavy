import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, Dimensions, StatusBar, ScrollView, TouchableOpacity, TextInput, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { CircleFade } from 'react-native-animated-spinkit';
import { TransitionPresets } from "react-navigation-stack";
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('window');

class VerificationScreen extends Component {

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
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
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
                        {this.verifyText()}
                        {this.informationText()}
                        {this.otpInfo()}
                        {this.continueButton()}
                    </ScrollView>
                    {this.loadingDialog()}
                </View>
            </SafeAreaView>
        )
    }

    loadingDialog() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <CircleFade size={56} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor16SemiBold,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please wait...
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.setState({ isLoading: true })
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                        this.props.navigation.push('BottomTabBar');
                    }, 2000);
                }}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18ExtraBold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    otpInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
                <Text style={{ textAlign: 'center', ...Fonts.blackColor16SemiBold }}>
                    Enter Verification Code
                </Text>
                <View style={styles.otpFieldsWrapStyle}>
                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            value={this.state.firstDigit}
                            style={{ ...Fonts.blackColor16SemiBold, }}
                            onChangeText={(text) => {
                                this.setState({ firstDigit: text })
                                this.secondTextInput.focus();
                            }}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            value={this.state.secondDigit}
                            style={{ ...Fonts.blackColor16SemiBold, }}
                            ref={(input) => { this.secondTextInput = input; }}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                this.setState({ secondDigit: text })
                                this.thirdTextInput.focus();
                            }}
                        />
                    </View>

                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor16SemiBold, }}
                            keyboardType="numeric"
                            value={this.state.thirdDigit}
                            ref={(input) => { this.thirdTextInput = input; }}
                            onChangeText={(text) => {
                                this.setState({ thirdDigit: text })
                                this.forthTextInput.focus();
                            }}

                        />
                    </View>

                    <View style={styles.textFieldWrapStyle}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor16SemiBold, }}
                            keyboardType="numeric"
                            value={this.state.forthDigit}
                            ref={(input) => { this.forthTextInput = input; }}
                            onChangeText={(text) => {
                                this.setState({ forthDigit: text })
                                this.setState({ isLoading: true })
                                setTimeout(() => {
                                    this.setState({ isLoading: false })
                                    this.props.navigation.push('BottomTabBar');
                                }, 2000);
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    informationText() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.grayColor16Regular }}>
                Enter 4 digit verification code we just sent you on +91 1236547890
            </Text>
        )
    }

    verifyText() {
        return (
            <Text style={styles.verifyTextStyle}>
                Verification
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
    verifyTextStyle: {
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.blackColor20Bold
    },
    otpFieldsWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding - 5.0,
    },
    textFieldWrapStyle: {
        height: 35.0,
        width: 35.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.primaryColor,
        borderWidth: 1.5,
        marginHorizontal: Sizes.fixPadding - 2.0,
        paddingLeft: Sizes.fixPadding - 2.0,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        margin: Sizes.fixPadding * 2.0,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: Colors.primaryColor,
        elevation: 5.0,
        borderColor: 'rgba(34, 105, 190, 0.7)',
        borderWidth: 1.0,
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding - 5.0,
        width: width - 80,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding * 2.0,
    },
});

VerificationScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(VerificationScreen);