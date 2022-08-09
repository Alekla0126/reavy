import React, { Component } from "react";
import { BackHandler, SafeAreaView, ScrollView, View, StatusBar, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

const companiesPoliciesList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt eget est dictumst laoreet sed tellus integer. Massa sed eros tortor egestas tellus non massa sit. Rhoncus potenti massa eu, in fringilla quis.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus at volutpat vitae tristique vitae pellentesque habitasse. Tempus sit nunc, magna nisl. At sed consequat, nunc sapien proin ultricies tincidunt pulvinar dis. Enim cras sed leo, nunc odio.',
];

const termsOfUseList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt eget est dictumst laoreet sed tellus integer. Massa sed eros tortor egestas tellus non massa sit. Rhoncus potenti massa eu, in fringilla quis.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus at volutpat vitae tristique vitae pellentesque habitasse. Tempus sit nunc, magna nisl. At sed consequat, nunc sapien proin ultricies tincidunt pulvinar dis. Enim cras sed leo, nunc odio.',
];

class TermsAndConditionsScreen extends Component {

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
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}>
                        {this.companyPoliciesInfo()}
                        {this.termsOfUseInfo()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    termsOfUseInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor18Bold }}>
                    Terms of Use
                </Text>
                {
                    termsOfUseList.map((item, index) => (
                        <Text key={`${index}`} style={{
                            ...Fonts.grayColor14Regular,
                            marginBottom: Sizes.fixPadding - 5.0,
                        }}>
                            {item}
                        </Text>
                    ))
                }
            </View>
        )
    }

    companyPoliciesInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding * 2.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor18Bold }}>
                    Company Policies
                </Text>
                {
                    companiesPoliciesList.map((item, index) => (
                        <Text key={`${index}`} style={{
                            ...Fonts.grayColor14Regular,
                            marginBottom: Sizes.fixPadding - 5.0,
                        }}>
                            {item}
                        </Text>
                    ))
                }
            </View>
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
                    Terms & Conditions
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
});

TermsAndConditionsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(TermsAndConditionsScreen);