import React, { Component, useState, useRef } from "react";
import { SafeAreaView, Dimensions, Animated, View, StatusBar, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const notificationsList = [
    {
        key: '1',
        title: 'Bass Hill EDM Show',
        description: 'You successfully booked your ticket',
        time: '2h ago',
    },
    {
        key: '2',
        title: 'Checkout New Trending Events',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscig',
        time: '2days ago',
    },
    {
        key: '3',
        title: 'You Started Following Brooklyn',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscig',
        time: '2 days ago'
    },
];

class NotificationScreen extends Component {

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <Notifications />
                </View>
            </SafeAreaView>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.whiteColor20Bold }}>
                    Notifications
                </Text>
            </View>
        )
    }
}

const rowTranslateAnimatedValues = {};

const Notifications = () => {

    const [showSnackBar, setShowSnackBar] = useState(false);

    const [snackBarMsg, setSnackBarMsg] = useState('');

    const [listData, setListData] = useState(notificationsList);

    Array(listData.length + 1)
        .fill('')
        .forEach((_, i) => {
            rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
        });

    const animationIsRunning = useRef(false);

    const onSwipeValueChange = swipeData => {

        const { key, value } = swipeData;

        if (
            value < -Dimensions.get('window').width &&
            !animationIsRunning.current
        ) {
            animationIsRunning.current = true;
            Animated.timing(rowTranslateAnimatedValues[key], {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {

                const newData = [...listData];
                const prevIndex = listData.findIndex(item => item.key === key);
                newData.splice(prevIndex, 1);
                const removedItem = listData.find(item => item.key === key);

                setSnackBarMsg(`${removedItem.title} dismissed`);

                setListData(newData);

                setShowSnackBar(true);

                animationIsRunning.current = false;
            });
        }
    };

    const renderItem = data => (
        <Animated.View
            style={[
                {
                    height: rowTranslateAnimatedValues[
                        data.item.key
                    ].interpolate({
                        inputRange: ['0%', '100%'],
                        outputRange: ['0%', '100%'],
                    }),
                },
            ]}
        >
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <View style={styles.notificationWrapStyle}>
                    <View style={styles.notificationIconWrapStyle}>
                        <Ionicons
                            name="notifications"
                            size={26}
                            color={Colors.primaryColor}
                        />
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding, justifyContent: 'space-between' }}>
                        <View>
                            <Text numberOfLines={1} style={{ ...Fonts.blackColor14SemiBold }}>
                                {data.item.title}
                            </Text>
                            <Text numberOfLines={1} style={{ lineHeight: 18.0, ...Fonts.grayColor14SemiBold }}>
                                {data.item.description}
                            </Text>
                        </View>
                        <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor12SemiBold }}>
                            {data.item.time}
                        </Text>
                    </View>
                </View>
            </View>
        </Animated.View >
    );

    const renderHiddenItem = () => (
        <View style={styles.rowBack} />
    );

    return (
        <View style={{ backgroundColor: Colors.whiteColor, flex: 1, }}>
            {listData.length == 0 ?
                noNotification()
                :
                <SwipeListView
                    disableRightSwipe
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    onSwipeValueChange={onSwipeValueChange}
                    useNativeDriver={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding + 5.0, }}
                />
            }
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                {snackBarMsg}
            </Snackbar>
        </View>
    );

    function noNotification() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Ionicons
                    name="notifications-off"
                    size={34}
                    color={Colors.grayColor}
                />
                <Text style={{ ...Fonts.grayColor16SemiBold, marginTop: Sizes.fixPadding - 5.0 }}>
                    No new notifications
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
    notificationIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        borderColor: Colors.primaryColor,
        borderWidth: 2.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3.0,
    },
    notificationWrapStyle: {
        marginBottom: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        flex: 1,
        marginBottom: Sizes.fixPadding,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 54.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
});

export default withNavigation(NotificationScreen);