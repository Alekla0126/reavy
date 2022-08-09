import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";
import { Snackbar } from "react-native-paper";

const nearByDJEventsList = [
    {
        id: '1',
        djEventImage: require('../../assets/images/djEvents/DJEvent1.png'),
        djEventName: 'Quiet Clubbing VIP Heated Rooftop Show',
        djEventAddress: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
        distance: 5,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
        eventAmount: 130.00,
        interestedPeopleList: [
            require('../../assets/images/users/user2.png'),
            require('../../assets/images/users/user3.png'),
            require('../../assets/images/users/user4.png'),
            require('../../assets/images/users/user5.png'),
            require('../../assets/images/users/user6.png'),
            require('../../assets/images/users/user7.png'),
        ],
        isFavorite: false,
    },
    {
        id: '2',
        djEventImage: require('../../assets/images/djEvents/DJEvent2.png'),
        djEventName: 'Bass Hill EDM Show',
        djEventAddress: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        distance: 2,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
        eventAmount: 110.00,
        interestedPeopleList: [
            require('../../assets/images/users/user2.png'),
            require('../../assets/images/users/user3.png'),
            require('../../assets/images/users/user4.png'),
            require('../../assets/images/users/user5.png'),
            require('../../assets/images/users/user6.png'),
            require('../../assets/images/users/user7.png'),
        ],
        isFavorite: false,
    },
    {
        id: '3',
        djEventImage: require('../../assets/images/djEvents/DJEvent3.png'),
        djEventName: 'International Band Music Concert',
        djEventAddress: '2464 Royal Ln. Mesa, New Jersey 45463',
        distance: 3,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
        eventAmount: 110.00,
        interestedPeopleList: [
            require('../../assets/images/users/user2.png'),
            require('../../assets/images/users/user3.png'),
            require('../../assets/images/users/user4.png'),
            require('../../assets/images/users/user5.png'),
            require('../../assets/images/users/user6.png'),
            require('../../assets/images/users/user7.png'),
        ],
        isFavorite: false,
    },
    {
        id: '4',
        djEventImage: require('../../assets/images/djEvents/DJEvent1.png'),
        djEventName: 'Quiet Clubbing VIP Heated Rooftop Show',
        djEventAddress: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
        distance: 5,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
        eventAmount: 130.00,
        interestedPeopleList: [
            require('../../assets/images/users/user2.png'),
            require('../../assets/images/users/user3.png'),
            require('../../assets/images/users/user4.png'),
            require('../../assets/images/users/user5.png'),
            require('../../assets/images/users/user6.png'),
            require('../../assets/images/users/user7.png'),
        ],
        isFavorite: false,
    },
    {
        id: '5',
        djEventImage: require('../../assets/images/djEvents/DJEvent2.png'),
        djEventName: 'Bass Hill EDM Show',
        djEventAddress: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        distance: 2,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
        eventAmount: 110.00,
        interestedPeopleList: [
            require('../../assets/images/users/user2.png'),
            require('../../assets/images/users/user3.png'),
            require('../../assets/images/users/user4.png'),
            require('../../assets/images/users/user5.png'),
            require('../../assets/images/users/user6.png'),
            require('../../assets/images/users/user7.png'),
        ],
        isFavorite: false,
    },
    {
        id: '6',
        djEventImage: require('../../assets/images/djEvents/DJEvent3.png'),
        djEventName: 'International Band Music Concert',
        djEventAddress: '2464 Royal Ln. Mesa, New Jersey 45463',
        distance: 3,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
        eventAmount: 110.00,
        interestedPeopleList: [
            require('../../assets/images/users/user2.png'),
            require('../../assets/images/users/user3.png'),
            require('../../assets/images/users/user4.png'),
            require('../../assets/images/users/user5.png'),
            require('../../assets/images/users/user6.png'),
            require('../../assets/images/users/user7.png'),
        ],
        isFavorite: false,
    },
    {
        id: '7',
        djEventImage: require('../../assets/images/djEvents/DJEvent1.png'),
        djEventName: 'Quiet Clubbing VIP Heated Rooftop Show',
        djEventAddress: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
        distance: 5,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
        eventAmount: 130.00,
        interestedPeopleList: [
            require('../../assets/images/users/user2.png'),
            require('../../assets/images/users/user3.png'),
            require('../../assets/images/users/user4.png'),
            require('../../assets/images/users/user5.png'),
            require('../../assets/images/users/user6.png'),
            require('../../assets/images/users/user7.png'),
        ],
        isFavorite: false,
    },
    {
        id: '8',
        djEventImage: require('../../assets/images/djEvents/DJEvent2.png'),
        djEventName: 'Bass Hill EDM Show',
        djEventAddress: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
        distance: 2,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
        eventAmount: 110.00,
        interestedPeopleList: [
            require('../../assets/images/users/user2.png'),
            require('../../assets/images/users/user3.png'),
            require('../../assets/images/users/user4.png'),
            require('../../assets/images/users/user5.png'),
            require('../../assets/images/users/user6.png'),
            require('../../assets/images/users/user7.png'),
        ],
        isFavorite: false,
    },
    {
        id: '9',
        djEventImage: require('../../assets/images/djEvents/DJEvent3.png'),
        djEventName: 'International Band Music Concert',
        djEventAddress: '2464 Royal Ln. Mesa, New Jersey 45463',
        distance: 3,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
        eventAmount: 110.00,
        interestedPeopleList: [
            require('../../assets/images/users/user2.png'),
            require('../../assets/images/users/user3.png'),
            require('../../assets/images/users/user4.png'),
            require('../../assets/images/users/user5.png'),
            require('../../assets/images/users/user6.png'),
            require('../../assets/images/users/user7.png'),
        ],
        isFavorite: false,
    },
]

