import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Title, Content, Button, Left, Item, Form, Picker, H3, Right, View, Body, Header, Icon } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Kohana } from 'react-native-textinput-effects';
import DateKeyGenerator from '../../Utils/DateKeyGenerator';
import Theme from '../../Styles/Theme';
import Preference from '../../Preferences/Preferences';

class addDiaryScreen extends Component {
    // static navigationOptions = {
    //     title: 'Create Diary',
    // };
    static navigationOptions = {
        header: null
    }

    state = {
        symptomSelected: "Feeling Well",
        mealSelected: "Breakfast",
        emotionSelected: 'Good',
        isDateTimePickerVisible: false,
        date: this.props.navigation.state.params.date,
        food: '',
        ingredients: '',
        comments: ''
    };

    // symptom picker
    onSymptomChange = (value) => {
        this.setState({
            symptomSelected: value
        });
    }

    // meal picker
    onMealChange = (value) => {
        this.setState({
            mealSelected: value
        });
    }

    // change emotion id
    emotionSelectedHandler = value => {
        this.setState({ emotionSelected: value });
    }

    // date picker
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = time => {
        this.setState({ date: new Date(this.state.date.setTime(time.getTime())) });
        console.log("new state time: ", this.state.date);
        this.hideDateTimePicker();
    };

    /*
     * data structure
     * {'2642019': [{'Breakfast': [{0.1545: [{'time': date}, {'feel': 'Good'},{'food': 'bread'}, {'ingredients': 'wheat'}, {'symptoms': 'nothing wrong'}, {'comments': 'Good'}]},
     *                             {0.5454: [{'time': date}, {'feel': 'Alful'},{'food': 'milk'}, {'ingredients': 'milk'}, {'symptoms': 'itching skin'}, {'comments': 'allergy'}]}
     *                            ]
     *           }
     *           {'Lunch': [{0.45745: [{'time': date}, {'feel': 'Good'},{'food': 'chocolate'}, {'ingredients': 'milk coco sugur'}, {'symptoms': 'nothing wrong'}, {'comments': 'Good'}]},
     *                      {0.48874: [{'time': date}, {'feel': 'Execlent'},{'food': 'pasta'}, {'ingredients': 'gluteen'}, {'symptoms': 'nothing wrong'}, {'comments': ''}]}
     *                         ]
     *           }
     *          ]
     * }
     */

    // date key used by save and retrive data, eg. 10 May 2019 -> 1052019, 10 Dec 2019 -> 10122019
    dateKeyGenerator = () => {
        const dateKey = ('' + this.state.date.getDate() + (this.state.date.getMonth() + 1) + this.state.date.getFullYear()).trim();
        return dateKey;
    }

    saveBtnHandler = async () => {
        console.log(this.state);
        const dateKey = this.dateKeyGenerator();

        const saveObj = {
            time: JSON.stringify(this.state.date),
            feel: this.state.emotionSelected,
            food: this.state.food,
            ingredients: this.state.ingredients,
            symptom: this.state.symptomSelected,
            comments: this.state.comments
        }

        // this obj will be saved in database
        const obj = {
            [this.state.mealSelected]: {
                [Math.random()]: saveObj
            }
        }

        try {
            await AsyncStorage.getItem(dateKey).then(meals => {
                // check meals is null, if is null create new obj and save
                if (meals !== null) {
                    // use mergeItem if the meal exist
                    console.log('have meals!');
                    try {
                        AsyncStorage.mergeItem(dateKey, JSON.stringify(obj));
                    } catch (e) {
                        console.log(e + ' 2');
                    }
                } else {
                    // create new object and save
                    try {
                        AsyncStorage.setItem(dateKey, JSON.stringify(obj));
                    } catch (e) {
                        console.log(e + ' 3');
                    }
                }
            });
        } catch (e) {
            console.log(e + ' 1');
        }

        try {
            const value = await AsyncStorage.getItem(dateKey);
        } catch (e) {
            // read error
        }

        this.props.navigation.goBack();
    };

