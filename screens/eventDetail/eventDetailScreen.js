import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, Image, FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import CollapsingToolbar from "../../components/sliverAppBarScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from "react-native-paper";

const djLineUpList = [
    {
        id: '1',
        artistImage: require('../../assets/images/users/user8.png'),
        artistName: 'Jerome',
        time: '8:30-9:30',
    },
    {
        id: '2',
        artistImage: require('../../assets/images/users/user9.png'),
        artistName: 'Brooklyn',
        time: '9:30-10:30',
    },
    {
        id: '3',
        artistImage: require('../../assets/images/users/user10.png'),
        artistName: 'Fox',
        time: '10:30-11:30',
    },
    {
        id: '4',
        artistImage: require('../../assets/images/users/user11.png'),
        artistName: 'Jacob',
        time: '11:30-12:00',
    },
    {
        id: '5',
        artistImage: require('../../assets/images/users/user12.png'),
        artistName: 'Jenny',
        time: '12:00-12:30',
    },
    {
        id: '6',
        artistImage: require('../../assets/images/djEvents/DJEvent3.png'),
        artistName: 'Esther',
        time: '8:30-9:30',
    },
    {
        id: '7',
        artistImage: require('../../assets/images/users/user13.png'),
        artistName: 'Esther',
        time: '8:30-9:30',
    },
];

const attendingPeopleList = [
    require('../../assets/images/users/user2.png'),
    require('../../assets/images/users/user3.png'),
    require('../../assets/images/users/user4.png'),
    require('../../assets/images/users/user5.png'),
    require('../../assets/images/users/user6.png'),
    require('../../assets/images/users/user7.png'),
    require('../../assets/images/users/user12.png'),
    require('../../assets/images/users/user8.png'),
];

const aboutEventsList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsu est, ipsum tristique molestie nam risus, et ac praesent.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euis  massa duis ac id faucibus nec, risus, odio. Mauris eleifend pharetra id aliquet tempor, maecenas. Faucibus neque duis praesent nunc eget.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euis  massa duis ac id faucibus nec, risus, odio. Mauris eleifend pharetra id aliquet tempor, maecenas.',
];

class EventDetailScreen extends Component {

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

    item = this.props.navigation.getParam('item')

