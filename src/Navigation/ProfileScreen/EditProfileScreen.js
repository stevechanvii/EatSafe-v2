import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, View, Thumbnail, Form, Item, Label, Input, Toast, Content, Text, Left, ListItem, CheckBox, Button, Body, Right, Title, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Fumi } from 'react-native-textinput-effects';
import HeaderGoBack from '../../Components/HeaderGoBack';
import AvatarSVG from '../../assets/svg/avartar_svg';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import ProfileSVG from '../../assets/svg/profile_svg';
import Theme from '../../Styles/Theme';

/**
 * @class editProfileScreen is the child component of profileScreen.
 * 
 * This component saves user's avatar, name and email to Async Storage
 */
class editProfileScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        avatar: 'UserMale1',
        name: '',
        email: '',
        ...this.props.navigation.getParam('user', {}),
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

    /**
     * @func setUserInfo saves 'avatar', 'name' and 'email' in Async Storage.
     * 
     * data structure {"user": {"avatar": "UserMale1", "name": "Steve", "email": "danyangvii@gmail.com"}}
     */
    setUserInfo = async () => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(this.state));
        } catch (e) {
            // save error
            console.log(e);
        }
        console.log("setUserInfo saved");
    }

    saveHandler = () => {
        // console.log('save Handler invoked!');
        // try {
        //     await AsyncStorage.setItem('user_name', JSON.stringify(this.state.userName.toString()));
        //     await AsyncStorage.setItem('milk', JSON.stringify(this.state.milk));
        //     await AsyncStorage.setItem('soy', JSON.stringify(this.state.soy));
        //     await AsyncStorage.setItem('seafood', JSON.stringify(this.state.seafood));
        // } catch (error) {
        //     // Error saving data
        //     console.log(error);
        // }


        // this.props.navigation.state.params.refresh(this.state);
        // this.props.navigation.goBack();

        this.setUserInfo();
        console.log(this.state); 
    };

    // Search the local database and set new satate
    componentDidMount() {
        // let keys = ['user_name', 'milk', 'soy', 'seafood'];
        // let values = [];
        // AsyncStorage.multiGet(keys, (err, stores) => {
        //     stores.map((result, i, store) => {
        //         values.push(store[i][1]);
        //         console.log(store[i][1]);

        //     });
        //     console.log(values + '1111');
        //     // the value extract from database is JSON value, so need to convert to string and remove quote
        //     this.setState({
        //         isLoading: false,
        //         userName: values[0] ? values[0].replace(/"/g, '') : '',
        //         milk: JSON.parse(values[1]),
        //         soy: JSON.parse(values[2]),
        //         seafood: JSON.parse(values[3])
        //     });
        // });

    }

    toggleAvatar = (id) => {
        this.setState({ avatar: id });
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
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserMale1')}>
                                                <AvatarSVG.UserMale1
                                                    width={75}
                                                    height={75}
                                                    isChosen={this.state.avatar === 'UserMale1'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserMale2')}>
                                                <AvatarSVG.UserMale2
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.avatar === 'UserMale2'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserMale3')}>
                                                <AvatarSVG.UserMale3
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.avatar === 'UserMale3'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserMale4')}>
                                                <AvatarSVG.UserMale4
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.avatar === 'UserMale4'} />
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </Row>

                                {/* <Row>
                                    <Grid>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserMale5')}>
                                                <AvatarSVG.UserMale5
                                                    width={75}
                                                    height={75}
                                                    isChosen={this.state.avatar === 'UserMale5'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserMale6')}>
                                                <AvatarSVG.UserMale6
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.avatar === 'UserMale6'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserFemale1')}>
                                                <AvatarSVG.UserFemale1
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.avatar === 'UserFemale1'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserFemale2')}>
                                                <AvatarSVG.UserFemale2
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.avatar === 'UserFemale2'} />
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </Row> */}

                                <Row>
                                    <Grid>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserFemale3')}>
                                                <AvatarSVG.UserFemale3
                                                    width={75}
                                                    height={75}
                                                    isChosen={this.state.avatar === 'UserFemale3'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserFemale4')}>
                                                <AvatarSVG.UserFemale4
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.avatar === 'UserFemale4'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserFemale5')}>
                                                <AvatarSVG.UserFemale5
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.avatar === 'UserFemale5'} />
                                            </TouchableOpacity>
                                        </Col>

                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleAvatar('UserFemale6')}>
                                                <AvatarSVG.UserFemale6
                                                    width={75}
                                                    height={75}
                                                    isChosen={false} isChosen={this.state.avatar === 'UserFemale6'} />
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
                    <Button info style={Theme.button} onPress={this.saveHandler} >
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