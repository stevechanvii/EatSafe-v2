import React, { Component } from 'react';

import { Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Text, Item, Content, Card, CardItem, Body, Label, H3, Icon, ListItem } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
import Preference from '../../Preferences/Preferences';
import Header from '../../Components/Header';
import defaultAllergens from '../../Preferences/IntoleranceMap'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

class reportScreen extends Component {
    static navigationOptions = {
        herder: null,
    };

    state = {
        afterAddNew: 0,
        today: new Date(),
        ingredweight: {},
        feelTrend: {},
        contributionData: [],
        quarterRange: [],
        symptomData: []
    }
    componentDidMount() {
        this.getDariyResult();
        this.setState({ quarterRange: this.getQuarter() });
    }

    getQuarter(d) {
        var now = d || new Date();
        var quarter = Math.floor((now.getMonth() / 3));
        var firstDate = new Date(now.getFullYear(), quarter * 3, 1);
        var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
        return ["", monthNames[firstDate.getMonth()], firstDate.getFullYear(), monthNames[endDate.getMonth()], ""];
    }

    shiftQuarter(m) {
        var now = new Date(this.state.quarterRange[2], monthNames.indexOf(this.state.quarterRange[1]), 15);
        var now = new Date(now.getFullYear(), now.getMonth() + m, 15);
        this.setState({ quarterRange: this.getQuarter(now) });
    }

