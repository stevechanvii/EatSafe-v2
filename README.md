# EatSafe V2.0

The first iteration of EatSafe in https://github.com/stevechanvii/EatSafe

For version 2, we set up text recognition (by Google Machine Learning) to extract the ingredients
from product wrapping, so that can analysis the allergens.

## Getting Started

This App is proudly produced by team Hygieia

### Prerequisites

Android:
JDK 8
Android studio

iOS:
xCode

### Installing

Firstly, the environment should be setup, please refer to React Native offical site: https://facebook.github.io/react-native/docs/getting-started

Choose your environment in React Native CLI Quickstart tab, follow the insrutction and install Node, Watchman, React Native CLI, etc.


Download the code, install packages and dependencies

```
npm install
```

Go to ios folder, you may need to install pod first
```
pod install
```

Install React Native Async Storage
```
yarn add @react-native-community/async-storage
react-native link @react-native-community/async-storage
```

Run android, you need to run Android simulator first

```
react-native run-android
```

Sometime may have problems with abd (Android debug tools), be aware to change the user directory below
```
export PATH="$PATH:/Users/stevechanvii/Library/Android/sdk/platform-tools":$PATH
```

Run iOS
```
react-native run-ios
```
If your camera not working, you need to setup RNCamera https://github.com/react-native-community/react-native-camera
Highly recommend using Cocoapods (or manually), because automatic install may have conflicts in setting both camera and text recognition, if you have these kind of problems (duplicants), follow the instructions unlink automatically install below
```
react-native unlink react-native-camera
```

To use Text recognition, you also need to setup Firebase, or otherwise this app will connect my firebase, follow the instructions in https://firebase.google.com/docs/android/setup

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [React Native](https://facebook.github.io/react-native/docs/tutorial) - The app framework used
* [Text Recognition](https://firebase.google.com/docs/ml-kit/recognize-text) - Machine Learning

## Contributing

Useful Link
* React: https://reactjs.org
* React Native: https://facebook.github.io/react-native/docs/tutorial
* React Navigation: https://reactnavigation.org/en/
* React Navigation API Reference: https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle
* NativeBase: https://docs.nativebase.io
* React Native Easy Grid: https://github.com/GeekyAnts/react-native-easy-grid
* React Native Vector Icons: https://github.com/oblador/react-native-vector-icons
* React Native Camera: https://github.com/react-native-community/react-native-camera
* React Native Barcode Mask: https://github.com/shahnawaz/react-native-barcode-mask
* React Native Async Storage: https://github.com/react-native-community/react-native-async-storage
* React Native Modal Datetiem picker: https://github.com/mmazzarolo/react-native-modal-datetime-picker/blob/master/README.md
* React Native Floating Action: https://github.com/santomegonzalo/react-native-floating-action#readme
* Flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
* Google Machine Learning (Text Recognition): https://firebase.google.com/docs/ml-kit/recognize-text
* Firebase: https://firebase.google.com/docs/firestore/
* String Similarity: https://github.com/aceakash/string-similarity

Guidance
* https://github.com/okgrow/react-native-copilot
* https://github.com/frichti/react-native-tips

Splash Screen
* https://github.com/fuyaode/react-native-app-intro
* https://github.com/crazycodeboy/react-native-splash-screen
* https://github.com/Jacse/react-native-app-intro-slider

3D touch
* https://github.com/jordanbyron/react-native-quick-actions

Charts
* https://github.com/wuxudong/react-native-charts-wrapper

icon
* https://stackoverflow.com/questions/34329715/how-to-add-icons-to-react-native-app





Thank you for all the communities and programmers who provide so amazing open source libraries. 

## Versioning

We use github for versioning. The first iteration of EatSafe please refer to https://github.com/stevechanvii/EatSafe For the versions available, see the [tags on this repository](https://github.com/stevechanvii/EatSafe-v2). 

## Authors

* **Danyang Chen** - *Initial work* - [GitHub](https://github.com/stevechanvii)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the Apache License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Produced by Team Hygieia (Danyang Chen, Souvic Chaki, Santash Ashok Pawar, Lili Zhou, Zizhang Ba)
* Inspiration
* Some icons from icons8 (https://icons8.com/license), read the license before using.
