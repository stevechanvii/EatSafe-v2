import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Button, Input, Item, Form, Picker, H1, H2 } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmotionIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class addDiary extends Component {
    static navigationOptions = {
        title: 'Create Diary',
    };

    state = {
        selected: undefined,
        emotionSelected: 'Good',
        isDateTimePickerVisible: false
    };

    // symptom picker
    onValueChange = (value) => {
        this.setState({
            selected: value
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

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
    };

    /*
     * data structure
     * {date, [{time, [{'food', 'bread'}, {'ingredients', 'wheat'}, {'symptoms', 'nothing wrong'}]},
     *         {time, [{'food', 'milk'}, {'ingredients', 'milk'}, {'symptoms', 'nothing wrong'}]},
     *         {time, [{'food', 'chocolate'}, {'ingredients', 'milk coco sugur'}, {'symptoms', 'itching skin'}]}
     *        ]
     * }
     */

    saveBtnHandler = () => {

    };

    render() {
        return (
            <Container>
                <Grid>
                    <Row size={3} >
                        <Grid style={styles.headRow}>
                            <Row size={1} style={{ alignItems: 'center', justifyContent: 'center' }} >
                                <H1>Have a Good meal?</H1>
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
                                <H2>{this.state.emotionSelected}</H2>
                            </Row>
                        </Grid>
                    </Row>
                    <Row size={7} >
                        <Content>
                            <Form>
                                <Item style={styles.inputItem} >
                                    <Icon name='access-time' size={20} />
                                    <Input placeholder='Time' />
                                </Item>
                                <Button info
                                    onPress={this.showDateTimePicker}>
                                    <Text>Date</Text>
                                </Button>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                />

                                <Item style={styles.inputItem} >
                                    <Icon name='restaurant' size={20} />
                                    <Input placeholder='Food' />
                                </Item>


                                <Item style={styles.inputItem} >
                                    <Icon name='mode-edit' size={20} />
                                    <Input placeholder='Ingredients' />
                                </Item>

                                <Item style={styles.inputItem} >
                                    <Icon name='do-not-disturb' size={20} />
                                    <Picker
                                        mode="dropdown"
                                        // iosIcon={<Icon name="expand-more" />}
                                        style={{}}
                                        placeholder="Select your Symptoms"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selected}
                                        onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Feeling Good" value="key0" />
                                        <Picker.Item label="Itching Skin" value="key1" />
                                        <Picker.Item label="Running Nose" value="key2" />
                                        <Picker.Item label="Breath Difficuties" value="key3" />
                                    </Picker>
                                </Item>
                                <Item style={styles.inputItem} >
                                    <Icon name='comment' size={20} />
                                    <Input placeholder='Comments' />
                                </Item>
                            </Form>



                            <Button info style={{ padding: '10%', alignSelf: 'center', margin: 20 }} onPress={() => this.props.navigation.goBack()} >
                                <Text>Save</Text>
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
    }
});

export default addDiary;