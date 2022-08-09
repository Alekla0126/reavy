import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, ScrollView, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";
import { TextInput } from 'react-native-paper';
import { BottomSheet } from 'react-native-elements';
import { SharedElement } from 'react-navigation-shared-element';

class EditProfileScreen extends Component {

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

    id = this.props.navigation.getParam('id');

    static sharedElements = (navigation) => {
        const id = navigation.getParam('id');
        return [id];
    }

    state = {
        fullName: 'Samantha Smith',
        email: 'smithsamantha@gmail.com',
        mobileNo: '+91 1236547990',
        password: '1234567899',
        showBottomSheet: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.profilePic()}
                        {this.fullNameTextField()}
                        {this.emailTextField()}
                        {this.mobileNoTextField()}
                        {this.passwordTextField()}
                        {this.saveButton()}
                    </ScrollView>
                </View>
                {this.changeProfilePicOptionsSheet()}
            </SafeAreaView>
        )
    }

    changeProfilePicOptionsSheet() {
        return (
            <BottomSheet
                isVisible={this.state.showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { this.setState({ showBottomSheet: false }) } }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: false })}
                    style={styles.changeProfilePicBottomSheetStyle}
                >
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                        Choose Option
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding + 2.0, flexDirection: 'row', }}>
                        {this.changeProfilePicOptionsSort({
                            bgColor: '#009688',
                            icon: <Entypo name="camera" size={22} color={Colors.whiteColor} />,
                            option: 'Camera'
                        })}
                        <View style={{ marginHorizontal: Sizes.fixPadding * 4.0, }}>
                            {this.changeProfilePicOptionsSort({
                                bgColor: '#00A7F7',
                                icon: <MaterialCommunityIcons name="image" size={24} color={Colors.whiteColor} />,
                                option: 'Gallery'
                            })}
                        </View>
                        {this.changeProfilePicOptionsSort({
                            bgColor: '#DD5A5A',
                            icon: <MaterialCommunityIcons name="delete" size={24} color={Colors.whiteColor} />,
                            option: 'Remove photo'
                        })}
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    changeProfilePicOptionsSort({ bgColor, icon, option }) {
        return (
            <View>
                <View style={{
                    ...styles.changeProfilePicOptionsIconWrapStyle,
                    backgroundColor: bgColor,
                }}>
                    {icon}
                </View>
                <Text style={{ marginTop: Sizes.fixPadding - 5.0, width: 50.0, ...Fonts.grayColor13SemiBold }}>
                    {option}
                </Text>
            </View>
        )
    }

    saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.pop()}
                style={styles.saveButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18ExtraBold }}>
                    Save
                </Text>
            </TouchableOpacity>
        )
    }

    passwordTextField() {
        return (
            <TextInput
                label="Password"
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                mode='outlined'
                selectionColor={Colors.primaryColor}
                style={styles.textFieldStyle}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
                secureTextEntry={true}
            />
        )
    }

    mobileNoTextField() {
        return (
            <TextInput
                label="Mobile Number"
                value={this.state.mobileNo}
                onChangeText={text => this.setState({ mobileNo: text })}
                mode='outlined'
                selectionColor={Colors.primaryColor}
                style={styles.textFieldStyle}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
                keyboardType='numeric'
            />
        )
    }

    emailTextField() {
        return (
            <TextInput
                label="Email Address"
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
                mode='outlined'
                selectionColor={Colors.primaryColor}
                style={styles.textFieldStyle}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
            />
        )
    }

    fullNameTextField() {
        return (
            <TextInput
                label="Full Name"
                value={this.state.fullName}
                onChangeText={text => this.setState({ fullName: text })}
                mode='outlined'
                selectionColor={Colors.primaryColor}
                style={styles.textFieldStyle}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: 'transparent', } }}
            />
        )
    }

    profilePic() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, alignSelf: 'center', alignItems: 'center' }}>
                <SharedElement id={this.id}>
                    <Image
                        source={require('../../assets/images/users/user1.png')}
                        style={{ width: 100.0, height: 100.0, borderRadius: 50.0, }}
                    />
                </SharedElement>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: true })}
                    style={styles.cameraIconWrapStyle}
                >
                    <Entypo name="camera" size={12} color={Colors.whiteColor} />
                </TouchableOpacity>
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
                    Edit profile
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
    cameraIconWrapStyle: {
        position: 'absolute',
        bottom: 3.0,
        right: 5.0,
        width: 28.0, height: 28.0,
        borderRadius: 14.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 1.8,
        elevation: 4.0,
    },
    textFieldStyle: {
        marginBottom: Sizes.fixPadding + 10.0,
        ...Fonts.blackColor16SemiBold,
        height: 50.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    saveButtonStyle: {
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        alignItems: 'center', justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        shadowColor: Colors.primaryColor,
        elevation: 5.0,
        borderColor: 'rgba(34, 105, 190, 0.7)',
        borderWidth: 1.0,
    },
    changeProfilePicBottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    changeProfilePicOptionsIconWrapStyle: {
        width: 50.0,
        height: 50.0,
        borderRadius: 25.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

EditProfileScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(EditProfileScreen);