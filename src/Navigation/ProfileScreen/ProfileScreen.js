import React, { Component } from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, View, Thumbnail, Text, Button, Badge, Body, Title, ListItem } from 'native-base';
import Header from '../../Components/Header';
import Theme from '../../Styles/Theme';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AboutUsSVG from '../../assets/svg/about_us_svg';
import AvatarSVG from '../../assets/svg/avartar_svg';
// import ProfileSVG from '../../assets/svg/profile_svg';
import uri from '../../assets/logo.jpg';

/**
 * @class profileScreen is the main entry for Profile which contains information content and functional content.
 * 
 * This component will retrive 'user', 'allengens' and 'intolerance' from Async Storage 
 * and show the result in information content. 
 * The result also send as parameters to child component when need.
 */
class profileScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        milk: false,
        soy: false,
        seafood: false,
        isLoading: true,
        userName: '',
        refresh: false,

        user: {},
        allergens: {},
        intolerance: {},

    };

    /**
     * @func componentWillMount retrive user info before rendering.
     */
    componentWillMount() {
        this.getAllUserInfo();
    }

    /**
     * @func getAllUserInfo retrive 'user', 'allengens' and 'intolerance' in Async Storage.
     */
    getAllUserInfo = async () => {
        /*
        * searching result will be saved in values
        * expected result [['user', '{...}'], ['allengens', '{...}'], ['intolerance', '{...}']]
        */
        let values;
        try {
            values = await AsyncStorage.multiGet(['user', 'allergens', 'intolerance']);
        } catch (e) {
            // read error
            console.log(e);
        }

        // iterate array result and save in obj, then set state
        const obj = {};
        values.map(el => {
            obj[el[0]] = JSON.parse(el[1]);
        });
        this.setState(obj);
        console.log(this.state);
    }

    // this function will be sent to edit profile, then refresh code after go back
    refreshFunction(props) {
        this.setState(props.obj);
        console.log('refreshFunction ' + this.state);
    }

    // Search the local database and set new satate
    componentDidMount() {
        let keys = ['user_name', 'milk', 'soy', 'seafood'];
        let values = [];
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
                values.push(store[i][1]);
                console.log(store[i][1]);

            });
            this.setState({
                isLoading: false,
                userName: values[0] ? values[0].replace(/"/g, '') : '',
                milk: JSON.parse(values[1]),
                soy: JSON.parse(values[2]),
                seafood: JSON.parse(values[3])
            });
        });

    }

    Avatar = (avatarName) => {
        switch (avatarName) {
            case 'UserMale1':
                return (<AvatarSVG.UserMale1 width={130} height={130} isChosen={false} />);
            case 'UserMale2':
                return (<AvatarSVG.UserMale2 width={130} height={130} isChosen={false} />);
            case 'UserMale3':
                return (<AvatarSVG.UserMale3 width={130} height={130} isChosen={false} />);
            case 'UserMale4':
                return (<AvatarSVG.UserMale4 width={130} height={130} isChosen={false} />);
            case 'UserFemale1':
                return (<AvatarSVG.UserFemale1 width={130} height={130} isChosen={false} />);
            case 'UserFemale2':
                return (<AvatarSVG.UserFemale2 width={130} height={130} isChosen={false} />);
            case 'UserFemale3':
                return (<AvatarSVG.UserFemale3 width={130} height={130} isChosen={false} />);
            case 'UserFemale4':
                return (<AvatarSVG.UserFemale4 width={130} height={130} isChosen={false} />);
            default:
                return (<AvatarSVG.UserMale1 width={130} height={130} isChosen={false} />);
        }
    }


    render() {
        if (this.state.isLoading) {
            return <Container><Text>Loading...</Text></Container>;
        }

        /**
         * DISABLED
         * @func allergensInfo check allergens and intolerance exist and generate information content.
         * 
         * once user saves something in settings, allergens and intolerance will nolonger empty.
         */
        const allergensInfo = () => {
            if (this.state.allergens && this.state.intolerance) {
                console.log(this.state.allergens)
                const allergenBages = Object.entries(this.state.allergens).forEach(([key, value]) => (
                    <Text>{value ? key : <Text />}</Text>
                )
                    // (value ? <Text>key</Text> : <Text />)
                );
                return (
                    <View>
                        <Text>Allergens </Text>
                        {allergenBages}
                        <Text>Intolerance </Text>
                        {Object.entries(this.state.intolerance).forEach(([key, value]) =>
                            value ? <Text>{key}</Text> : <Text>No intolerance</Text>
                        )}
                    </View>
                );
            } else {
                return (
                    <View>
                        <Text>Setup allergens or intolerance in settings</Text>
                    </View>
                );
            }
        }

        return (
            <Container>
                <Header title='Profile' />
                <Grid style={Theme.body} >
                    <Row size={3}>
                        <Grid style={styles.gridCenter}>
                            <Row size={8}>
                                {this.state.user ? this.Avatar(this.state.user.avatar) : this.Avatar('UserMale1')}
                            </Row>
                            <Row size={1}>
                                <Text>{this.state.user ? `Hi ${this.state.user.name}, welcome to PokeAllergist` : 'Hi, please setup account'}</Text>
                            </Row>
                            <Row size={1}>
                                {this.state.allergens && this.state.intolerance ? <Text /> : <Text style={{}}>Setup allergens or intolerance in settings</Text>}
                                {/* {this.state.intolerance ? <Text>Intolerance </Text> : <Text>Setup allergens in settings</Text>}
                                {Object.entries(this.state.intolerance).forEach(([key, value]) => 
                                    (value ? <Badge info><Text>{key}</Text></Badge> : <Text />)
                                )} */}
                            </Row>
                        </Grid>
                    </Row>
                    <Row size={7}>
                        <Grid>
                            <Row size={1}>
                                <Grid>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('EditProfile', { refresh: this.refreshFunction.bind(this), user: this.state.user })}>
                                            <Thumbnail square style={styles.iconCenter} source={require('../../assets/icon/icons8-administrator-male-100.png')} />
                                            <Text>Account</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('AllergenSetting')}>
                                            <Thumbnail square style={styles.iconCenter} source={require('../../assets/icon/icons8-settings-100.png')} />
                                            <Text>Setting</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </Row>
                            <Row size={1}>
                                <Grid>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('KnowledgeCard')}>
                                            <Thumbnail square style={styles.iconCenter} source={require('../../assets/icon/icons8-study-100.png')} />
                                            <Text>Knowledge Card</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('AboutUs')}>
                                            {/* <Thumbnail square source={require('../../assets/svg/icons8-about.svg')} /> */}
                                            <AboutUsSVG style={styles.iconCenter} width={60} height={60} />
                                            <Text>About Us</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </Row>
                            <Row size={1}>
                                <Grid>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('ChefCard')}>
                                            <Thumbnail square style={styles.iconCenter} source={require('../../assets/icon/icons8-chef-hat-100.png')} />
                                            <Text>Chef Card</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('SendEmail')}>
                                            <Thumbnail square style={styles.iconCenter} source={require('../../assets/icon/icons8-send-email-100.png')} />
                                            <Text>Export Data</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </Row>
                        </Grid>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    gridCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCenter: {
        alignSelf: 'center',
    },
    avatarRow: {
        height: 100,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    allergCheck: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRow: {
        // height: 200,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    allergyIcon: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default profileScreen;