import React, { Component, useState, useRef } from "react";
import { BackHandler, SafeAreaView, View, Image, TouchableOpacity, Animated, Dimensions, StatusBar, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { NavigationEvents } from 'react-navigation';;

const { width, height, } = Dimensions.get('window');

const onboardingScreenList = [
    {
        id: '1',
        onboardingImage: require('../../assets/images/onboardings/onboarding1.png'),
        title: 'Book Your Favorite Event',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit Venenatis, quam tellus risus consequat.`,
    },
    {
        id: '2',
        onboardingImage: require('../../assets/images/onboardings/onboarding2.png'),
        title: 'Explore New Events',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit Venenatis, quam tellus risus consequat.`,
    },
    {
        id: '3',
        onboardingImage: require('../../assets/images/onboardings/onboarding3.png'),
        title: 'Enjoy with Family & Friends',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit Venenatis, quam tellus risus consequat.`,
    },
];

class OnboardingScreen extends Component {

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
                        toValue: -.03 * height,
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

    state = {
        backClickCount: 0
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <Onboarding props={this.props} />
                </View>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor14Regular }}>
                        Press Back Once Again to Exit
                    </Text>
                </Animated.View>
            </SafeAreaView>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={{ height: 120.0, width: '100%', resizeMode: 'contain' }}
                />
            </View>
        )
    }
}

const Onboarding = ({ props }) => {

    const [onboardingScreens, setOnboardingScreen] = useState(onboardingScreenList);
    const [activeSlide, setActiveSlide] = useState(0);

    const flatListRef = useRef();

    const renderItem = ({ item }) => {
        return (
            <View style={styles.onboardingPageStyle}>
                <View>
                    <Text
                        onPress={() => props.navigation.push('Welcome')}
                        style={{ marginVertical: Sizes.fixPadding * 3.0, textAlign: 'right', ...Fonts.primaryColor14Bold }}
                    >
                        Skip
                    </Text>
                    <Image source={item.onboardingImage}
                        style={{
                            height: height / 4.0,
                            width: '100%',
                            resizeMode: 'contain'
                        }}
                    />
                    <View style={{ marginTop: Sizes.fixPadding * 2.0, alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', ...Fonts.blackColor18Bold }}>
                            {item.title}
                        </Text>
                        <Text style={{ textAlign: 'center', ...Fonts.blackColor14Regular }}>
                            {item.description}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            <Carousel
                ref={flatListRef}
                data={onboardingScreens}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                lockScrollWhileSnapping={true}
                showsHorizontalScrollIndicator={false}
                onSnapToItem={(index) => setActiveSlide(index)}
                autoplay={true}
                loop={true}
                autoplayInterval={4000}
                slideStyle={{ width: width }}
            />
            {pagination()}
            {skipNextAndLogin()}
        </>
    )

    function skipNextAndLogin() {
        return (
            <View style={styles.forwardButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        if (activeSlide == 0) {
                            flatListRef.current.snapToItem(1);
                        }
                        else if (activeSlide == 1) {
                            flatListRef.current.snapToItem(2);
                        }
                        else {
                            props.navigation.push('Welcome');
                        }
                    }}
                    style={styles.forwardButtonStyle}
                >
                    <MaterialIcons
                        name="arrow-forward-ios"
                        color={Colors.whiteColor}
                        size={22}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function pagination() {
        return (
            <Pagination
                dotsLength={onboardingScreens.length}
                activeDotIndex={activeSlide}
                containerStyle={{ position: 'absolute', bottom: 0.0, left: 0.0, alignSelf: 'center' }}
                dotStyle={{ ...styles.dotStyle, backgroundColor: Colors.primaryColor }}
                inactiveDotStyle={{ ...styles.dotStyle, backgroundColor: Colors.lightGrayColor }}
                inactiveDotScale={1}
            />
        );
    }
}

const styles = StyleSheet.create({
    onboardingPageStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    headerWrapStyle: {
        height: 200 - StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    forwardButtonWrapStyle: {
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 20.0,
        right: 20.0,
    },
    nextAndLoginButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 3.0,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    dotStyle: {
        borderRadius: 5.0,
        height: 4.0,
        width: 20.0,
        marginHorizontal: Sizes.fixPadding - 15.0,
    },
    forwardButtonStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
    }
});

OnboardingScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(OnboardingScreen);