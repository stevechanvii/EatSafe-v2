import React, { Component } from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, View, Text, Badge, Body, Title, ListItem } from 'native-base';
import Header from '../../Components/Header';
import Theme from '../../Styles/Theme';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AvatarSVG from '../../assets/svg/avartar_svg';
import ProfileSVG from '../../assets/svg/profile_svg';

/**
 * @class profileScreen is the main entry for Profile which contains information content and functional content
 * 
 * This component will retrive 'user', 'allengens' and 'intolerance' from Async Storage 
 * and show the result in information content
 * The result also send as parameters to child component when need
 */
class profileScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        user: {},
        allergens: {},
        intolerance: {},

    };

    /**
     * @func componentWillMount retrive user info before rendering
     */
    componentWillMount() {
        this.getAllUserInfo();
    }

    /**
     * @func getAllUserInfo retrive 'user', 'allengens' and 'intolerance' in Async Storage
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
    }

    /**
     * @func refreshFunction will be sent to child component as parameter by navigation
     * @param {object} obj the changed obj from child component, 
     * e.g. {user: {name: 'Steve', email: 'danyangvii@gmail.com', avatar: 'UserMale1'}}
     */
    refreshFunction = (obj) => {
        this.setState(obj);
        console.log(obj);
    }

    /**
     * @func Avatar retrive avatar that user saved
     * @param {string} avatarName
     */
    Avatar = (avatarName) => {
        switch (avatarName) {
            case 'UserMale1':
                return (<AvatarSVG.UserMale1 width={180} height={180} isChosen={false} />);
            case 'UserMale2':
                return (<AvatarSVG.UserMale2 width={180} height={180} isChosen={false} />);
            case 'UserMale3':
                return (<AvatarSVG.UserMale3 width={180} height={180} isChosen={false} />);
            case 'UserMale4':
                return (<AvatarSVG.UserMale5 width={180} height={180} isChosen={false} />);
            case 'UserMale5':
                return (<AvatarSVG.UserMale6 width={180} height={180} isChosen={false} />);
            case 'UserMale6':
                return (<AvatarSVG.UserMale4 width={180} height={180} isChosen={false} />);
            case 'UserFemale1':
                return (<AvatarSVG.UserFemale1 width={180} height={180} isChosen={false} />);
            case 'UserFemale2':
                return (<AvatarSVG.UserFemale2 width={180} height={180} isChosen={false} />);
            case 'UserFemale3':
                return (<AvatarSVG.UserFemale3 width={180} height={180} isChosen={false} />);
            case 'UserFemale4':
                return (<AvatarSVG.UserFemale4 width={180} height={180} isChosen={false} />);
            case 'UserFemale5':
                return (<AvatarSVG.UserFemale5 width={180} height={180} isChosen={false} />);
            case 'UserFemale6':
                return (<AvatarSVG.UserFemale6 width={180} height={180} isChosen={false} />);
            default:
                return (<AvatarSVG.UserMale1 width={180} height={180} isChosen={false} />);
        }
    }

    render() {
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
                    <Row size={4}>
                        <Grid style={[styles.gridCenter]}>
                            <Row size={4}>
                                {this.state.user ? this.Avatar(this.state.user.avatar) : this.Avatar('UserMale1')}
                            </Row>
                            <Row size={1}>
                                <Text>{this.state.user ? `Hi ${this.state.user.name}, welcome to PokeAllergist` : 'Hi, please setup account'}</Text>
                            </Row>
                            {/* <Row size={1}>
                                {this.state.allergens && this.state.intolerance ? <Text /> : <Text style={{}}>Please setting your allergens</Text>}
                                {this.state.intolerance ? <Text>Intolerance </Text> : <Text>Setup allergens in settings</Text>}
                                {Object.entries(this.state.intolerance).forEach(([key, value]) => 
                                    (value ? <Badge info><Text>{key}</Text></Badge> : <Text />)
                                )}
                            </Row> */}
                        </Grid>
                    </Row>
                    <Row size={6}>
                        <Grid>
                            <Row size={1}>
                                <Grid>
                                    <Col style={{width: '5%'}}></Col>
                                    <Col size={1} style={[styles.gridCenter, {borderTopWidth: 1, borderTopColor: '#E7E7E7'}]}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('EditProfile', { refresh: this.refreshFunction.bind(this), user: this.state.user })}>
                                            {this.state.user ? <ProfileSVG.Profile width={75} height={75} /> : <ProfileSVG.ProfileNoted width={65} height={65} />}
                                            <Text style={styles.iconCenter}>Account</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col size={1} style={[styles.gridCenter, {borderTopWidth: 1, borderTopColor: '#E7E7E7'}]}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('AllergenSetting', { refresh: this.refreshFunction.bind(this), allergens: this.state.allergens, intolerance: this.state.intolerance })}>
                                            {this.state.allergens && this.state.intolerance ? <ProfileSVG.Virus width={75} height={75} /> : <ProfileSVG.VirusNoted width={65} height={65} />}
                                            <Text style={styles.iconCenter}>Allergens</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={{width: '5%'}}></Col>
                                </Grid>
                            </Row>
                            <Row size={1}>
                                <Grid>
                                    <Col style={{width: '5%'}}></Col>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('KnowledgeCard')}>
                                            <ProfileSVG.Classroom width={75} height={75} style={styles.iconCenter} />
                                            <Text style={styles.iconCenter}>Knowledge</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('AboutUs')}>
                                            <ProfileSVG.Github width={75} height={75} />
                                            <Text>About Us</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={{width: '5%'}}></Col>
                                </Grid>
                            </Row>
                            <Row size={1}>
                                <Grid>
                                    <Col style={{width: '5%'}}></Col>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('ChefCard')}>
                                            <ProfileSVG.Chef width={65} height={65} style={styles.iconCenter} />
                                            <Text style={styles.iconCenter}>Chef Card</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('SendEmail')}>
                                            <ProfileSVG.Email width={65} height={65} style={styles.iconCenter} />
                                            <Text style={styles.iconCenter}>Export Data</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col style={{width: '5%'}}></Col>
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