import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, ScrollView, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

class SelectPaymentMethodScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop()
        return true;
    };

    state = {
        selectedPaymentMethodIndex: 1,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.paymentMethods()}
                        {this.continueButton()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('PaymentConfirmation')}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18ExtraBold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    paymentMethods() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding, }}>
                {this.paymentMethodsOptionsSort({
                    option: 'Paypal',
                    optionImage: require('../../assets/images/paymentMethods/paypal.png'),
                    index: 1,
                })}
                {this.paymentMethodsOptionsSort({
                    option: 'Google Pay',
                    optionImage: require('../../assets/images/paymentMethods/googlePay.png'),
                    index: 2,
                })}
                {this.paymentMethodsOptionsSort({
                    option: 'Credit Card',
                    optionImage: require('../../assets/images/paymentMethods/creditCard.png'),
                    index: 3,
                })}
                {this.paymentMethodsOptionsSort({
                    option: 'Stripe',
                    optionImage: require('../../assets/images/paymentMethods/stripe.png'),
                    index: 4,
                })}
                {this.paymentMethodsOptionsSort({
                    option: 'Pay on Spot',
                    optionImage: require('../../assets/images/paymentMethods/payOnSpot.png'),
                    index: 5,
                })}
            </View>
        )
    }

    paymentMethodsOptionsSort({ option, optionImage, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ selectedPaymentMethodIndex: index })}
                style={styles.paymentMethodWrapStyle}
            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={optionImage}
                        style={{ width: 25.0, height: 25.0, resizeMode: 'contain' }}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding + 2.0, ...Fonts.blackColor16SemiBold }}>
                        {option}
                    </Text>
                </View>
                <View style={styles.radioButtonWrapStyle}>
                    {
                        this.state.selectedPaymentMethodIndex == index
                            ?
                            <View style={{ width: 7.0, height: 7.0, borderRadius: 3.5, backgroundColor: Colors.primaryColor }} />
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.whiteColor}
                    size={22}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.whiteColor20Bold }}>
                    Select Payment Method
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    paymentMethodWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    radioButtonWrapStyle: {
        width: 15.0,
        height: 15.0,
        borderRadius: 7.5,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: Colors.primaryColor,
        elevation: 5.0,
        borderColor: 'rgba(34, 105, 190, 0.7)',
        borderWidth: 1.0,
    }
});

SelectPaymentMethodScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(SelectPaymentMethodScreen);