    getMeals = async () => {
        const dateKey = this.dateKeyGenerator();
        try {
            const value = await AsyncStorage.getItem(dateKey);
        } catch (e) {
            // read error
        }

    }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor={Theme.headerBar.backgroundColor} style={Theme.headerBar} >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" style={Theme.back} />
                            <Text style={Theme.back}>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Diary</Title>
                    </Body>
                    <Right />
                </Header>
                {/* <Content contentContainerStyle={{ flex: 1 }}> */}
                <Content>
                    <Grid style={Theme.body} >
                        <Row size={3} > 
                            <Grid style={styles.headRow}>
                                <Row size={1} style={{ alignItems: 'center', justifyContent: 'center', margin: 15 }} >
                                    <H3>How do you feel after the meal?</H3>
                                </Row>
                                <Row size={2} style={styles.emotionRow}>
                                {/* https://icons8.com/icon/pack/messaging/ios */}
                                    <TouchableOpacity onPress={() => this.emotionSelectedHandler('Excellent')} >
                                        <MaterialCommunityIcons
                                            name='emoticon-cool-outline'
                                            size={50}
                                            style={styles.emotion}
                                            color={this.state.emotionSelected === 'Excellent' ? '#DD9E2C' : '#333745'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.emotionSelectedHandler('Good')} >
                                        <MaterialCommunityIcons
                                            name='emoticon-happy-outline'
                                            size={50}
                                            style={styles.emotion}
                                            color={this.state.emotionSelected === 'Good' ? '#DD9E2C' : '#333745'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.emotionSelectedHandler('So So')} >
                                        <MaterialCommunityIcons
                                            name='emoticon-neutral-outline'
                                            size={50}
                                            style={styles.emotion}
                                            color={this.state.emotionSelected === 'So So' ? '#DD9E2C' : '#333745'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.emotionSelectedHandler('Not Well')} >
                                        <MaterialCommunityIcons
                                            name='emoticon-sad-outline'
                                            size={50}
                                            style={styles.emotion}
                                            color={this.state.emotionSelected === 'Not Well' ? '#DD9E2C' : '#333745'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.emotionSelectedHandler('Awful')} >
                                        <MaterialCommunityIcons
                                            name='emoticon-poop'
                                            size={50}
                                            style={styles.emotion}
                                            color={this.state.emotionSelected === 'Awful' ? '#DD9E2C' : '#333745'} />
                                    </TouchableOpacity>
                                </Row>
                                <Row size={1} style={{ alignItems: 'center', justifyContent: 'center', margin: 15 }} >
                                    <H3>{this.state.emotionSelected}</H3>
                                </Row>
                            </Grid>
                        </Row>
                        <Row size={7} >
                            {/* <Grid style={{ backgroundColor: '#b792a6' }}> */}
                            <Grid>
                                <Form style={styles.card2}>
                                    <TouchableOpacity
                                        onPress={this.showDateTimePicker}>
                                        <View style={styles.timePicker}>
                                            <MaterialIcons name='access-time' size={20} />
                                            <Text style={{ color: "black", marginLeft: 5 }}>
                                                {this.state.date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
                                            </Text>
                                            <Text style={{ color: "black", marginLeft: 5 }}>
                                                {this.state.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <DateTimePicker
                                        isVisible={this.state.isDateTimePickerVisible}
                                        onConfirm={this.handleDatePicked}
                                        onCancel={this.hideDateTimePicker}
                                        minuteInterval={5}
                                        maximumDate={new Date()}
                                        mode='time'
                                        titleIOS='Pick a Time'
                                        date={this.state.date}
                                    />

                                    <Item picker style={styles.inputItem} >
                                        <MaterialCommunityIcons name='cupcake' size={30} color='#f4d29a' style={{ paddingLeft: 16 }} />
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<MaterialIcons name="expand-more" size={40} />}
                                            style={{ width: '75%' }}
                                            placeholder="Select your Meal"
                                            iosHeader="Meal"
                                            placeholderStyle={{ color: "#91627b", maxWidth: '100%' }}
                                            placeholderIconColor="#f4d29a"
                                            textStyle={{ color: "#91627b", fontSize: 18, fontWeight: 'bold', maxWidth: '100%' }}
                                            selectedValue={this.state.mealSelected}
                                            onValueChange={this.onMealChange.bind(this)}>
                                            {Preference.Meals.map(el => (<Picker.Item key={Math.random()} label={el} value={el} />))}
                                        </Picker>
                                    </Item>

                                    <Item picker style={styles.inputItem} >
                                        <MaterialCommunityIcons name='do-not-disturb' size={30} color='#f4d29a' style={{ paddingLeft: 16 }} />
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<MaterialIcons name="expand-more" size={40} />}
                                            style={{ width: '75%' }}
                                            placeholder="Select your Symptoms"
                                            iosHeader="Symptoms"
                                            placeholderStyle={{ color: "#91627b", maxWidth: '100%' }}
                                            placeholderIconColor="#f4d29a"
                                            textStyle={{ color: "#91627b", fontSize: 18, fontWeight: 'bold', maxWidth: '100%' }}
                                            selectedValue={this.state.symptomSelected}
                                            onValueChange={this.onSymptomChange.bind(this)}
                                        >
                                            <Picker.Item label="Feeling Well" value="Feeling Well" />
                                            <Picker.Item label="Itching Skin" value="Itching Skin" />
                                            <Picker.Item label="Running Nose" value="Running Nose" />
                                            <Picker.Item label="Breath Difficuties" value="Breath Difficuties" />
                                        </Picker>
                                    </Item>
                                    <Kohana
                                        style={[styles.input, { backgroundColor: '#f9f5ed' }]}
                                        label={'Food Name'}
                                        iconClass={MaterialIcons}
                                        iconName={'restaurant'}
                                        iconColor={'#f4d29a'}
                                        iconSize={30}
                                        labelStyle={{ color: '#91627b' }}
                                        inputStyle={{ color: '#91627b', paddingLeft: 0 }}
                                        // multiline={true}
                                        onChangeText={(text) => this.setState({ food: text })}
                                        useNativeDriver
                                    />
                                    <Kohana
                                        style={[styles.input, { backgroundColor: '#f9f5ed' }]}
                                        label={'Ingredients'}
                                        iconClass={MaterialIcons}
                                        iconName={'mode-edit'}
                                        iconColor={'#f4d29a'}
                                        iconSize={30}
                                        labelStyle={{ color: '#91627b' }}
                                        inputStyle={{ color: '#91627b', paddingLeft: 0 }}
                                        onChangeText={(text) => this.setState({ ingredients: text })}
                                        useNativeDriver
                                    />
                                    <Kohana
                                        style={[styles.input, { backgroundColor: '#f9f5ed' }]}
                                        label={'Comments'}
                                        iconClass={MaterialIcons}
                                        iconName={'comment'}
                                        iconSize={30}
                                        iconColor={'#f4d29a'}
                                        labelStyle={{ color: '#91627b' }}
                                        inputStyle={{ color: '#91627b', paddingLeft: 0 }}
                                        onChangeText={(text) => this.setState({ comments: text })}
                                        useNativeDriver
                                    />
                                    <Button info style={{ padding: '10%', alignSelf: 'center', margin: 20 }} onPress={this.saveBtnHandler} >
                                        <Text>Create</Text>
                                    </Button>
                                </Form>
                            </Grid>
                        </Row>
                    </Grid>
                </Content>
            </Container >
        );
    };

};

const styles = StyleSheet.create({
    inputItem: {
        // margin: 5,
        backgroundColor: '#f9f5ed',
        marginTop: 4,
        marginLeft: 0,

    },
    headRow: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#E63462'
    },
    emotionRow: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    emotion: {
        marginHorizontal: '2%',
    },
    picker: {
        marginHorizontal: '3%',
        marginTop: '3%',
    },
    timePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        margin: 10,
    },
    card2: {
        padding: 16,
        flex: 1,
    },
    input: {
        marginTop: 4,
    },
});

export default addDiaryScreen;