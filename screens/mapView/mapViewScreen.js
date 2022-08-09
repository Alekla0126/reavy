import React, { useState, Component, createRef, useEffect } from "react";
import { BackHandler, SafeAreaView, View, Dimensions, ScrollView, Animated, StatusBar, ImageBackground, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { withNavigation, } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { TransitionPresets } from "react-navigation-stack";
import { Menu } from 'react-native-material-menu';
import { Snackbar } from "react-native-paper";

const { width } = Dimensions.get('window');

const locationsList = [
    'Syracuse, Connecticut',
    'South, Dakota',
    'Manchester, Kentucky',
    'Inglewood, Maine',
    'Mesa, New Jersey',
    'Utica, Pennsylvania',
    'Allentown, New Mexico',
];

const djEventsList = [
    {
        coordinate: {
            latitude: 22.6293867,
            longitude: 88.4354486,
        },
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
        coordinate: {
            latitude: 22.6345648,
            longitude: 88.4377279,
        },
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
    {
        coordinate: {
            latitude: 22.6281662,
            longitude: 88.4410113,
        },
        id: '3',
        djEventImage: require('../../assets/images/djEvents/DJEvent3.png'),
        djEventName: 'International Band Music Concert',
        djEventAddress: '2464 Royal Ln. Mesa, New Jersey 45463',
        distance: 13,
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
        coordinate: {
            latitude: 22.6341137,
            longitude: 88.4497463,
        },
        id: '4',
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
        coordinate: {
            latitude: 22.632425,
            longitude: 88.424897,
        },
        id: '5',
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
    {
        coordinate: {
            latitude: 22.626483,
            longitude: 88.426786,
        },
        id: '6',
        djEventImage: require('../../assets/images/djEvents/DJEvent3.png'),
        djEventName: 'International Band Music Concert',
        djEventAddress: '2464 Royal Ln. Mesa, New Jersey 45463',
        distance: 13,
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

class MapViewScreen extends Component {

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

    constructor(props) {
        super(props);
        this.textInputRef = createRef();
    }

    state = {
        showLocationOptions: false,
        selectedLocation: locationsList[0],
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <DJEvents props={this.props} />
                {this.header()}
            </SafeAreaView>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={styles.headerLocationInfoWrapStyle}>
                    <Image
                        source={require('../../assets/images/users/user1.png')}
                        style={{ width: 50.0, height: 50.0, borderRadius: 25.0, }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.whiteColor14Regular }}>
                            Your Location
                        </Text>
                        <Menu
                            visible={this.state.showLocationOptions}
                            style={{ paddingVertical: Sizes.fixPadding - 5.0, }}
                            anchor={
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => this.setState({ showLocationOptions: true })}
                                    style={{ flexDirection: 'row', alignItems: 'center', }}
                                >
                                    <Text numberOfLines={1} style={{ ...Fonts.whiteColor16SemiBold }}>
                                        {this.state.selectedLocation}
                                    </Text>
                                    <MaterialIcons
                                        name="arrow-drop-down"
                                        color={Colors.whiteColor}
                                        size={24}
                                        style={{ marginLeft: Sizes.fixPadding - 5.0, }}
                                    />
                                </TouchableOpacity>
                            }
                            onRequestClose={() => this.setState({ showLocationOptions: false })}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {
                                    locationsList.map((item, index) => (
                                        <Text
                                            key={index}
                                            style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}
                                            onPress={() => this.setState({ selectedLocation: item, showLocationOptions: false })}
                                        >
                                            {item}
                                        </Text>
                                    ))
                                }
                            </ScrollView>
                        </Menu>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                        name="featured-play-list"
                        size={17}
                        color={Colors.whiteColor}
                        onPress={() => this.props.navigation.pop()}
                    />
                    <Feather
                        name="search"
                        size={17}
                        color={Colors.whiteColor}
                        style={{ marginLeft: Sizes.fixPadding + 5.0 }}
                        onPress={() => this.props.navigation.push('Search')}
                    />
                </View>
            </View>
        )
    }
}

const cardWidth = width / 1.15;

const DJEvents = ({ props }) => {

    const [markerList, setMarkerList] = useState(djEventsList);
    const [snackBarMsg, setSnackBarMsg] = useState(null);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [region] = useState(
        {
            latitude: 22.62938671242907,
            longitude: 88.4354486029795,
            latitudeDelta: 0.035,
            longitudeDelta: 0.035,
        }
    );

    let mapAnimation = new Animated.Value(0);
    let mapIndex = 0;

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / cardWidth + 0.3);
            if (index >= markerList.length) {
                index = markerList.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex != index) {
                    mapIndex = index;
                    const { coordinate } = markerList[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        }, 350
                    )
                }
            }, 10);
        });
    });

    const interpolation = markerList.map((marker, index) => {
        const inputRange = [
            (index - 1) * cardWidth,
            index * cardWidth,
            ((index + 1) * cardWidth),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        })

        return { scale };
    })

    const _map = React.useRef(null);

    return (
        <View style={{ flex: 1 }}>
            {markersInfo()}
            {djEventsInfo()}
            <Snackbar
                visible={showSnackBar}
                style={styles.snackBarStyle}
                onDismiss={() => setShowSnackBar(false)}
            >
                {snackBarMsg}
            </Snackbar>
        </View>
    )

    function djEventsInfo() {
        return (
            <Animated.ScrollView
                horizontal={true}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                style={styles.DjEventsWrapStyle}
                snapToInterval={cardWidth + 10}
                snapToAlignment="center"
                contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding - 9.0 }}
                onScroll={
                    Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: mapAnimation,
                                    }
                                }
                            }
                        ],
                        { useNativeDriver: true }
                    )
                }
            >
                {markerList.map((marker, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => props.navigation.push('EventDetail', { item: marker })}
                            style={{ width: cardWidth, borderRadius: Sizes.fixPadding - 5.0, marginRight: Sizes.fixPadding, }}
                        >
                            <ImageBackground
                                source={marker.djEventImage}
                                style={{
                                    height: 120.0,
                                    width: '100%',
                                    justifyContent: 'space-between'
                                }}
                                borderTopLeftRadius={Sizes.fixPadding - 5.0}
                                borderTopRightRadius={Sizes.fixPadding - 5.0}
                            >
                                <MaterialIcons
                                    name={marker.isFavorite ? "favorite" : "favorite-border"}
                                    color={Colors.whiteColor}
                                    size={22}
                                    style={{ margin: Sizes.fixPadding, alignSelf: 'flex-end' }}
                                    onPress={() => {
                                        updateDJEvents({ id: marker.id })
                                        setShowSnackBar(true)
                                    }}
                                />
                                <Text style={{ margin: Sizes.fixPadding, ...Fonts.whiteColor16Bold }}>
                                    {marker.djEventName}
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
                                            {marker.djEventAddress}
                                        </Text>
                                        <Text style={{ ...Fonts.grayColor14SemiBold }}>
                                            {marker.distance} km away
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.djEventTimeAndAmountInfoWrapStyle}>
                                    <Text style={{ flex: 1, ...Fonts.blackColor16SemiBold }}>
                                        {marker.djEventDate} | {marker.djEventTime}
                                    </Text>
                                    <Text style={{ ...Fonts.primaryColor16Bold }}>
                                        {`$`}{marker.eventAmount.toFixed(2)}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {
                                            marker.interestedPeopleList.slice(0, 6).map((item, index) => (
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
                    </View>
                ))}
            </Animated.ScrollView>
        )
    }

    function updateDJEvents({ id }) {
        const newList = markerList.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isFavorite: !item.isFavorite };
                setSnackBarMsg(updatedItem.isFavorite
                    ?
                    `${updatedItem.djEventName} Added To Favorite`
                    :
                    `${updatedItem.djEventName} Removed From Favorite`
                )
                return updatedItem;
            }
            return item;
        });
        setMarkerList(newList);
    }

    function markersInfo() {
        return (
            <MapView
                ref={_map}
                initialRegion={region}
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
            >
                {markerList.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolation[index].scale
                            }
                        ]
                    }
                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={marker.coordinate}
                        >
                            <Animated.View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 50.0, height: 50.0,
                                }}
                            >
                                <Animated.Image
                                    source={require('../../assets/images/icons/marker.png')}
                                    resizeMode="contain"
                                    style={[{ width: 35.0, height: 35.0 }, scaleStyle]}
                                >
                                </Animated.Image>
                            </Animated.View>
                        </MapView.Marker>
                    )
                })}
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        position: 'absolute',
        top: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerLocationInfoWrapStyle: {
        flex: 1,
        marginRight: Sizes.fixPadding,
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
    DjEventsWrapStyle: {
        position: 'absolute',
        bottom: 20.0,
        left: 0.0,
        right: 0.0,
        paddingVertical: 10.0,
    },
});

MapViewScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(MapViewScreen);