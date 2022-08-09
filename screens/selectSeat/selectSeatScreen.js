import React, { Component } from "react";
import { BackHandler, SafeAreaView, View, StatusBar, StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from "react-navigation-stack";

const seatsArrangmentList = [
    {
        id: 'A',
        left: [
            {
                id: 'A1',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'A2',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'A3',
                available: false,
            },
            {
                id: 'A4',
                available: false,
            }
        ],
        right: [
            {
                id: 'A5',
                available: false,
            },
            {
                id: 'A6',
                available: false,
            },
            {
                id: 'A7',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'A8',
                available: true,
                isYourSeat: false,
            }
        ],
    },
    {
        id: 'B',
        left: [
            {
                id: 'B1',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'B2',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'B3',
                available: false,
            },
            {
                id: 'B4',
                available: false,
            }
        ],
        right: [
            {
                id: 'B5',
                available: true,
                isYourSeat: true,
            },
            {
                id: 'B6',
                available: true,
                isYourSeat: true,
            },
            {
                id: 'B7',
                available: true,
                isYourSeat: true,
            },
            {
                id: 'B8',
                available: true,
                isYourSeat: true,
            }
        ],
    },
    {
        id: 'C',
        left: [
            {
                id: 'C1',
                available: false,
            },
            {
                id: 'C2',
                available: false,
            },
            {
                id: 'C3',
                available: false,
            },
            {
                id: 'C4',
                available: false,
            }
        ],
        right: [
            {
                id: 'C5',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'C6',
                available: false,
            },
            {
                id: 'C7',
                available: false,
            },
            {
                id: 'C8',
                available: false,
            }
        ],
    },
    {
        id: 'D',
        left: [
            {
                id: 'D1',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'D2',
                available: false,
            },
            {
                id: 'D3',
                available: false,
            },
            {
                id: 'D4',
                available: true,
                isYourSeat: false,
            }
        ],
        right: [
            {
                id: 'D5',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'D6',
                available: false,
            },
            {
                id: 'D7',
                available: false,
            },
            {
                id: 'D8',
                available: true,
                isYourSeat: false,
            }
        ],
    },
    {
        id: 'E',
        left: [
            {
                id: 'E1',
                available: false,
            },
            {
                id: 'E2',
                available: false,
            },
            {
                id: 'E3',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'E4',
                available: true,
                isYourSeat: false,
            },
        ],
        right: [
            {
                id: 'E5',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'E6',
                available: false,
            },
            {
                id: 'E7',
                available: false,
            },
            {
                id: 'E8',
                available: true,
                isYourSeat: false,
            }
        ],
    },
    {
        id: 'F',
        left: [
            {
                id: 'F1',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'F2',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'F3',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'F4',
                available: true,
                isYourSeat: false,
            }
        ],
        right: [
            {
                id: 'F5',
                available: false,
            },
            {
                id: 'F6',
                available: false,
            },
            {
                id: 'F7',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'F8',
                available: true,
                isYourSeat: false,
            }
        ],
    },
    {
        id: 'G',
        left: [
            {
                id: 'G1',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'G2',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'G3',
                available: false,
            },
            {
                id: 'G4',
                available: false,
            }
        ],
        right: [
            {
                id: 'G5',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'G6',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'G7',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'G8',
                available: true,
                isYourSeat: false,
            }
        ],
    },
    {
        id: 'H',
        left: [
            {
                id: 'H1',
                available: false,
            },
            {
                id: 'H2',
                available: false,
            },
            {
                id: 'H3',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'H4',
                available: true,
                isYourSeat: false,
            },
        ],
        right: [
            {
                id: 'H5',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'H6',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'H7',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'H8',
                available: true,
                isYourSeat: false,
            },
        ],
    },
    {
        id: 'I',
        left: [
            {
                id: 'I1',
                available: false,
            },
            {
                id: 'I2',
                available: false,
            },
            {
                id: 'I3',
                available: false,
            },
            {
                id: 'I4',
                available: false,
            }
        ],
        right: [
            {
                id: 'I5',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'I6',
                available: false,
            },
            {
                id: 'I7',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'I8',
                available: true,
                isYourSeat: false,
            }
        ],
    },
    {
        id: 'J',
        left: [
            {
                id: 'J1',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'J2',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'J3',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'J4',
                available: false,
            },
        ],
        right: [
            {
                id: 'J5',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'J6',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'J7',
                available: false,
            },
            {
                id: 'J8',
                available: false,
            }
        ],
    },
    {
        id: 'K',
        left: [
            {
                id: 'K1',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'K2',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'K3',
                available: false,
            },
            {
                id: 'K4',
                available: false,
            }
        ],
        right: [
            {
                id: 'K5',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'K6',
                available: false,
            },
            {
                id: 'K7',
                available: false,
            },
            {
                id: 'K8',
                available: true,
                isYourSeat: false,
            }
        ],
    },
    {
        id: 'L',
        left: [
            {
                id: 'L1',
                available: false,
            },
            {
                id: 'L2',
                available: false,
            },
            {
                id: 'L3',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'L4',
                available: true,
                isYourSeat: false,
            },
        ],
        right: [
            {
                id: 'L5',
                available: false,
            },
            {
                id: 'L6',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'L7',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'L8',
                available: true,
                isYourSeat: false,
            }
        ],
    },
    {
        id: 'M',
        left: [
            {
                id: 'M1',
                available: false,
            },
            {
                id: 'M2',
                available: false,
            },
            {
                id: 'M3',
                available: false,
            },
            {
                id: 'M4',
                available: true,
                isYourSeat: false,
            },
        ],
        right: [
            {
                id: 'M5',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'M6',
                available: false,
            },
            {
                id: 'M7',
                available: false,
            },
            {
                id: 'M8',
                available: false,
            }
        ],
    },
    {
        id: 'N',
        left: [
            {
                id: 'N1',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'N2',
                available: false,
            },
            {
                id: 'N3',
                available: false,
            },
            {
                id: 'N4',
                available: true,
                isYourSeat: false,
            },
        ],
        right: [
            {
                id: 'N5',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'N6',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'N7',
                available: false,
            },
            {
                id: 'N8',
                available: false,
            }
        ],
    },
    {
        id: 'O',
        left: [
            {
                id: 'O1',
                available: false,
            },
            {
                id: 'O2',
                available: false,
            },
            {
                id: 'O3',
                available: false,
            },
            {
                id: 'O4',
                available: false,
            },
        ],
        right: [
            {
                id: 'O5',
                available: false,
            },
            {
                id: 'O6',
                available: false,
            },
            {
                id: 'O7',
                available: true,
                isYourSeat: false,
            },
            {
                id: 'O8',
                available: true,
                isYourSeat: false,
            }
        ],
    },
];

class SelectSeatScreen extends Component {

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

    state = {
        seatArrangements: seatsArrangmentList,
        totalUserSeat: null,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.seatInfo()}
                    {this.bookNowButton()}
                </View>
            </SafeAreaView>
        )
    }

    bookNowButton() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.push('SelectPaymentMethod')}
                    style={styles.bookNowButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18ExtraBold }}>
                        Book Now
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    getTotalUserSeat() {
        var total = 0;
        this.state.seatArrangements.map((item) => {
            const leftSeats = item.left.filter((seat) => seat.isYourSeat == true).length;
            const rightSeats = item.right.filter((seat) => seat.isYourSeat == true).length;
            total = total + leftSeats + rightSeats;
        })
        return total;
    }

    updateSeatArrangement({ itemId, seatId }) {
        const newList = this.state.seatArrangements.map((item) => {
            if (item.id === itemId) {
                const rightList = item.right.map((seat) => {
                    if (seat.id === seatId) {
                        const updatedItem = { ...seat, isYourSeat: !seat.isYourSeat };
                        return updatedItem;
                    }
                    return seat;
                })

                const leftList = item.left.map((seat) => {
                    if (seat.id === seatId) {
                        const updatedItem = { ...seat, isYourSeat: !seat.isYourSeat };
                        return updatedItem;
                    }
                    return seat;
                })

                const updatedItem = { ...item, right: rightList, left: leftList };
                return updatedItem;
            }
            return item;
        });
        this.setState({ seatArrangements: newList })
    }

    seatInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.seatArrangementsWrapStyle}>
                <View style={{ marginRight: Sizes.fixPadding * 3.5, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    {item.left.map((seat) => (
                        <View key={seat.id}>
                            <MaterialIcons
                                name="airline-seat-recline-normal"
                                size={26}
                                color={seat.available ? (seat.isYourSeat ? Colors.primaryColor : Colors.greenColor) : Colors.grayColor}
                                onPress={() => seat.available ? this.updateSeatArrangement({ itemId: item.id, seatId: seat.id }) : null}
                            />
                        </View>
                    ))}
                </View>
                <View style={{ marginLeft: Sizes.fixPadding * 3.5, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {item.right.map((seat) => (
                        <View key={seat.id}>
                            <MaterialIcons
                                name="airline-seat-recline-normal"
                                size={26}
                                color={seat.available ? (seat.isYourSeat ? Colors.primaryColor : Colors.greenColor) : Colors.grayColor}
                                onPress={() => seat.available ? this.updateSeatArrangement({ itemId: item.id, seatId: seat.id }) : null}
                            />
                        </View>
                    ))}
                </View>
            </View>
        )
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flex: 1, }}>
                <FlatList
                    ListHeaderComponent={
                        <View style={{ marginBottom: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {this.seatOptionsInfoSort({ lable: 'Available', indicatorColor: Colors.greenColor })}
                            {this.seatOptionsInfoSort({ lable: 'Taken', indicatorColor: '#B7B7B7' })}
                            {this.seatOptionsInfoSort({ lable: 'Your Seats', indicatorColor: Colors.primaryColor })}
                        </View>
                    }
                    data={this.state.seatArrangements}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    ListFooterComponent={
                        <Text style={{ marginTop: Sizes.fixPadding * 3.0, textAlign: 'center', ...Fonts.blackColor20Bold }}>
                            {this.getTotalUserSeat()} Seats • $520.00
                        </Text>
                    }
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0, }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    seatOptionsInfoSort({ lable, indicatorColor }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 20.0, height: 20.0, borderRadius: 10.0, backgroundColor: indicatorColor }} />
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor16SemiBold }}>
                    {lable}
                </Text>
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
                    Select Seats
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
    seatArrangementsWrapStyle: {
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bookNowButtonStyle: {
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
    }
});

SelectSeatScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(SelectSeatScreen);