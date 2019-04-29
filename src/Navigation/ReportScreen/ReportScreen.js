import React, { Component } from 'react';

// import { Text, View } from 'react-native';
import { Container, Text, Thumbnail, Header, Content, Accordion } from "native-base";
import uri from '../../assets/logo.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import Preferene from '../../Preferences/Preferences';

class reportScreen extends Component {
    static navigationOptions = {
        title: 'Report',
        
    };
    
    state = {
        afterAddNew: 0,
        data: new Date()
    }

    componentDidMount() {
        // https://github.com/react-navigation/react-navigation/issues/1617
        // https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            //  # do you update if need
            // this.getDariyResult();
            this.setState({ afterAddNew: this.state.afterAddNew + 1 });
        });
    }

    dateKeyGenerator = () => {
        const dateKey = ('' + this.state.date.getDate() + (this.state.date.getMonth() + 1) + this.state.date.getFullYear()).trim();
        return dateKey;
    }

    getDariyResult = async () => {
        // const dateKey = this.dateKeyGenerator();
        // // console.log('DiaryContent getDariyResult' + dateKey);
        // const dateKeys = [];
        // for (i = 0; i < 7; i++) {
        //     // dateKeys = this.dateKeyGenerator(new Date(this.state.date.getDate() - i));
        //     dateKeys = [3042019, 2942019, 2842019, 2742019, 2642019, 2542019, 2442019]
        //     console.log(dateKeys);
        // }
        const dateKeys = ['3042019', '2942019', '2842019', '2742019', '2642019', '2542019', '2442019'];
        let values;
        let ingredientsList = [];
        try {
            values = await AsyncStorage.multiGet(dateKeys);
            values.map(daysList => {
                if (daysList){
                    if (daysList[1]){
                        const daysData = JSON.parse(daysList[1]);
                        Preferene.Meals.map(meal => {
                            if (meal in daysData) {
                                console.log(daysData[meal]);
                                Object.entries(daysData[meal]).forEach(([key, val]) => {
                                    console.log(val);
                                    ingredientsList.push(val['ingredients']);
                                });
                                
                            }
                        });
                    }
                }
            });
        } catch (e) {
            // read error
            console.log(e);
        }

        console.log(ingredientsList);
    }

    render() {
        this.getDariyResult();
        return (
            <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Thumbnail large source={uri} />
                <Text style={{ color: "black", fontSize: 24, fontWeight: "bold" }}>Report</Text>
                <Text style={{ color: "black", fontSize: 18 }}>Coming Soon</Text>
            </Container>
        );
    }
}

export default reportScreen;