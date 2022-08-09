import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, TouchableOpacity, FlatList, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

const userDjsList = [
    {
        id: '1',
        artistImage: require('../../assets/images/djs/dj1.png'),
        artistName: 'Jane Cooper',
        artistSpeciality: 'American music producer',
        address: 'Syracuse, Connecticut',
        followers: '1.5M',
    },
    {
        id: '2',
        artistImage: require('../../assets/images/djs/dj2.png'),
        artistName: 'Loco Dice',
        artistSpeciality: 'German music producer',
        address: 'Düsseldorf, Alemania',
        followers: '1.5M',
    },
    {
        id: '3',
        artistImage: require('../../assets/images/djs/dj3.png'),
        artistName: 'Esther Howard',
        artistSpeciality: 'American music producer',
        address: 'Manchester, Kentucky',
        followers: '1.5M',
    },
    {
        id: '4',
        artistImage: require('../../assets/images/djs/dj4.png'),
        artistName: 'Kid Moonsta',
        artistSpeciality: 'Mexico City, Mexico',
        address: 'Inglewood, Maine',
        followers: '1.5M',
    },
    {
        id: '5',
        artistImage: require('../../assets/images/djs/dj5.png'),
        artistName: 'Robert Fox',
        artistSpeciality: 'American music producer',
        address: 'Mesa, New Jersey',
        followers: '1.5M',
    },
    {
        id: '6',
        artistImage: require('../../assets/images/djs/dj6.png'),
        artistName: 'EDX',
        artistSpeciality: 'Swiss music producer',
        address: 'Zurich, Switzerland',
        followers: '1.5M',
    },
    {
        id: '7',
        artistImage: require('../../assets/images/djs/dj7.png'),
        artistName: 'Cameron Williamson',
        artistSpeciality: 'American music producer',
        address: 'Allentown, New Mexico',
        followers: '1.5M',
    },
    {
        id: '8',
        artistImage: require('../../assets/images/djs/dj1.png'),
        artistName: 'Sonja Moonear',
        artistSpeciality: 'Swiss music producer',
        address: 'Zurich, Switzerland',
        followers: '1.5M',
    },
    {
        id: '9',
        artistImage: require('../../assets/images/djs/dj2.png'),
        artistName: 'Miss Monique',
        artistSpeciality: 'Ukranian DJ',
        address: 'Ukraine',
        followers: '1.5M',
    },
    {
        id: '10',
        artistImage: require('../../assets/images/djs/dj3.png'),
        artistName: 'Esther Howard',
        artistSpeciality: 'American music producer',
        address: 'Manchester, Kentucky',
        followers: '1.5M',
    },
    {
        id: '11',
        artistImage: require('../../assets/images/djs/dj4.png'),
        artistName: 'Tiga',
        artistSpeciality: 'Canadian DJ',
        address: 'Montreal, Canada',
        followers: '1.5M',
    },
];

class UserDJsScreen extends Component {

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
                    {this.djs()}
                </View>
            </SafeAreaView>
        )
    }

    djs() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('DJDetail', { item: item })}
                style={styles.djsInfoWrapStyle}
            >
                <Image
                    source={item.artistImage}
                    style={styles.artistImageStyle}
                />
                <View style={{ flex: 1, margin: Sizes.fixPadding, }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                        {item.artistName}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold }}>
                        {item.artistSpeciality}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.grayColor12SemiBold }}>
                        {item.address}
                    </Text>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ marginTop: Sizes.fixPadding - 15.0, }}>
                            <Text style={{ ...Fonts.blackColor14Bold }}>
                                {item.followers}
                            </Text>
                            <Text>
                                {` `}
                            </Text>
                            <Text style={{ ...Fonts.blackColor14Regular }}>
                                Followers
                            </Text>
                        </Text>
                        <View style={styles.followingButtonStyle}>
                            <Text style={{ ...Fonts.whiteColor14Bold }}>
                                Following
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={userDjsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, paddingBottom: Sizes.fixPadding, }}
            />
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
                    My DJs
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
    followingButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding - 4.0,
        paddingHorizontal: Sizes.fixPadding + 8.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: Colors.primaryColor,
        elevation: 5.0,
        borderColor: 'rgba(34, 105, 190, 0.7)',
        borderWidth: 1.0,
    },
    artistImageStyle: {
        width: 100.0,
        height: '100%',
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
    },
    djsInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
    }
});

UserDJsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(UserDJsScreen);