import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Thumbnail, Text, Button, Badge, Body, Title, ListItem } from 'native-base';
import Header from '../../Components/Header';
import Theme from '../../Styles/Theme';
import { Col, Row, Grid } from 'react-native-easy-grid';
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
                <Grid style={Theme.body}>
                    <Row size={4}>
                        <Grid style={styles.gridCenter}>
                            <Row style={styles.avatorRow}><Thumbnail large source={uri} /></Row>
                            <Row>
                                <Text>Hi, </Text>
                                <Text>{this.state.userName || this.state.userName !== '' ? this.state.userName : 'please setup profile'}</Text>
                            </Row>
                            <Row>
                                <Text>Allergens</Text>
                                {this.state.milk ? <Badge info><Text>milk</Text></Badge> : null}
                                {this.state.soy ? <Badge info><Text>soy</Text></Badge> : null}
                                {this.state.seafood ? <Badge info><Text>seafood</Text></Badge> : null}
                            </Row>
                            <Row>
                                <Text>Intolerance</Text>
                            </Row>
                        </Grid>
                    </Row>
                    <Row size={6}>
                        <Grid>
                            <Row size={1}>
                                <Grid>
                                    <Col size={1} style={styles.gridCenter}><Text>1</Text></Col>
                                    <Col size={1} style={styles.gridCenter}><Text>2</Text></Col>
                                </Grid>
                            </Row>
                            <Row size={1}>
                                <Grid>
                                    <Col size={1} style={styles.gridCenter}>
                                        <Button info
                                            onPress={() => this.props.navigation.navigate('EditProfile', { refresh: this.refreshFunction.bind(this) })}>
                                            <Text>Setup Profile</Text>
                                        </Button>
                                    </Col>
                                    <Col size={1} style={styles.gridCenter}>
                                        <Button info
                                            onPress={() => this.props.navigation.navigate('KnowledgeCard')}>
                                            <Text>Knowledge Card</Text>
                                        </Button>
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
        alignItems: 'center'
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