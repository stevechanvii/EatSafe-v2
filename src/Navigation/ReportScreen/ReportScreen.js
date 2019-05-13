import React, { Component } from 'react';

// import { Text, View } from 'react-native';
import { Container, Text, Thumbnail, Header, Content, Tab, Tabs, Body, Title } from "native-base";
import uri from '../../assets/logo.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import Preferene from '../../Preferences/Preferences';
import KeyGenerator from '../../Utils/KeyGenerator';
import WeeklyReport from './WeeklyReport';

class reportScreen extends Component {
    static navigationOptions = {
        title: 'Report',

    };

    state = {
        afterAddNew: 0,
        data: new Date(),
        ingredientObj: {}
    }

    // componentDidMount() {
    //     // https://github.com/react-navigation/react-navigation/issues/1617
    //     // https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle
    //     this._subscribe = this.props.navigation.addListener('didFocus', () => {
    //         //  # do you update if need
    //         // this.getDariyResult();
    //         this.setState({ afterAddNew: this.state.afterAddNew + 1 });
    //         this.getDariyResult();
    //         // console.log('componentDidMount in ReportScreen');
    //     });
    // }

    componentDidMount() {
        this.getDariyResult();
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
        const dateKeys = KeyGenerator.monthKeyGenerator(5, 2019);
        let values;
        let ingredientsList = [];
        try {
            values = await AsyncStorage.multiGet(dateKeys);
            values.map(daysList => {
                if (daysList) {
                    if (daysList[1]) {
                        const daysData = JSON.parse(daysList[1]);
                        Preferene.Meals.map(meal => {
                            if (meal in daysData) {
                                // console.log(daysData[meal]);
                                Object.entries(daysData[meal]).forEach(([key, val]) => {
                                    // console.log(val);
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

        // console.log(ingredientsList);

        ingredientObj = {};
        ingredientsList.map(ingredient => {
            if (ingredient in ingredientObj) {
                ingredientObj[ingredient] = ingredientObj[ingredient] + 1;
            } else {
                ingredientObj[ingredient] = 1;
            }
        });

        // console.log(ingredientObj);
        this.setState({ ingredientObj: ingredientObj });
        // console.log('hellllllllo');

    }

    render() {
        console.log('report'); 
        const reportList = [];
        Object.entries(this.state.ingredientObj).forEach(([key, val]) => {
            reportList.push(<Text key={Math.random()} >{key} appears {val} times</Text>);
        });
        return (
            <Container>
                <Header hasTabs>
                    <Body>
                        <Title>Report</Title>
                    </Body>
                </Header>
                <Tabs>
                    {console.log('1')}
                    <Tab heading="Daily" style={{ alignItems: 'center', justifyContent: 'center' }}>
                        {/* <Thumbnail large source={uri} />
                        <Text style={{ color: "black", fontSize: 24, fontWeight: "bold" }}>Report</Text> */}
                        {/* <Text style={{ color: "black", fontSize: 18 }}>Coming Soon</Text> */}
                        {console.log(reportList)}
                        {reportList}
                        <WeeklyReport />
                        {console.log('3')}
                        
                    </Tab>
                    <Tab heading="Monthly">
                        <Text>Tab 2</Text>
                    </Tab>
                    <Tab heading="Yearly">
                        <Text>Tab 3</Text>
                    </Tab>
                </Tabs>


            </Container>
        );
    }
}

export default reportScreen;