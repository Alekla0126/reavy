import React, { Component, useState } from "react";
import { SafeAreaView, View, StatusBar, Image, TouchableOpacity, ScrollView, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import TrendingDJEventsList from "../trendingDJEvents/trendingsDJEventsList";
import NearByDJEventsList from "../nearByDJEvents/nearByDJEventsList";
import { TabView, TabBar } from 'react-native-tab-view';
import { Menu } from 'react-native-material-menu';

const locationsList = [
    'Syracuse, Connecticut',
    'South, Dakota',
    'Manchester, Kentucky',
    'Inglewood, Maine',
    'Mesa, New Jersey',
    'Utica, Pennsylvania',
    'Allentown, New Mexico',
];

class HomeScreen extends Component {

    state = {
        showLocationOptions: false,
        selectedLocation: locationsList[0],
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <TrendingAndNearByDJEvents props={this.props} />
                </View>
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
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.push('MapView')}
                    >
                        <Image
                            source={require('../../assets/images/icons/map.png')}
                            style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
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

const TrendingAndNearByDJEvents = ({ props }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Trending' },
        { key: 'second', title: 'Near you' },
    ]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <TrendingDJEventsList props={props} />;
            case 'second':
                return <NearByDJEventsList props={props} />;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: Colors.primaryColor, }}
                    style={{ marginTop: Sizes.fixPadding, backgroundColor: Colors.whiteColor, elevation: 0.0, marginHorizontal: Sizes.fixPadding * 2.0, }}
                    renderLabel={({ route, focused }) => (
                        <Text
                            style={focused ? { ...Fonts.primaryColor18Bold } : { ...Fonts.lightGrayColor18Bold }}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    headerWrapStyle: {
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
    }
});

export default withNavigation(HomeScreen);