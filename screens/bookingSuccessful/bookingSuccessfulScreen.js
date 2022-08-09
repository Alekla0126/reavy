import React, { Component } from "react";
import { BackHandler, SafeAreaView, Image, View, ScrollView, StatusBar, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { TransitionPresets } from "react-navigation-stack";
import Dash from 'react-native-dash';

class BookingSuccessfulScreen extends Component {

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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.header()}
                        {this.bookingInfo()}
                        {this.getDirectionButton()}
                        {this.backToHomeText()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    backToHomeText() {
        return (
            <Text
                onPress={() => this.props.navigation.push('BottomTabBar')}
                style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.primaryColor18Bold }}
            >
                Back to Home
            </Text>
        )
    }

    getDirectionButton() {
        return (
            <View style={styles.getDirectionButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18ExtraBold }}>
                    Get Direction
                </Text>
            </View>
        )
    }

    bookingInfo() {
        return (
            <View style={styles.bookingInfoWrapStyle}>
                {this.bookingInfoSort({ title: 'Full Name:', value: 'Samantha Smith' })}
                {this.bookingInfoSort({ title: 'Payment Via:', value: 'PayPal' })}
                {this.bookingInfoSort({ title: 'Event:', value: 'Quiet Clubbing VIP Heated Rooftop Show' })}
                {this.bookingInfoSort({ title: 'Location:', value: 'Thornridge Cir. Shiloh, Hawaii 81063' })}
                {this.bookingInfoSort({ title: 'Date & Time:', value: '22 Oct 2021 • 8:00pm' })}
                {this.bookingInfoSort({ title: 'Seat No:', value: 'A1(1,2,3,4)' })}
                {this.bookingInfoSort({ title: 'Ticket Type:', value: 'VIP' })}
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        QR Code
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        Scan with the Receptionist
                    </Text>
                    <Image
                        source={require('../../assets/images/icons/qrCode.png')}
                        style={{ marginTop: Sizes.fixPadding + 3.0, width: 100.0, height: 100.0, resizeMode: 'contain' }}
                    />
                </View>
            </View>
        )
    }

    bookingInfoSort({ title, value }) {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        {title}
                    </Text>
                    <Text numberOfLines={1} style={{ textAlign: 'right', flex: 1, ...Fonts.blackColor14SemiBold }}>
                        {value}
                    </Text>
                </View>
                <Dash
                    style={{ flex: 1, height: 1, marginVertical: Sizes.fixPadding + 5.0 }}
                    dashColor={Colors.lightGrayColor}
                />
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Image
                    source={require('../../assets/images/icons/successful.png')}
                    style={{ width: 100.0, height: 100.0, resizeMode: 'contain' }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 200.0 - StatusBar.currentHeight,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    bookingInfoWrapStyle: {
        top: - 30.0,
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 8.0,
    },
    getDirectionButtonStyle: {
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 5.0,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: Colors.primaryColor,
        elevation: 5.0,
        borderColor: 'rgba(34, 105, 190, 0.7)',
        borderWidth: 1.0,
    }
});

BookingSuccessfulScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(BookingSuccessfulScreen);