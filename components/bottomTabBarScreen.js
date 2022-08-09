import React, { Component } from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions, StyleSheet, BackHandler, SafeAreaView, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { NavigationEvents } from 'react-navigation';
import HomeScreen from "../screens/home/homeScreen";
import TicketsScreen from "../screens/tickets/ticketsScreen";
import NotificationScreen from "../screens/notification/notificationScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

class BottomTabBarScreen extends Component {

    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.1 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });
    }

    index = this.props.navigation.getParam('index');

    state = {
        currentIndex: this.index ? this.index : 1,
        backClickCount: 0
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                    {this.state.currentIndex == 1 ?
                        <HomeScreen /> :
                        this.state.currentIndex == 2 ?
                            <TicketsScreen />
                            :
                            this.state.currentIndex == 3 ?
                                <NotificationScreen />
                                :
                                <ProfileScreen />
                    }
                    <View style={styles.bottomTabBarStyle}>
                        {this.bottomTabBarItem({
                            index: 1,
                            tabName: 'Home',
                        })}
                        {this.bottomTabBarItem({
                            index: 2,
                            tabName: 'Tickets',
                        })}
                        {this.bottomTabBarItem({
                            index: 3,
                            tabName: 'Notification',
                        })}
                        {this.bottomTabBarItem({
                            index: 4,
                            tabName: 'Profile',
                        })}
                    </View>
                </View>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor14Regular }}>
                        Press Back Once Again to Exit
                    </Text>
                </Animated.View>
            </SafeAreaView>
        )
    }

    bottomTabBarItem({ index, tabName }) {
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ currentIndex: index })}
                >
                    {
                        index == 1
                            ?
                            <MaterialIcons
                                name="home"
                                size={26}
                                color={this.state.currentIndex == index ? Colors.primaryColor : Colors.lightGrayColor}
                            />
                            :
                            index == 2
                                ?
                                <FontAwesome5
                                    name="ticket-alt"
                                    size={20}
                                    color={this.state.currentIndex == index ? Colors.primaryColor : Colors.lightGrayColor}
                                />
                                :
                                index == 3
                                    ?
                                    <Ionicons
                                        name="notifications"
                                        size={23}
                                        color={this.state.currentIndex == index ? Colors.primaryColor : Colors.lightGrayColor}
                                    />
                                    :
                                    <Ionicons
                                        name="person"
                                        size={22}
                                        color={this.state.currentIndex == index ? Colors.primaryColor : Colors.lightGrayColor}
                                    />
                    }
                </TouchableOpacity>
                <Text style={this.state.currentIndex == index ? { ...Fonts.primaryColor12Bold } : { ...Fonts.lightGrayColor12Bold }}>
                    {tabName}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    }
});

BottomTabBarScreen.navigationOptions = () => {
    return {
        header: () => null,
    }
}

export default withNavigation(BottomTabBarScreen);





