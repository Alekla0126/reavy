import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, Image, TouchableOpacity, FlatList, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";

const ticketsList = [
    {
        id: '1',
        djEventImage: require('../../assets/images/djEvents/DJEvent2.png'),
        djEventName: 'Bass Hill EDM Show',
        djEventAddress: 'Tsar Osvoboditel" 20, 1000 Sofia Center, Sofia, Bulgaria',
        djEventDate: '22 Oct 2022',
        djEventTime: '8:00pm - 1:00am',
    },
    {
        id: '2',
        djEventImage: require('../../assets/images/djEvents/DJEvent1.png'),
        djEventName: 'Quiest Clubbing VIP Heated Rooftop Show',
        djEventAddress: 'NDK, 1 Bulgaria Square, 1000 Sofia, Bulgaria',
        djEventDate: '26 Oct 2022',
        djEventTime: '8:00pm - 1:00am',
    },
    {
        id: '3',
        djEventImage: require('../../assets/images/djEvents/DJEvent3.png'),
        djEventName: 'International Band Music concert',
        djEventAddress: 'Nessebar, 8240 Sunny Beach, Bulgaria',
        djEventDate: '30 Oct 2022',
        djEventTime: '8:00pm - 1:00am',
    },
];

class TicketsScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.tickets()}
                </View>
            </SafeAreaView>
        )
    }

    tickets() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('BookingSuccessful')}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding * 2.0, }}>

                <Image source={item.djEventImage}
                    style={{
                        width: '100%',
                        height: 120.0,
                        borderRadius: Sizes.fixPadding - 5.0,
                    }}
                />
                <View style={styles.ticketInfoWrapStyle}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                        {item.djEventName}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold }}>
                        {item.djEventAddress}
                    </Text>
                    <View style={styles.eventDateAndTimeInfoWrapStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ marginRight: Sizes.fixPadding * 2.6, }}>
                                <Text style={{ ...Fonts.grayColor14Regular }}>
                                    Time
                                </Text>
                                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                    {item.djEventTime}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ ...Fonts.grayColor14Regular }}>
                                    Date
                                </Text>
                                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                    {item.djEventDate}
                                </Text>
                            </View>
                        </View>
                        <Image
                            source={require('../../assets/images/icons/qrCode.png')}
                            style={{ width: 35.0, height: 35.0, resizeMode: 'contain' }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={ticketsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding * 6.5 }}
                showsVerticalScrollIndicator={false}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.whiteColor20Bold }}>
                    My Tickets
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
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    ticketInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding + 2.0,
        marginTop: Sizes.fixPadding - 65.0,
    },
    eventDateAndTimeInfoWrapStyle: {
        marginTop: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default withNavigation(TicketsScreen);