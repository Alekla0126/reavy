import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

class PaymentConfirmationScreen extends Component {

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
                    {this.header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.summaryInfo()}
                        {this.totalAmountInfo()}
                        {this.confirmButton()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    confirmButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('BookingSuccessful')}
                style={styles.confirmButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18ExtraBold }}>
                    Confirm
                </Text>
            </TouchableOpacity>
        )
    }

    totalAmountInfo() {
        return (
            <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.blackColor16Bold }}>
                Total Amount To Pay $520.00
            </Text>
        )
    }

    summaryInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor18Bold }}>
                    Summary
                </Text>
                <View style={styles.summaryWrapStyle}>
                    <Text style={styles.summaryIndicatorWrapStyle}>
                        *
                    </Text>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor16SemiBold }}>
                        Quiet Clubbing VIP Heated Rooftop Show
                    </Text>
                    <Text style={{ ...Fonts.grayColor12SemiBold }}>
                        Thornridge Cir. Shiloh
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 5.0, alignSelf: 'flex-start' }}>
                        <Text style={{ ...Fonts.grayColor14Regular }}>
                            Visitor Name
                        </Text>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            Samantha Smith + 3 other
                        </Text>
                    </View>
                    <View style={{ marginVertical: Sizes.fixPadding - 5.0, alignSelf: 'flex-start' }}>
                        <Text style={{ ...Fonts.grayColor14Regular }}>
                            Location
                        </Text>
                        <Text style={{ ...Fonts.blackColor14SemiBold }}>
                            Thornridge cir. sgiloh, hawaii
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch' }}>
                        <View style={{ flex: 1, }}>
                            <Text style={{ ...Fonts.grayColor14Regular }}>
                                Seat No
                            </Text>
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                                A1(1,2,3,4)
                            </Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ ...Fonts.grayColor14Regular }}>
                                Ticket Type
                            </Text>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                VIP
                            </Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ ...Fonts.grayColor14Regular }}>
                                Time
                            </Text>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                8:00pm
                            </Text>
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={{ ...Fonts.grayColor14Regular }}>
                                Date
                            </Text>
                            <Text numberOfLines={1} style={{ flex: 1, ...Fonts.blackColor14SemiBold }}>
                                22 Oct 2021
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
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
                    Confirmation
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
    summaryWrapStyle: {
        borderColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        borderWidth: 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding + 10.0,
        alignItems: 'center',
    },
    confirmButtonStyle: {
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: Colors.primaryColor,
        elevation: 5.0,
        borderColor: 'rgba(34, 105, 190, 0.7)',
        borderWidth: 1.0,
    },
    summaryIndicatorWrapStyle: {
        position: 'absolute',
        top: -12.0,
        paddingHorizontal: Sizes.fixPadding * 4.0,
        textAlign: 'center',
        backgroundColor: Colors.whiteColor,
        ...Fonts.primaryColor20ExtraBold
    }
});

PaymentConfirmationScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(PaymentConfirmationScreen);