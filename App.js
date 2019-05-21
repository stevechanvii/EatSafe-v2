import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import DetailsScreen from './src/Navigation/DetailsScreen';
import DiaryScreen from './src/Navigation/DiaryScreen/DiaryScreen';
import ScannerSegScreen from './src/Navigation/ScanningScreen/ScannerSegScreen';
import ReportScreen from './src/Navigation/ReportScreen/ReportScreen';
import ProfileScreen from './src/Navigation/ProfileScreen/ProfileScreen';
import ProductDetailScreen from './src/Navigation/ScanningScreen/ProductDetailScreen';
import EditProfileScreen from './src/Navigation/ProfileScreen/EditProfileScreen';
import RecognitionResultScreen from './src/Navigation/ScanningScreen/RecognitionResultScreen';
import TextRecognitionScreen from './src/Navigation/ScanningScreen/TextRecognition';
import BarcodeScanner from './src/Navigation/ScanningScreen/BarcodeScanner';
import addDiaryScreen from './src/Navigation/DiaryScreen/AddDiaryScreen';
import knowledgeCard from './src/Navigation/ProfileScreen/KnowledgeCard';
import createDiaryScreen from './src/Navigation/ScanningScreen/CreateDairyScreen';
import ExportCSV from './src/Navigation/ProfileScreen/ExportCSV';
import ChefCard from './src/Navigation/ProfileScreen/ChefCard';
import AboutUs from './src/Navigation/ProfileScreen/AboutUs';
import AllergenSetting from './src/Navigation/ProfileScreen/AllergenSetting';

/**
 * This is the root component for EatSafe which defins four tabBar navigation (Diary, Scanner, Report, Profile),
 * screens need to be specify and can only navigate inside its stack
 *
 * Project Structure
 * -----------------
 * 
 * App.js
 * ├── DiaryScreen.js
 * │   ├── DiaryContent.js
 * │   │   └── MealConetent.js
 * │   │       └── Meal.js
 * │   └── AddDiaryScreen.js
 * │ 
 * ├── ScannerSegScreen.js
 * │   ├── BarcodeScanner.js
 * │   │   └── ProductDetailScreen.js
 * │   │       ├── ScannerResultCard.js
 * │   │       ├── LostNetwork.js
 * │   │       └── ProductNotFound.js
 * │   ├── TextRecognition.js
 * │   │   └── RecognitionResultScreen.js
 * │   └── CreateDiaryScreen.js
 * │
 * ├── ReportScreen.js
 * │   ├── WeeklyReport.js
 * │   ├── MonthlyReport.js
 * │   └── YearlyReport.js
 * │
 * └── ProfileScreen.js
 *     ├── EditProfileScreen.js
 *     ├── AllergenSetting.js
 *     ├── KnowledgeCard.js
 *     ├── AboutUs.js
 *     ├── ChefCard.js
 *     └── ExportCSV.js
 */
const DiaryStack = createStackNavigator({
  Diary: { screen: DiaryScreen },
  Details: { screen: DetailsScreen },
  AddDairy: { screen: addDiaryScreen },
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen },
  EditProfile: { screen: EditProfileScreen },
  KnowledgeCard: { screen: knowledgeCard },
  ExportCSV: { screen: ExportCSV },
  ChefCard: { screen: ChefCard },
  AboutUs: { screen: AboutUs },
  AllergenSetting: { screen: AllergenSetting },
});

const ScanningStack = createStackNavigator({
  Scanning: { screen: ScannerSegScreen },
  RecognitionResult: { screen: RecognitionResultScreen },
  ProductDetail: { screen: ProductDetailScreen },
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
    // define icons and color when activated
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