    quarterEndCount(q) {
        endDate = new Date(q[2], monthNames.indexOf(q[3]) + 1, 0);
        numDays = new Date(q[2], monthNames.indexOf(q[1]) + 1, 0).getDate() + new Date(q[2], monthNames.indexOf(q[1]) + 2, 0).getDate() + new Date(q[2], monthNames.indexOf(q[1]) + 3, 0).getDate();
        return [endDate, numDays];
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getDariyResult = async () => {
        const dateKeys = await AsyncStorage.getAllKeys();
        let values;
        let ingredientsList = [];
        let feelscorelist = [];
        let dailyFeel = {};
        let symptoms = []

        dateKeys.map(day => (dailyFeel[day] = 0));



        try {
            values = await AsyncStorage.multiGet(dateKeys);
            values.map(daysList => {
                if (daysList) {
                    if (daysList[1]) {
                        let minFeel = 5;
                        const daysData = JSON.parse(daysList[1]);
                        Preference.Meals.map(meal => {
                            if (meal in daysData) {
                                Object.entries(daysData[meal]).forEach(([key, val]) => {
                                    console.log(val);
                                    ingredientsList.push(val['ingredients']);
                                    symptoms.push(val['symptom']);
                                    feelscorelist.push(Preference.FeelingRate[val['feel']])
                                    Preference.FeelingRate[val['feel']] < minFeel ? minFeel = Preference.FeelingRate[val['feel']] : null;
                                });

                            }
                        });
                        dailyFeel[JSON.parse(daysList[0])] = minFeel;
                    }
                }
            });
        } catch (e) {
            // read error
            console.log(e);
        }

        console.log(symptoms);

        ingredientsList = ingredientsList.map(function (x) { return x.toLowerCase() });

        let IngredOccur = {}

        ingredientsList.map(x => (x.split(",").map(y => (IngredOccur[y.trim()] ? IngredOccur[y.trim()] += 1 : IngredOccur[y.trim()] = 1))));

        let IngredFeel = {};
        for (var key in IngredOccur) {
            IngredFeel[key] = IngredOccur[key];
        }

        Object.keys(IngredFeel).map(x => (IngredFeel[x] = 0));

        Object.keys(IngredOccur).forEach(elem => {
            for (let i = 0; i < ingredientsList.length; i++) {
                for (let j = 0; j < ingredientsList[i].split(",").length; j++) {
                    if (ingredientsList[i].split(",")[j].trim() === elem) {
                        IngredFeel[elem] += feelscorelist[i];
                    }
                }
            }
        });


        let ingredweight = {};
        for (var key in IngredOccur) {
            ingredweight[key] = IngredOccur[key];
        }

        Object.keys(ingredweight).map(x => (ingredweight[x] = 0));

        Object.keys(ingredweight).map(x => (ingredweight[x] = IngredFeel[x] / IngredOccur[x]))

        Object.keys(IngredOccur).map(x => (IngredOccur[x] < 3 & x in ingredweight ? delete ingredweight[x] : null));

        // console.log(ingredweight)
        this.setState({ ingredweight: ingredweight });

        let feelTrend = {};

        Object.keys(dailyFeel).map(x => (dailyFeel[x] ? feelTrend[x.substring(0, 4) + '-' + x.substring(4, 6) + '-' + x.substring(6, 8)] = dailyFeel[x] : null));

        this.setState({ feelTrend: feelTrend });

        console.log(this.state.feelTrend);

        let contributionData = [];
        let tempdict = { 'date': '', 'count': 0 };

        for (var key in feelTrend) {
            contributionData.push({ 'date': key, 'count': 6 - feelTrend[key] });
        }

        console.log(contributionData);

        this.setState({ contributionData: contributionData });
        console.log('-----');

        symsCount = {}

        symptoms.map(x => (x in symsCount ? symsCount[x] += 1 : symsCount[x] = 1))

        console.log(symsCount);

        symData = []

        for (var key in symsCount) {
            symData.push({ 'name': key, 'count': symsCount[key], 'color': this.getRandomColor(), 'legendFontColor': '#7F7F7F', 'legendFontSize': 15 });
        }
        console.log(symData);

        this.setState({ symptomData: symData });

        console.log('-----');
    }

    render() {
        const height = 220;
        let avoidIngred = [];
        let rankValue = [];
        Object.keys(this.state.ingredweight).map(x => (this.state.ingredweight[x] <= 2 ? rankValue.push(this.state.ingredweight[x]) : null));
        rankValue.sort();
        console.log(rankValue);
        rankValue.map(x => (Object.keys(this.state.ingredweight).map(y => (this.state.ingredweight[y] == x & !avoidIngred.includes(y) ? avoidIngred.push(y) : null))));
        console.log(avoidIngred);
        console.log("this one");
        let feelData = [];
        Object.keys(this.state.feelTrend).map(x => (feelData.push(this.state.feelTrend[x])));
        console.log(feelData);
        let feelLabel = [];
        Object.keys(this.state.feelTrend).map(x => (feelLabel.push(parseInt(x.toString().substr(x.length - 2)))));
        console.log(feelLabel);

        let intol = [];
        Object.keys(defaultAllergens).map(el => (avoidIngred.map(ing => (defaultAllergens[el].includes(ing) & !intol.includes(el) ? intol.push(el) : null))));

        const screenWidth = Dimensions.get('window').width * 0.9;

        const chartConfig = {
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        };

        const graphStyle = StyleSheet.create({
            margin: 8,
            borderRadius: 16
        });
        return (
            <Container>
                <Header title='Report' />
                <Content showsVerticalScrollIndicator={false}>
                    <Card style={styles.card}>
                        <H3 style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>Ingredients to avoid</H3>
                        <CardItem style={styles.cardItem}>
                            {avoidIngred.map(el => (
                                <Item key={Math.random()} rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', paddingHorizontal: 10 }}>{el}</Text>
                                </Item>
                            ))}
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <H3 style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>Possible Intolerances</H3>
                        <CardItem style={styles.cardItem}>
                            {/* <WeeklyReport feelData={feelData} feelLabel={feelLabel} /> */}
                            {intol.map(el => (
                                <Item key={Math.random()} rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', paddingHorizontal: 10 }}>{el}</Text>
                                </Item>
                            ))}
                        </CardItem>
                        <Text style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>Consult a doctor to confirm</Text>
                    </Card>
                    <Card style={styles.card}>
                        <H3 style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>Quarterly Feel Trend</H3>
                        <CardItem style={styles.cardItem}>
                            <Item rounded style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FA7921' }}>
                                <TouchableOpacity onPress={() => this.shiftQuarter(-3)}>
                                    <Icon name='arrow-dropleft-circle' size={50} />
                                </TouchableOpacity>
                                <Text style={{ color: 'white' }}>{this.state.quarterRange.join(" ")}</Text>
                                <TouchableOpacity onPress={() => this.shiftQuarter(3)}>
                                    <Icon name='arrow-dropright-circle' size={50} />
                                </TouchableOpacity>
                            </Item>
                        </CardItem>
                        <CardItem style={styles.cardItem}>
                            <ContributionGraph
                                values={this.state.contributionData}
                                width={screenWidth}
                                height={height}
                                endDate={this.quarterEndCount(this.state.quarterRange)[0]}
                                numDays={this.quarterEndCount(this.state.quarterRange)[1]}
                                chartConfig={chartConfig}
                                style={graphStyle}
                            />
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem style={styles.cardItem}>
                            <Text style={styles.cardTitle}>Symptoms Distribution</Text>
                        </CardItem>
                        <CardItem style={styles.cardItem}>
                                <PieChart
                                    data={this.state.symptomData}
                                    width={screenWidth}
                                    height={220}
                                    chartConfig={chartConfig}
                                    accessor="count"
                                    backgroundColor="transparent"
                                    paddingLeft="15"
                                    absolute
                                />
                        </CardItem>
                    </Card>
                </Content>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardItem: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 10,
        borderRadius: 10,
        flexWrap: 'wrap'
    },
    chartView: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        // borderRadius: 10,
        overflow: 'hidden',
    },
    cardTitle: {
        margin: 10,
        fontSize: 20,
    }
});

export default reportScreen;