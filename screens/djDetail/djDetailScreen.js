import React, { Component } from "react";
import { BackHandler, SafeAreaView, Dimensions, View, Image, ImageBackground, FlatList, TouchableOpacity, StatusBar, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { Snackbar } from "react-native-paper";
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

const upcomingDJEventsList = [
    {
        id: '1',
        djEventImage: require('../../assets/images/djEvents/DJEvent1.png'),
        djEventName: 'Quiet Clubbing VIP Heated Rooftop Show',
        djEventAddress: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
        distance: 15,
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
        distance: 12,
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
];

class DJDetailScreen extends Component {

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
        isFavorite: false,
        showSnackBar: false,
        upcomingDJEvents: upcomingDJEventsList,
        snackBarMsg: null,
    }

    item = this.props.navigation.getParam('item');

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <View>
                                    <ShowVideo />
                                    {this.header()}
                                </View>
                                {this.artistInfo()}
                                {this.aboutTheArtist()}
                                {this.upcomingEventsInfo()}
                            </>
                        }
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
                    />
                </View>
                <Snackbar
                    visible={this.state.showSnackBar}
                    style={styles.snackBarStyle}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.snackBarMsg}
                </Snackbar>
            </SafeAreaView>
        )
    }

    upcomingTrendingDJEvents({ id }) {
        const newList = this.state.upcomingDJEvents.map((item) => {
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
        this.setState({ upcomingDJEvents: newList })
    }

    upcomingEventsInfo() {
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
                            this.upcomingTrendingDJEvents({ id: item.id })
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
            <View style={{ marginTop: Sizes.fixPadding, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Bold }}>
                    Upcoming Events
                </Text>
                <FlatList
                    data={this.state.upcomingDJEvents}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    aboutTheArtist() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    About Brooklyn
                </Text>
                <Text style={{ ...Fonts.grayColor14Regular }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsu est, ipsum tristique molestie nam risus, et ac praesent.
                    {`\n`}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euis  massa duis ac id faucibus nec, risus, odio. Mauris eleifend pharetra id aliquet tempor, maecenas. Faucibus neque duis praesent nunc eget.
                </Text>
            </View>
        )
    }

    artistInfo() {
        return (
            <View style={styles.artistInfoWrapStyle}>
                <Image
                    source={this.item.artistImage}
                    style={{ width: 100.0, height: 100.0, borderRadius: Sizes.fixPadding - 5.0, }}
                />
                <View style={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {this.item.artistName}
                    </Text>
                    <Text style={{ ...Fonts.grayColor12SemiBold }}>
                        {this.item.artistSpeciality ? this.item.artistSpeciality : 'American music producer'}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ ...styles.followersButtonStyle, marginRight: Sizes.fixPadding, }}>
                            <Text style={{ textAlign: 'center', ...Fonts.primaryColor14Bold }}>
                                {this.item.followers ? this.item.followers : '1.2M'} Followers
                            </Text>
                        </View>
                        <View style={styles.followNowButtonStyle}>
                            <Text style={{ textAlign: 'center', ...Fonts.whiteColor14Bold }}>
                                Follow Now
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
                    size={22}
                    color={Colors.whiteColor}
                    onPress={() => this.props.navigation.pop()}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                    <MaterialIcons
                        name={this.state.isFavorite ? "favorite" : "favorite-border"}
                        size={18}
                        color={Colors.whiteColor}
                        onPress={() => this.setState({
                            isFavorite: !this.state.isFavorite,
                            snackBarMsg: !this.state.isFavorite ? 'Added To Favorite' : 'Removed From Favorite',
                            showSnackBar: true,
                        })}
                    />
                    <MaterialIcons
                        name="share"
                        size={18}
                        color={Colors.whiteColor}
                        style={{ marginLeft: Sizes.fixPadding }}
                    />
                </View>
            </View>
        )
    }
}

const ShowVideo = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <View>
            <Video
                ref={video}
                style={styles.video}
                source={require('../../assets/video/video.mp4')}
                useNativeControls
                resizeMode="cover"
                isLooping
                shouldPlay={true}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            {status.isPlaying ?
                null :
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                    style={styles.button}
                >
                    <MaterialIcons name="play-arrow" size={30} color="black" />
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        marginRight: Sizes.fixPadding * 2.0,
        marginLeft: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0.0,
        left: 0.0,
        right: 0.0,
    },
    followersButtonStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: '#ececec',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center', justifyContent: 'center',
        padding: Sizes.fixPadding,
    },
    followNowButtonStyle: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
        elevation: 5.0,
        borderColor: 'rgba(34, 105, 190, 0.7)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center', justifyContent: 'center',
        padding: Sizes.fixPadding,
    },
    artistInfoWrapStyle: {
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
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
        bottom: -10.0,
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
    video: {
        alignSelf: 'center',
        width: width,
        height: 200 - StatusBar.currentHeight,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.lightGrayColor
    },
    button: {
        position: "absolute",
        backgroundColor: Colors.whiteColor,
        alignSelf: 'center',
        top: 80.0 - StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
    },
});

DJDetailScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(DJDetailScreen);