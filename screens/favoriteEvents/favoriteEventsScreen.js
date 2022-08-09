import React, { Component, useState } from "react";
import { BackHandler, SafeAreaView, View, Animated, Image, TouchableOpacity, TouchableHighlight, StatusBar, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const favoritesList = [
    {
        key: '1',
        djEventImage: require('../../assets/images/djEvents/DJEvent1.png'),
        djEventName: 'Quiet Clubbing VIP Heated Rooftop Show',
        djEventAddress: 'Thornridge Cir. Syracuse, Connecticut',
        eventAmount: 130.00,
        isFavorite: false,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
    },
    {
        key: '2',
        djEventImage: require('../../assets/images/djEvents/DJEvent2.png'),
        djEventName: 'Bass Hill EDM Show',
        djEventAddress: 'Thornridge Cir. Syracuse, Connecticut',
        eventAmount: 110.00,
        isFavorite: false,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
    },
    {
        key: '3',
        djEventImage: require('../../assets/images/djEvents/DJEvent3.png'),
        djEventName: 'International Band Music Concert',
        djEventAddress: 'Royal Ln. Mesa, New Jersey',
        eventAmount: 110.00,
        isFavorite: false,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
    },
];

class FavoriteEventsScreen extends Component {

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
                    <Favorites props={this.props} />
                </View>
            </SafeAreaView>
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
                    Favorite Events
                </Text>
            </View>
        )
    }
}

const rowSwipeAnimatedValues = {};

Array(favoritesList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const Favorites = ({ props }) => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(favoritesList);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 50],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons
                        name="delete"
                        size={22}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'center' }}
                    />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setShowSnackBar(true);
        setListData(newData);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
        <TouchableHighlight
            style={{ backgroundColor: Colors.whiteColor }}
            activeOpacity={0.9}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => props.navigation.push('EventDetail', { item: data.item })}
                    style={styles.favoriteEventsWrapStyle}
                >
                    <Image
                        source={data.item.djEventImage}
                        style={{ width: 100.0, height: 100.0, borderTopLeftRadius: Sizes.fixPadding - 5.0, borderBottomLeftRadius: Sizes.fixPadding - 5.0 }}
                    />
                    <View style={styles.djEventInfoWrapStyle}>
                        <View>
                            <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                                {data.item.djEventName}
                            </Text>
                            <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold }}>
                                {data.item.djEventAddress}
                            </Text>
                        </View>
                        <Text style={{ ...Fonts.primaryColor16Bold }}>
                            {`$`}{data.item.eventAmount.toFixed(2)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableHighlight>
    );

    function noFavoriteItemsInfo() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons
                    name="heart-outline"
                    color={Colors.grayColor}
                    size={34}
                />
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor16SemiBold }}>
                    No items in favorite
                </Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            {listData.length == 0 ?
                <>
                    {noFavoriteItemsInfo()}
                </>
                :
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-50}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0, }}
                />
            }
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                Item Remove From Favorite.
            </Snackbar>
        </View>
    );
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
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 10,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 50,
        backgroundColor: Colors.redColor,
        right: 0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
    },
    favoriteEventsWrapStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
    },
    djEventInfoWrapStyle: {
        marginVertical: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding,
        flex: 1,
        justifyContent: 'space-between'
    },
});

FavoriteEventsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(FavoriteEventsScreen);