    state = {
        isFavorite: false,
        showSnackBar: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons
                            name="arrow-back"
                            size={22}
                            color={Colors.whiteColor}
                            onPress={() => this.props.navigation.pop()}
                        />
                    }
                    rightItem={
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                            <MaterialIcons
                                name={this.state.isFavorite ? "favorite" : "favorite-border"}
                                size={18}
                                color={Colors.whiteColor}
                                onPress={() => this.setState({ isFavorite: !this.state.isFavorite, showSnackBar: true, })}
                            />
                            <MaterialIcons
                                name="share"
                                size={18}
                                color={Colors.whiteColor}
                                style={{ marginLeft: Sizes.fixPadding }}
                            />
                        </View>
                    }
                    borderBottomRadius={15}
                    toolbarColor={Colors.primaryColor}
                    toolbarMinHeight={StatusBar.currentHeight + 40.0}
                    toolbarMaxHeight={200 - StatusBar.currentHeight}
                    src={this.item.djEventImage}
                >
                    <View style={{ paddingBottom: Sizes.fixPadding * 7.0 }}>
                        {this.djEventDetail()}
                    </View>
                </CollapsingToolbar>
                {this.bookTicketButton()}
                <Snackbar
                    visible={this.state.showSnackBar}
                    style={styles.snackBarStyle}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.isFavorite ? 'Added To favorite' : 'Removed From Favorite'}
                </Snackbar>
            </SafeAreaView>
        )
    }

    bookTicketButton() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('SelectSeat')}
                    style={styles.bookTicketButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18ExtraBold }}>
                        Book your Ticket Now
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    djEventDetail() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, }}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Bold }}>
                    {this.item.djEventName}
                </Text>
                {this.dateAndTimeInfo()}
                {this.divider()}
                {this.locationInfo()}
                {this.divider()}
                {this.ticketInfo()}
                {this.divider()}
                {this.djLineUpInfo()}
                {this.divider()}
                {this.attendingInfo()}
                {this.divider()}
                {this.aboutEventInfo()}
            </View>
        )
    }

    aboutEventInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    About Event
                </Text>
                {
                    aboutEventsList.map((item, index) => (
                        <Text key={`${index}`} style={{ ...Fonts.grayColor14Regular }}>
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    attendingInfo() {
        var left = 5;
        return (
            <View style={{ marginBottom: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor18Bold }}>
                    954 people are attending
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        attendingPeopleList.slice(0, 7).map((item, index) => {
                            left = left - 5
                            return (
                                <View
                                    key={`${index}`}
                                    style={{ ...styles.attendersImageWrapStyle, left: left, }}
                                >
                                    <Image
                                        source={item}
                                        style={styles.attendersImageStyle}
                                    />
                                    {
                                        index == 6
                                            ?
                                            <Text style={{ position: 'absolute', ...Fonts.whiteColor8ExtraBold }}>
                                                950+
                                            </Text>
                                            :
                                            null
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    djLineUpInfo() {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('DJDetail', { item: item })}
                style={{ marginRight: Sizes.fixPadding, alignItems: 'center' }}
            >
                <Image
                    source={item.artistImage}
                    style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0, }}
                />
                <Text numberOfLines={1} style={{ textAlign: 'center', width: 80.0, ...Fonts.blackColor14SemiBold }}>
                    {item.artistName}
                </Text>
                <Text style={{ ...Fonts.grayColor12SemiBold }}>
                    {item.time}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{}}>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Bold }}>
                    Dj Line up
                </Text>
                <FlatList
                    data={djLineUpList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingRight: Sizes.fixPadding,
                        paddingTop: Sizes.fixPadding - 5.0,
                    }}
                />
            </View>
        )
    }

    ticketInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', }}>
                <Image
                    source={require('../../assets/images/icons/dollar.png')}
                    style={{ width: 30.0, height: 30.0, resizeMode: 'contain', }}
                />
                <View style={{ marginLeft: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.grayColor12SemiBold }}>
                        Ticket Price
                    </Text>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {`$`}{this.item.eventAmount.toFixed(2)}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                        Get pass charges apply
                    </Text>
                </View>
            </View>
        )
    }

    locationInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', }}>
                <Image
                    source={require('../../assets/images/icons/marker.png')}
                    style={{ width: 30.0, height: 30.0, resizeMode: 'contain', }}
                />
                <View style={{ marginLeft: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.grayColor12SemiBold }}>
                        Location
                    </Text>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Thornridge Cir. Shiloh
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                        {this.item.djEventAddress}
                    </Text>
                </View>
            </View>
        )
    }

    dateAndTimeInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding, flexDirection: 'row', }}>
                <Image
                    source={require('../../assets/images/icons/calendar.png')}
                    style={{ width: 30.0, height: 30.0, resizeMode: 'contain', }}
                />
                <View style={{ marginLeft: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.grayColor12SemiBold }}>
                        Date & Time
                    </Text>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {this.item.djEventDate}, 2021
                    </Text>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        Tuesday, {this.item.djEventTime}
                    </Text>
                </View>
            </View>
        )
    }

    divider() {
        return (
            <View
                style={{
                    backgroundColor: Colors.lightGrayColor,
                    height: 1.0,
                    marginVertical: Sizes.fixPadding,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => this.props.navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.blackColor20Medium }}>
                    Book Slot
                </Text>
            </View>
        )
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
    attendersImageWrapStyle: {
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    attendersImageStyle: {
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
    },
    snackBarStyle: {
        backgroundColor: '#333333',
        elevation: 0.0,
        position: 'absolute',
        bottom: 64.0,
        left: -10.0,
        right: -10.0,
    },
    bookTicketButtonStyle: {
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

EventDetailScreen.navigationOptions = () => {
    return {
        header: () => null,
    }
}

export default withNavigation(EventDetailScreen);