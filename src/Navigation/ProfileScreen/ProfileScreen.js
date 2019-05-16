import React, { Component } from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, View, Thumbnail, Text, Button, Badge, Body, Title, ListItem } from 'native-base';
import Header from '../../Components/Header';
import Theme from '../../Styles/Theme';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AboutUsSVG from '../../assets/svg/about_us_svg'
import uri from '../../assets/logo.jpg';


class profileScreen extends Component {
    // static navigationOptions = {
    //     title: 'Profile',
    // };
    static navigationOptions = {
        header: null
    }

    state = {
        milk: false,
        soy: false,
        seafood: false,
        isLoading: true,
        userName: '',
        refresh: false

    };

    // this function will be sent to edit profile, then refresh code after go back
    refreshFunction(props) {
        this.setState({
            userName: props.userName,
            milk: props.milk,
            soy: props.soy,
            seafood: props.seafood
        });
        console.log('refreshFunction ' + this.state.soy);
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
            console.log(values + '1111');
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
        if (this.state.isLoading) {
            return <Container><Text>Loading...</Text></Container>;
        }

        return (
            <Container>
                <Header title='Profile' />
                <Grid style={Theme.body} >
                    <Row size={4}>
                        <Grid style={styles.gridCenter}>
                            <Row style={styles.avatorRow}><Thumbnail large source={uri} /></Row>
                            <Row>
                                <Text>Hi, </Text>
                                <Text>{this.state.userName || this.state.userName !== '' ? this.state.userName : 'please setup profile'}</Text>
                            </Row>
                            <Row>
                                {/* <Text>Allergens</Text> */}
                                {this.state.milk ? <Badge info><Text>milk</Text></Badge> : null}
                                {this.state.soy ? <Badge info><Text>soy</Text></Badge> : null}
                                {this.state.seafood ? <Badge info><Text>seafood</Text></Badge> : null}
                            </Row>
                            <Row>
                                {/* <Text>Intolerance</Text> */}
                            </Row>
                        </Grid>
                    </Row>
                    <Row size={6}>
                        <Grid>
                            <Row size={1}>
                                <Grid>
                                    <Col size={1} style={styles.gridCenter}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('EditProfile', { refresh: this.refreshFunction.bind(this) })}>
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
                                            <AboutUsSVG style={styles.iconCenter} width={60} height={60}/>
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
    avatorRow: {
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