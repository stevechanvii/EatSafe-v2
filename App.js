import React from 'react';
import { Button, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import DetailsScreen from './src/Navigation/DetailsScreen';
import DiaryScreen from './src/Navigation/DiaryScreen/DiaryScreen';
import ScannerSegScreen from './src/Navigation/ScanningScreen/ScannerSegScreen';
import ReportScreen from './src/Navigation/ReportScreen/ReportScreen';
import ProfileScreen from './src/Navigation/ProfileScreen/ProfileScreen';
import SomeWhereElseScreen from './src/Navigation/SomeWhereElseScreen';
import ProductDetailScreen from './src/Navigation/ScanningScreen/ProductDetailScreen';
import EditProfileScreen from './src/Navigation/ProfileScreen/EditProfileScreen';
import RecognitionResultScreen from './src/Navigation/ScanningScreen/RecognitionResultScreen';
import TextRecognitionScreen from './src/Navigation/ScanningScreen/TextRecognition';
import BarcodeScanner from './src/Navigation/ScanningScreen/BarcodeScanner';
import addDiaryScreen from './src/Navigation/DiaryScreen/AddDiaryScreen';
import knowledgeCard from './src/Navigation/ProfileScreen/KnowledgeCard';
import createDiaryScreen from './src/Navigation/ScanningScreen/CreateDairyScreen';
import SendEmail from './src/Navigation/ProfileScreen/SendEmail';
import ChefCard from './src/Navigation/ProfileScreen/ChefCard';
import Setting from './src/Navigation/ProfileScreen/Setting';
import AboutUs from './src/Navigation/ProfileScreen/AboutUs';

const DiaryStack = createStackNavigator({
  Diary: { screen: DiaryScreen },
  Details: { screen: DetailsScreen },
  AddDairy: { screen: addDiaryScreen },
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen },
  SomeWhereElse: { screen: SomeWhereElseScreen },
  EditProfile: { screen: EditProfileScreen },
  KnowledgeCard: { screen: knowledgeCard },

  // testing
  SendEmail: { screen: SendEmail },
  ChefCard: { screen: ChefCard },
  Setting: { screen: Setting },
  AboutUs: { screen: AboutUs },
});

const ScanningStack = createStackNavigator({
  Scanning: { screen: ScannerSegScreen },
  RecognitionResult: { screen: RecognitionResultScreen },
  ProductDetail: { screen: ProductDetailScreen },

  // testing
  CreateDairy: { screen: createDiaryScreen },
});

export default createAppContainer(createBottomTabNavigator(
  {
    Diary: { screen: DiaryStack },
    Scanning: { screen: ScanningStack },
    Report: { screen: ReportScreen },
    Profile: { screen: ProfileStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Diary') {
          iconName = `calendar-${focused ? 'edit' : 'check'}`;
        } else if (routeName === 'Scanning') {
          iconName = 'barcode-scan';
        } else if (routeName === 'Report') {
          iconName = `clipboard-text${focused ? '' : '-outline'}`
        } else if (routeName === 'Profile') {
          iconName = `account${focused ? '-alert' : ''}`
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
));
