import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Thumbnail, Form, Item, Label, Input, Toast, Content, Text, DatePicker, ListItem, CheckBox, Button, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import uri from '../../assets/avatar_square.jpg';


class editProfileScreen extends Component {
    static navigationOptions = {
        title: 'Edit Profile',
    };

    constructor(props) {
        super(props);
        this.state = {
            // chosenDate: new Date(),
            milk: false,
            soy: false,
            seafood: false,
            userName: ''
        };
        // this.setDate = this.setDate.bind(this);
    }

    // setDate(newDate) {
    //     this.setState({
    //         chosenDate: newDate,
    //     });
    // };

    saveHandler = async () => {
        console.log('save Handler invoked!');
        try {
            await AsyncStorage.setItem('user_name', JSON.stringify(this.state.userName.toString()));
            await AsyncStorage.setItem('milk', JSON.stringify(this.state.milk));
            await AsyncStorage.setItem('soy', JSON.stringify(this.state.soy));
            await AsyncStorage.setItem('seafood', JSON.stringify(this.state.seafood));
        } catch (error) {
            // Error saving data
            console.log(error);
        }


        this.props.navigation.state.params.refresh(this.state);
        this.props.navigation.goBack();
    };

    // Search the local database and set new satate
    componentDidMount() {
        let keys = ['user_name', 'milk', 'soy', 'seafood'];
        let values = [];
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
                values.push(store[i][1]);
                console.log(store[i][1]);

            });
            console.log(values + '1111');
            // the value extract from database is JSON value, so need to convert to string and remove quote
            this.setState({
                isLoading: false,
                userName: values[0] ? values[0].replace(/"/g, '') : '',
                milk: JSON.parse(values[1]),
                soy: JSON.parse(values[2]),
                seafood: JSON.parse(values[3])
            });
        });

    }


    render() {
        return (
            <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
                {/* <Header /> */}
                <Content>
                    <Thumbnail large source={uri} style={{ alignSelf: 'center', margin: 20 }} />
                    <Text style={{ alignSelf: 'center' }}>Hi, Welcome to EatSafe,</Text>
                    <Text style={{ alignSelf: 'center' }}>The information will only be saved locally</Text>
                    <Form>
                        <Item floatingLabel>
                            <Label style={this.state.userName === '' ? {} : styles.hidden }>Username</Label>
                            <Input placeholder={this.state.userName} onChangeText={(text) => this.setState({ userName: text })} />
                        </Item>
                    </Form>
                    <Text style={{ alignSelf: 'center', margin: 20 }} >Please choose allergies you suffering</Text>
                    <ListItem onPress={() => this.setState({ milk: !this.state.milk })}>
                        <CheckBox checked={this.state.milk} onPress={() => this.setState({ milk: !this.state.milk })} />
                        <Body>
                            <Text>Milk</Text>
                        </Body>
                    </ListItem>
                    <ListItem onPress={() => this.setState({ soy: !this.state.soy })}>
                        <CheckBox checked={this.state.soy} onPress={() => this.setState({ soy: !this.state.soy })} />
                        <Body>
                            <Text>Soy</Text>
                        </Body>
                    </ListItem>
                    <ListItem onPress={() => this.setState({ seafood: !this.state.seafood })}>
                        <CheckBox checked={this.state.seafood} onPress={() => this.setState({ seafood: !this.state.seafood })} />
                        <Body>
                            <Text>Seafood</Text>
                        </Body>
                    </ListItem>
                    <Button info style={{ padding: '10%', alignSelf: 'center', margin: 20 }} onPress={this.saveHandler} >
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
};

const styles = StyleSheet.create({
    avatar: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    allergen: {
        height: 300
    },
    rowStyle: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hidden: {
        width: 0,
        height: 0,
    }
});


export default editProfileScreen;