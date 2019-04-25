import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Button, Input, Item, Form, Picker, H3, H2 } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmotionIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class addDiary extends Component {
    static navigationOptions = {
        title: 'Create Diary',
    };

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

    // date key used by save and retrive data
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
            console.log(value + ' Saved value');
        } catch (e) {
            // read error
        }

        this.props.navigation.goBack();
    };

    getMeals = async () => {
        const dateKey = this.dateKeyGenerator();
        try {
            const value = await AsyncStorage.getItem(dateKey);
            console.log(value + ' Saved value');
        } catch (e) {
            // read error
        }

    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row size={3} >
                        <Grid style={styles.headRow}>
                            <Row size={1} style={{ alignItems: 'center', justifyContent: 'center' }} >
                                <H2>Have a Good meal?</H2>
                            </Row>
                            <Row size={2} style={styles.emotionRow}>
                                <TouchableOpacity onPress={() => this.emotionSelectedHandler('Excellent')} >
                                    <EmotionIcon
                                        name='emoticon-cool-outline'
                                        size={50}
                                        style={styles.emotion}
                                        color={this.state.emotionSelected === 'Excellent' ? '#DD9E2C' : '#333745'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.emotionSelectedHandler('Good')} >
                                    <EmotionIcon
                                        name='emoticon-happy-outline'
                                        size={50}
                                        style={styles.emotion}
                                        color={this.state.emotionSelected === 'Good' ? '#DD9E2C' : '#333745'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.emotionSelectedHandler('So So')} >
                                    <EmotionIcon
                                        name='emoticon-neutral-outline'
                                        size={50}
                                        style={styles.emotion}
                                        color={this.state.emotionSelected === 'So So' ? '#DD9E2C' : '#333745'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.emotionSelectedHandler('Not Well')} >
                                    <EmotionIcon
                                        name='emoticon-sad-outline'
                                        size={50}
                                        style={styles.emotion}
                                        color={this.state.emotionSelected === 'Not Well' ? '#DD9E2C' : '#333745'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.emotionSelectedHandler('Awful')} >
                                    <EmotionIcon
                                        name='emoticon-poop'
                                        size={50}
                                        style={styles.emotion}
                                        color={this.state.emotionSelected === 'Awful' ? '#DD9E2C' : '#333745'} />
                                </TouchableOpacity>
                            </Row>
                            <Row size={1} style={{ alignItems: 'center', justifyContent: 'center' }} >
                                <H3>{this.state.emotionSelected}</H3>
                            </Row>
                        </Grid>
                    </Row>
                    <Row size={7} >
                        <Content>
                            <Form>
                                <Button transparent iconLeft light style={styles.inputItem}
                                    onPress={this.showDateTimePicker}>
                                    <Icon name='access-time' size={20} />
                                    <Text style={{ color: "black" }}>
                                        {this.state.date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
                                    </Text>
                                    <Text style={{ color: "black" }}>
                                        {this.state.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                                    </Text>
                                </Button>

                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                    mode='time'
                                    titleIOS='Pick a Time'
                                    date={this.state.date}
                                />

                                <Item style={styles.inputItem} >
                                    <Icon name='restaurant' size={20} />
                                    <Input placeholder='Food' onChangeText={(text) => this.setState({ food: text })} />
                                </Item>

                                <Item style={styles.inputItem} >
                                    <EmotionIcon name='cupcake' size={20} />
                                    <Picker
                                        mode="dropdown"
                                        // iosIcon={<Icon name="expand-more" />}
                                        style={{}}
                                        placeholder="Select your Meal"
                                        iosHeader="Meal"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.mealSelected}
                                        onValueChange={this.onMealChange.bind(this)}
                                    >
                                        <Picker.Item label="Breakfast" value="Breakfast" />
                                        <Picker.Item label="Brunch" value="Brunch" />
                                        <Picker.Item label="Lunch" value="Lunch" />
                                        <Picker.Item label="Afternoon Tea" value="Afternoon Tea" />
                                        <Picker.Item label="Dinner" value="Dinner" />
                                        <Picker.Item label="Midnight Snack" value="Midnight Snack" />
                                    </Picker>
                                </Item>

                                <Item style={styles.inputItem} >
                                    <Icon name='mode-edit' size={20} />
                                    <Input placeholder='Ingredients' onChangeText={(text) => this.setState({ ingredients: text })} />
                                </Item>

                                <Item style={styles.inputItem} >
                                    <Icon name='do-not-disturb' size={20} />
                                    <Picker
                                        mode="dropdown"
                                        // iosIcon={<Icon name="expand-more" />}
                                        style={{}}
                                        placeholder="Select your Symptoms"
                                        iosHeader="Symptoms"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.symptomSelected}
                                        onValueChange={this.onSymptomChange.bind(this)}
                                    >
                                        <Picker.Item label="Feeling Well" value="Feeling Well" />
                                        <Picker.Item label="Itching Skin" value="Itching Skin" />
                                        <Picker.Item label="Running Nose" value="Running Nose" />
                                        <Picker.Item label="Breath Difficuties" value="Breath Difficuties" />
                                    </Picker>
                                </Item>
                                <Item style={styles.inputItem} >
                                    <Icon name='comment' size={20} />
                                    <Input placeholder='Comments' onChangeText={(text) => this.setState({ comments: text })} />
                                </Item>
                            </Form>



                            <Button info style={{ padding: '10%', alignSelf: 'center', margin: 20 }} onPress={this.saveBtnHandler} >
                                <Text>Create</Text>
                            </Button>

                        </Content>
                    </Row>
                </Grid>

            </Container>
        );
    };

};

const styles = StyleSheet.create({
    inputItem: {
        marginHorizontal: '3%',
        marginTop: '3%',
        // width: 'auto',
        // height: 'auto',
        // backgroundColor: '#DD9E2C'
    },
    headRow: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E63462'
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
    }
});

export default addDiary;