class NearByDJEventsList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        nearByDJEvents: nearByDJEventsList,
        showSnackBar: false,
        snackBarMsg: null,
    }

    render() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.props.navigation.push('EventDetail', { item: item })}
                style={{
                    borderRadius: Sizes.fixPadding - 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginBottom: Sizes.fixPadding,
                }}
            >
                <ImageBackground
                    source={item.djEventImage}
                    style={{
                        height: 120.0,
                        width: '100%',
                        justifyContent: 'space-between'
                    }}
                    borderTopLeftRadius={Sizes.fixPadding - 5.0}
                    borderTopRightRadius={Sizes.fixPadding - 5.0}
                >
                    <MaterialIcons
                        name={item.isFavorite ? "favorite" : "favorite-border"}
                        color={Colors.whiteColor}
                        size={22}
                        style={{ margin: Sizes.fixPadding, alignSelf: 'flex-end' }}
                        onPress={() => {
                            this.updateNearByDJEvents({ id: item.id })
                            this.setState({ showSnackBar: true })
                        }}
                    />
                    <Text style={{ margin: Sizes.fixPadding, ...Fonts.whiteColor16Bold }}>
                        {item.djEventName}
                    </Text>
                </ImageBackground>
                <View style={styles.djEventInfoWrapStyle}>
                    <View style={{ marginLeft: Sizes.fixPadding - 14.0, flexDirection: 'row', alignItems: 'center', }}>
                        <Image
                            source={require('../../assets/images/icons/marker.png')}
                            style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                        />
                        <View style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, }}>
                            <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold }}>
                                {item.djEventAddress}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14SemiBold }}>
                                {item.distance} km away
                            </Text>
                        </View>
                    </View>
                    <View style={styles.djEventTimeAndAmountInfoWrapStyle}>
                        <Text style={{ flex: 1, ...Fonts.blackColor16SemiBold }}>
                            {item.djEventDate} | {item.djEventTime}
                        </Text>
                        <Text style={{ ...Fonts.primaryColor16Bold }}>
                            {`$`}{item.eventAmount.toFixed(2)}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {
                                item.interestedPeopleList.slice(0, 6).map((item, index) => (
                                    <View
                                        key={`${index}`}
                                        style={styles.interestedPeopleImageWrapStyle}
                                    >
                                        <Image
                                            source={item}
                                            style={styles.interestedPeopleImageStyle}
                                        />
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.interestedCountWrapStyle}>
                            <Text style={{ ...Fonts.whiteColor10ExtraBold }}>
                                50+
                            </Text>
                        </View>
                        <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor12SemiBold }}>
                            Interested
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.aroundTitleWrapStyle}>
                            <Image
                                source={require('../../assets/images/icons/marker.png')}
                                style={{ width: 20.0, height: 20.0, resizeMode: 'contain', tintColor: Colors.blackColor }}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor16SemiBold }}>
                                See All Event Around You-10km
                            </Text>
                        </View>
                    }
                    data={this.state.nearByDJEvents}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingTop: Sizes.fixPadding * 2.0,
                        paddingBottom: Sizes.fixPadding * 7.0,
                    }}
                    showsVerticalScrollIndicator={false}
                />
                <Snackbar
                    visible={this.state.showSnackBar}
                    style={styles.snackBarStyle}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.snackBarMsg}
                </Snackbar>
            </View>
        )
    }

    updateNearByDJEvents({ id }) {
        const newList = this.state.nearByDJEvents.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isFavorite: !item.isFavorite };
                this.setState({
                    snackBarMsg: updatedItem.isFavorite
                        ?
                        `${updatedItem.djEventName} Added To Favorite`
                        :
                        `${updatedItem.djEventName} Removed From Favorite`
                })
                return updatedItem;
            }
            return item;
        });
        this.setState({ nearByDJEvents: newList })
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    interestedCountWrapStyle: {
        backgroundColor: Colors.primaryColor,
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    djEventInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomRightRadius: Sizes.fixPadding - 5.0,
    },
    snackBarStyle: {
        backgroundColor: '#333333',
        elevation: 0.0,
        position: 'absolute',
        bottom: 52.0,
        left: -10.0,
        right: -10.0,
    },
    interestedPeopleImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        width: 25.0, height: 25.0,
        borderRadius: 12.5,
        marginRight: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding - 9.0,
    },
    interestedPeopleImageStyle: {
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        borderWidth: 1.0,
        borderColor: Colors.whiteColor,
    },
    djEventTimeAndAmountInfoWrapStyle: {
        marginBottom: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding - 8.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    aroundTitleWrapStyle: {
        marginBottom: Sizes.fixPadding - 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default NearByDJEventsList;