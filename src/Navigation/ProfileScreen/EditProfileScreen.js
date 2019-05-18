import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, View, Thumbnail, Form, Item, Label, Input, Toast, Content, Text, Left, ListItem, CheckBox, Button, Body, Right, Title, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Fumi } from 'react-native-textinput-effects';
import HeaderGoBack from '../../Components/HeaderGoBack';
import AvatorSVG from '../../assets/svg/avartor_svg';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import ProfileSVG from '../../assets/svg/profile_svg';
import Theme from '../../Styles/Theme';


class editProfileScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        activatedAvator: 'UserMale1',
        name: '',
        email: '',
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // chosenDate: new Date(),
    //         milk: false,
    //         soy: false,
    //         seafood: false,
    //         userName: ''
    //     };
    //     // this.setDate = this.setDate.bind(this);
    // }

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

    toggleAvator = (id) => {
        this.setState({ activatedAvator: id });
    }

    render() {
        return (
            <Container>
                <HeaderGoBack navigation={this.props.navigation} title='Edit Profile' />
                <Content>
                    <Grid style={Theme.body}>
                        <Row>
                            <Grid>
                                <Row>
                                    <Grid>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserMale1')}>
                                                <AvatorSVG.UserMale1
                                                    width={75}
                                                    height={75}
                                                    isChosen={this.state.activatedAvator === 'UserMale1'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserMale2')}>
                                                <AvatorSVG.UserMale2
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.activatedAvator === 'UserMale2'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserMale3')}>
                                                <AvatorSVG.UserMale3
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.activatedAvator === 'UserMale3'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserMale4')}>
                                                <AvatorSVG.UserMale4
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.activatedAvator === 'UserMale4'} />
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </Row>

                                {/* <Row>
                                    <Grid>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserMale5')}>
                                                <AvatorSVG.UserMale5
                                                    width={75}
                                                    height={75}
                                                    isChosen={this.state.activatedAvator === 'UserMale5'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserMale6')}>
                                                <AvatorSVG.UserMale6
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.activatedAvator === 'UserMale6'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserFemale1')}>
                                                <AvatorSVG.UserFemale1
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.activatedAvator === 'UserFemale1'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserFemale2')}>
                                                <AvatorSVG.UserFemale2
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.activatedAvator === 'UserFemale2'} />
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </Row> */}

                                <Row>
                                    <Grid>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserFemale3')}>
                                                <AvatorSVG.UserFemale3
                                                    width={75}
                                                    height={75}
                                                    isChosen={this.state.activatedAvator === 'UserFemale3'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserFemale4')}>
                                                <AvatorSVG.UserFemale4
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.activatedAvator === 'UserFemale4'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserFemale5')}>
                                                <AvatorSVG.UserFemale5
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.activatedAvator === 'UserFemale5'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvator('UserFemale6')}>
                                                <AvatorSVG.UserFemale6
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.activatedAvator === 'UserFemale6'} />
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </Row>
                            </Grid>
                        </Row>

                        <Row>
                            <Form style={styles.card1}>
                                <Fumi
                                    label={'Name'}
                                    iconClass={FontAwesomeIcon}
                                    iconName={'user'}
                                    iconColor={'#f95a25'}
                                    iconSize={20}
                                    iconWidth={40}
                                    inputPadding={16}
                                    defaultValue={this.state.name}
                                    onChangeText={(text) => this.setState({ name: text })}
                                />

                                <Fumi
                                    label={'Email'}
                                    iconClass={FontAwesomeIcon}
                                    iconName={'envelope-o'}
                                    iconColor={'#f95a25'}
                                    iconSize={20}
                                    iconWidth={40}
                                    inputPadding={16}
                                    defaultValue={this.state.email}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                            </Form>
                        </Row>

                    </Grid>
                    {/* <Thumbnail large source={uri} style={{ alignSelf: 'center', margin: 20 }} />
                    <Text style={{ alignSelf: 'center' }}>Hi, Welcome to EatSafe,</Text>
                    <Text style={{ alignSelf: 'center' }}>The information will only be saved locally</Text>
                    <Form>
                        <Item floatingLabel>
                            <Label style={this.state.userName === '' ? {} : styles.hidden}>Username</Label>
                            <Input placeholder={this.state.userName} onChangeText={(text) => this.setState({ userName: text })} />
                        </Item>
                    </Form> */}
                    {/* <Text style={{ alignSelf: 'center', margin: 20 }} >Please choose allergies you suffering</Text>
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
                    </ListItem> */}
                    {/* <Button info style={{ padding: '10%', alignSelf: 'center', margin: 20 }} onPress={this.saveHandler} >
                        <Text>Save</Text>
                    </Button> */}
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
    input: {
        marginTop: 4,
    },
    card1: {
        padding: 16,
        flex: 1,
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
    },
    gridCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default editProfileScreen;