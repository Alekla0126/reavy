import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import LoadingScreen from "./components/loadingScreen";
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import { LogBox } from 'react-native';
import eventDetailScreen from "./screens/eventDetail/eventDetailScreen";
import mapViewScreen from "./screens/mapView/mapViewScreen";
import djDetailScreen from "./screens/djDetail/djDetailScreen";
import selectSeatScreen from "./screens/selectSeat/selectSeatScreen";
import selectPaymentMethodScreen from "./screens/selectPaymentMethod/selectPaymentMethodScreen";
import paymentConfirmationScreen from "./screens/paymentConfirmation/paymentConfirmationScreen";
import bookingSuccessfulScreen from "./screens/bookingSuccessful/bookingSuccessfulScreen";
import searchScreen from "./screens/search/searchScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import userDJsScreen from "./screens/userDJs/userDJsScreen";
import favoriteEventsScreen from "./screens/favoriteEvents/favoriteEventsScreen";
import termsAndConditionsScreen from "./screens/termsAndConditions/termsAndConditionsScreen";
import faqsScreen from "./screens/faqs/faqsScreen";
import splashScreen from "./screens/splashScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";
import welcomeScreen from "./screens/auth/welcomeScreen";
import loginScreen from "./screens/auth/loginScreen";
import registerScreen from "./screens/auth/registerScreen";
import verificationScreen from "./screens/auth/verificationScreen";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Splash: splashScreen,
  mainFlow: createSharedElementStackNavigator(
    {
      Onboarding: onboardingScreen,
      Welcome: welcomeScreen,
      Login: loginScreen,
      Register: registerScreen,
      Verification: verificationScreen,
      BottomTabBar: bottomTabBarScreen,
      MapView: mapViewScreen,
      EventDetail: eventDetailScreen,
      DJDetail: djDetailScreen,
      SelectSeat: selectSeatScreen,
      SelectPaymentMethod: selectPaymentMethodScreen,
      PaymentConfirmation: paymentConfirmationScreen,
      BookingSuccessful: bookingSuccessfulScreen,
      Search: searchScreen,
      EditProfile: editProfileScreen,
      UserDJs: userDJsScreen,
      FavoriteEvents: favoriteEventsScreen,
      TermsAndConditions: termsAndConditionsScreen,
      FAQs: faqsScreen,
    },
    {
      initialRouteName: 'BottomTabBar',
    }
  ),
},
  {
    initialRouteName: 'Loading',
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};
