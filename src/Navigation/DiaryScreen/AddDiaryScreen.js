import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Content, Button, Item, Form, Picker, H3, View } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Kohana } from 'react-native-textinput-effects';
import KeyGenerator from '../../Utils/KeyGenerator';
import Theme from '../../Styles/Theme';
import HeaderGoBack from '../../Components/HeaderGoBack';
import Preference from '../../Preferences/Preferences';
import EmotionSVG from '../../assets/svg/emotion_svg';

/**
 * @class addDiaryScreen is the child component of DiaryScreen which create diary by user input
 */
class addDiaryScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        emotionSelected: 'Good',
        date: this.props.navigation.state.params.date,
        mealSelected: "Lunch",
        symptomSelected: "Feeling Well",
        food: '',
        ingredients: '',
        comments: '',
        
        // date picker content 
        isDateTimePickerVisible: false,
    
        // food and ingredients empty validation
        isIngredientsEmpty: false,
        isFoodNameEmpty: false,
    };

    /**
     * @func mealSelectedByTime calculate meal type based on time
     */
    mealSelectedByTime = (time) => {

    }

    /**
     * @func onSymptomChange symptom picker
     */
    onSymptomChange = (value) => {
        this.setState({
            symptomSelected: value
        });
    }

    /**
     * @func onMealChange meal picker
     */
    onMealChange = (value) => {
        this.setState({
            mealSelected: value
        });
    }

    /**
     * @func emotionSelectedHandler change emotion id
     */
    emotionSelectedHandler = value => {
        this.setState({ emotionSelected: value });
    }

    /**
     * @func showDateTimePicker display time picker content
     */
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    /**
     * @func hideDateTimePicker hide time picker content
     */
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    /**
     * @func handleDatePicked get new time from user select and update state
     */
    handleDatePicked = time => {
        this.setState({ date: new Date(this.state.date.setTime(time.getTime())) });
        this.hideDateTimePicker();
    };

    /**
     * @func saveBtnHandler validate ingredients and food name, and saves new diary to Async Stroage
     * if today doesn't have any meal, then create new meal, if today exist meal then mergeItem 
     * 
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
    saveBtnHandler = async () => {

        // check are ingredients and food name empty
        if (this.state.food.trim()) {
            this.setState({ isFoodNameEmpty: false });

            if (this.state.ingredients.trim()) {
                this.setState({ isIngredientsEmpty: false });
            } else {
                this.setState({ isIngredientsEmpty: true });
                return;
            }

        } else {
            this.setState({ isFoodNameEmpty: true });
            return;
        }

        const dateKey = KeyGenerator.dateKeyGenerator(this.state.date);
        const saveObj = {
            time: JSON.stringify(this.state.date),
            feel: this.state.emotionSelected,
            food: this.state.food,
            ingredients: this.state.ingredients,
            symptom: this.state.symptomSelected,
            comments: this.state.comments
        }

        /*
         * this obj will be saved in database
         * a random key is used because Async Storage does not support auto increment key
         */
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
                        console.log(e);
                    }
                } else {
                    // create new object and save
                    try {
                        AsyncStorage.setItem(dateKey, JSON.stringify(obj));
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }

        this.props.navigation.goBack();
    };

    render() {
        return (
            <Container>
                <HeaderGoBack navigation={this.props.navigation} title='Create Diary' />

                {/* <Content contentContainerStyle={{ flex: 1 }}> */}
                <Content showsVerticalScrollIndicator={false}>
                    <Grid style={Theme.body} >
                        <Row size={2} >
                            <Grid style={styles.headRow}>
                                <Row size={1} style={{ alignItems: 'center', justifyContent: 'center', margin: 15 }} >
                                    <H3>How do you feel after the meal?</H3>
                                </Row>
                                <Row size={2} style={styles.emotionRow}>
                                    {/* https://icons8.com/icon/pack/messaging/ios */}
                                    <TouchableOpacity style={styles.emotion} onPress={() => this.emotionSelectedHandler('Excellent')} >
                                        <EmotionSVG.Excellent
                                            width={50}
                                            height={50}
                                            color={this.state.emotionSelected === 'Excellent' ? '#DD9E2C' : '#333745'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.emotion} onPress={() => this.emotionSelectedHandler('Good')} >
                                        <EmotionSVG.Good
                                            width={50}
                                            height={50}
                                            color={this.state.emotionSelected === 'Good' ? '#DD9E2C' : '#333745'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.emotion} onPress={() => this.emotionSelectedHandler('So So')} >
                                        <EmotionSVG.SoSo
                                            width={50}
                                            height={50}
                                            color={this.state.emotionSelected === 'So So' ? '#DD9E2C' : '#333745'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.emotion} onPress={() => this.emotionSelectedHandler('Not Well')} >
                                        <EmotionSVG.NotWell
                                            width={50}
                                            height={50}
                                            color={this.state.emotionSelected === 'Not Well' ? '#DD9E2C' : '#333745'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.emotion} onPress={() => this.emotionSelectedHandler('Awful')} >
                                        <EmotionSVG.Awful
                                            width={50}
                                            height={50}
                                            color={this.state.emotionSelected === 'Awful' ? '#DD9E2C' : '#333745'} />
                                    </TouchableOpacity>
                                </Row>
                                <Row size={1} style={{ alignItems: 'center', justifyContent: 'center', margin: 15 }} >
                                    <H3>{this.state.emotionSelected}</H3>
                                </Row>
                            </Grid>
                        </Row>
                        <Row size={8} >
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
                                            textStyle={{ color: "#333745", fontSize: 18, fontWeight: 'bold', maxWidth: '100%' }}
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
                                            textStyle={{ color: "#333745", fontSize: 18, fontWeight: 'bold', maxWidth: '100%' }}
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
                                        // style={[styles.input, { backgroundColor: '#f9f5ed' }]}
                                        style={styles.input}
                                        label={'Food Name'}
                                        iconClass={MaterialIcons}
                                        iconName={'restaurant'}
                                        iconColor={this.state.isFoodNameEmpty ? '#f95a25' : '#f4d29a'}
                                        iconSize={30}
                                        labelStyle={{ color: this.state.isFoodNameEmpty ? '#f95a25' : '#333745' }}
                                        inputStyle={{ color: '#333745', paddingLeft: 0 }}
                                        // multiline={true}
                                        onChangeText={(text) => this.setState({ food: text })}
                                        useNativeDriver
                                    />
                                    <Kohana
                                        // style={[styles.input, { backgroundColor: '#f9f5ed' }]}
                                        style={styles.input}
                                        label={'Ingredients'}
                                        iconClass={MaterialIcons}
                                        iconName={'mode-edit'}
                                        iconColor={this.state.isIngredientsEmpty ? '#f95a25' : '#f4d29a'}
                                        iconSize={30}
                                        labelStyle={{ color: this.state.isIngredientsEmpty ? '#f95a25' : '#333745' }}
                                        inputStyle={{ color: '#333745', paddingLeft: 0 }}
                                        onChangeText={(text) => this.setState({ ingredients: text })}
                                        useNativeDriver
                                    />
                                    <Kohana
                                        // style={[styles.input, { backgroundColor: '#f9f5ed' }]}
                                        style={styles.input}
                                        label={'Comments (optional)'}
                                        iconClass={MaterialIcons}
                                        iconName={'comment'}
                                        iconSize={30}
                                        iconColor={'#f4d29a'}
                                        labelStyle={{ color: '#333745' }}
                                        inputStyle={{ color: '#333745', paddingLeft: 0 }}
                                        onChangeText={(text) => this.setState({ comments: text })}
                                        useNativeDriver
                                    />
                                    <Button style={Theme.button} onPress={this.saveBtnHandler} >
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
        marginTop: 5,
        // backgroundColor: '#f9f5ed',
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
        margin: '2%',
    },
    picker: {
        marginHorizontal: '3%',
        marginTop: '3%',
    },
    timePicker: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        marginBottom: 10,
    },
    card2: {
        padding: 16,
        flex: 1,
    },
    input: {
        marginTop: 4,
        backgroundColor: '#F4F4F4',
        borderBottomColor: '#E5E1E0',
        borderBottomWidth: 1,
    },
});

export default addDiaryScreen;