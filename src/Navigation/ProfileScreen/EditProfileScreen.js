import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Toast, Root, Form, Item, Label, Input, Content, Text, Left, ListItem, CheckBox, Button, Body, Right, Title, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Fumi } from 'react-native-textinput-effects';
import HeaderGoBack from '../../Components/HeaderGoBack';
import AvatarSVG from '../../assets/svg/avartar_svg';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Regex from '../../Utils/Regex';
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
        isName: true,
        isEmail: true,
    }

    /**
     * @func setUserInfo saves 'avatar', 'name' and 'email' in Async Storage.
     * 
     * data structure {user: {avatar: "UserMale", name: "Steve", email: "danyangvii@gmail.com"}
     */
    setUserInfo = async () => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(this.state));
        } catch (e) {
            // save error
            console.log(e);
        }
    }

    /**
     * @func saveHandler validate and save user input
     */
    saveHandler = () => {
        // user name validation
        const isName = Regex.username.test(this.state.name);
        if (isName) {
            this.setState({isName: true});
        } else {
            this.setState({isName: false});
            Toast.show({
                text: 'Name Invalid!',
                textStyle: { textAlign: 'center' }
            });
            return ;
        }

        // email validation
        const isEmail = Regex.email.test(this.state.email);
        if (isEmail) {
            this.setState({isEmail: true});
        } else {
            this.setState({isEmail: false});
            Toast.show({
                text: 'Email Invalid!',
                textStyle: { textAlign: 'center' }
            });
            return ;
        }

        this.setUserInfo();

        // call the refresh function in parent conponent and send current state in user obj
        this.props.navigation.state.params.refresh({
            user: {
                avatar: this.state.avatar,
                email: this.state.email.toLowerCase().trim(),
                name: this.state.name.trim()
            }
        });

        this.props.navigation.goBack();
    };

    /**
     * @func toggleAvatar toggle button for setting avatar name in state
     * @param {string} avatarName 
     */
    toggleAvatar = (avatarName) => {
        this.setState({ avatar: avatarName });
    }

    render() {
        return (
            <Root>
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
                                    labelStyle={{ color: this.state.isName ? '#333745' : '#f95a25' }}
                                    iconClass={FontAwesomeIcon}
                                    iconName={'user'}
                                    iconColor={'#333745'}
                                    iconSize={20}
                                    iconWidth={40}
                                    inputPadding={16}
                                    inputStyle={{ color: this.state.isName ? '#333745' : '#f95a25' }}
                                    defaultValue={this.state.name}
                                    onChangeText={(text) => this.setState({ name: text })}
                                />

                                <Fumi
                                    label={'Email'}
                                    labelStyle={{ color: this.state.isEmail ? '#333745' : '#f95a25' }}
                                    iconClass={FontAwesomeIcon}
                                    iconName={'envelope-o'}
                                    iconColor={'#333745'}
                                    iconSize={20}
                                    iconWidth={40}
                                    inputPadding={16}
                                    inputStyle={{ color: this.state.isEmail ? '#333745' : '#f95a25' }}
                                    defaultValue={this.state.email}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                            </Form>
                        </Row>

                    </Grid>
                    <Button info style={Theme.button} onPress={this.saveHandler} >
                        <Text>Save</Text>
                    </Button>
                </Content>
            </Container>
            </Root>
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