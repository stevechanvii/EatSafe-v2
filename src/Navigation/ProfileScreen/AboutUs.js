import React, { Component } from 'react';
import { Platform, Alert, Image, StyleSheet } from 'react-native';
import { Container, Text, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Mailer from 'react-native-mail';
import HeaderGoBack from '../../Components/HeaderGoBack';
import Theme from '../../Styles/Theme';

class aboutUs extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Container>
                <HeaderGoBack navigation={this.props.navigation} title='About Us' />
                <Grid style={Theme.body}>
                    <Row size={4} style={styles.rowCenter} >
                        <Image source={require('../../assets/icon/icons8-developer-mode-100.png')} />
                    </Row>
                    <Row size={6}>
                        <Grid>
                            <Row style={styles.rowCenter}>
                                <Text>
                                    Proudly designed and implemented by team Hygieia
                                </Text>
                            </Row>

                        </Grid>


                    </Row>
                </Grid>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    rowCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default aboutUs;
