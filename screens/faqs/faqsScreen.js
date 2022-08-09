import React, { Component, createRef } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, TouchableOpacity, FlatList, TextInput, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

const faqsList = [
    {
        id: '1',
        question: 'How to book ticket?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: true,
    },
    {
        id: '2',
        question: 'Where I can see my tickets?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '3',
        question: 'How to follow DJs?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '4',
        question: 'Can I message DJ?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '5',
        question: 'How I can forget my password?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '6',
        question: 'How to add events in favorite list?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '7',
        question: 'How I can edit my profile?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '8',
        question: 'Where I can see events near me?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '9',
        question: 'Where I can see my tickets?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '10',
        question: 'How to follow DJs?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '11',
        question: 'Can I message DJ?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '12',
        question: 'How I can forget my password?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '13',
        question: 'How to add events in favorite list?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '14',
        question: 'How I can edit my profile?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
    {
        id: '15',
        question: 'Where I can see events near me?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ipsum porttitor ut ultricies nibh urna. Nibh placerat at ut id quis.',
        isExpanded: false,
    },
];

class FaqsScreen extends Component {

    constructor(props) {
        super(props);
        this.textInputRef = createRef();
    }

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

    state = {
        search: null,
        faqsData: faqsList,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.faqs()}
                </View>
            </SafeAreaView>
        )
    }

    updateFaqs({ id }) {
        const newList = this.state.faqsData.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isExpanded: !item.isExpanded };
                return updatedItem;
            }
            return item;
        });
        this.setState({ faqsData: newList })
    }

    faqs() {
        const renderItem = ({ item }) => (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.updateFaqs({ id: item.id })}
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >
                    <View style={{ flex: 1, marginRight: Sizes.fixPadding - 5.0 }}>
                        <Text style={{ ...Fonts.blackColor16SemiBold }}>
                            {item.question}
                        </Text>
                        {
                            item.isExpanded
                                ?
                                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor14Regular }}>
                                    {item.answer}
                                </Text>
                                :
                                null
                        }
                    </View>
                    <View style={styles.arrowUpDownIconWrapStyle}>
                        <SimpleLineIcons name={item.isExpanded ? "arrow-up" : "arrow-down"} size={11} color={Colors.grayColor} />
                    </View>
                </TouchableOpacity>
                <View style={{ backgroundColor: Colors.lightGrayColor, height: 1.0, marginVertical: Sizes.fixPadding + 5.0 }} />
            </View>
        )
        return (
            <FlatList
                data={this.state.faqsData}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    header() {
        return (
            <View style={styles.headerAndTextFieldWrapStyle}>
                <View style={styles.headerWrapStyle}>
                    <MaterialIcons
                        name="arrow-back"
                        color={Colors.whiteColor}
                        size={22}
                        onPress={() => this.props.navigation.pop()}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.whiteColor20Bold }}>
                        FAQs
                    </Text>
                </View>
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
                        placeholder="Search using keywords..."
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    textFieldWrapStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding + 2.0,
    },
    headerAndTextFieldWrapStyle: {
        padding: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.primaryColor,
        borderBottomLeftRadius: Sizes.fixPadding + 5.0,
        borderBottomRightRadius: Sizes.fixPadding + 5.0,
    },
    arrowUpDownIconWrapStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

FaqsScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(FaqsScreen);