import React, { Component, createRef } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, TouchableOpacity, TextInput, FlatList, StyleSheet, ImageBackground, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { Snackbar } from "react-native-paper";

const recentSearchesList = [
    {
        id: '1',
        djEventImage: require('../../assets/images/djEvents/DJEvent1.png'),
        djEventName: 'Quiet Clubbing VIP Heated Rooftop Show',
        djEventAddress: 'Thornridge Cir. Syracuse, Connecticut',
        eventAmount: 130.00,
        isFavorite: false,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
    },
    {
        id: '2',
        djEventImage: require('../../assets/images/djEvents/DJEvent2.png'),
        djEventName: 'Bass Hill EDM Show',
        djEventAddress: 'Thornridge Cir. Syracuse, Connecticut',
        eventAmount: 110.00,
        isFavorite: false,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
    },
    {
        id: '3',
        djEventImage: require('../../assets/images/djEvents/DJEvent3.png'),
        djEventName: 'International Band Music Concert',
        djEventAddress: 'Royal Ln. Mesa, New Jersey',
        eventAmount: 110.00,
        isFavorite: false,
        djEventDate: '22 June',
        djEventTime: '10:00pm - 5:00am',
    },
];

class SearchScreen extends Component {

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

    constructor(props) {
        super(props);
        this.textInputRef = createRef();
    }

    state = {
        search: null,
        showSnackBar: false,
        snackBarMsg: null,
        recentSearches: recentSearchesList,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.recentSearchesInfo()}
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

    updateRecentSearches({ id }) {
        const newList = this.state.recentSearches.map((item) => {
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
        this.setState({ recentSearches: newList })
    }

    recentSearchesInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('EventDetail', { item: item })}
                style={styles.recentSearchesInfoWrapStyle}
            >
                <ImageBackground
                    source={item.djEventImage}
                    style={{ width: 100.0, height: 100.0, }}
                    borderTopLeftRadius={Sizes.fixPadding - 5.0}
                    borderBottomLeftRadius={Sizes.fixPadding - 5.0}
                >
                    <MaterialIcons
                        name={item.isFavorite ? "favorite" : "favorite-border"}
                        color={Colors.whiteColor}
                        size={16}
                        style={{ padding: Sizes.fixPadding - 5.0 }}
                        onPress={() => {
                            this.updateRecentSearches({ id: item.id })
                            this.setState({ showSnackBar: true })
                        }}
                    />
                </ImageBackground>
                <View style={styles.djEventInfoWrapStyle}>
                    <View>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.djEventName}
                        </Text>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor14SemiBold }}>
                            {item.djEventAddress}
                        </Text>
                    </View>
                    <Text style={{ ...Fonts.primaryColor16Bold }}>
                        {`$`}{item.eventAmount.toFixed(2)}
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                ListHeaderComponent={
                    <Text style={{ marginBottom: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor18Bold }}>
                        Recent Searches
                    </Text>
                }
                data={this.state.recentSearches}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding + 5.0, paddingBottom: Sizes.fixPadding }}
                showsVerticalScrollIndicator={false}
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
                <View style={styles.textFieldWrapStyle}>
                    <Feather
                        name="search"
                        color={Colors.grayColor}
                        size={14}
                        onPress={() => this.textInputRef.current.focus()}
                    />
                    <TextInput
                        ref={this.textInputRef}
                        value={this.state.search}
                        onChangeText={(value) => this.setState({ search: value })}
                        placeholder="Search for events near you..."
                        placeholderTextColor={Colors.grayColor}
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor14Regular, flex: 1, height: 20.0, marginLeft: Sizes.fixPadding, }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding * 2.0,
        borderBottomRightRadius: Sizes.fixPadding * 2.0,
    },
    textFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding + 2.0,
        flex: 1,
        marginLeft: Sizes.fixPadding + 5.0,
    },
    recentSearchesInfoWrapStyle: {
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
    snackBarStyle: {
        backgroundColor: '#333333',
        elevation: 0.0,
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
    },
});

SearchScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(SearchScreen);