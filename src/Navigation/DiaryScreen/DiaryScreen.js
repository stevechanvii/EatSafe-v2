import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Header, Thumbnail, Content, H2 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import uri from '../../asserts/logo.jpg';


export default class diaryScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <Container>
        {/* <Thumbnail large source={uri} />
        <Text style={{ color: "black", fontSize: 24, fontWeight: "bold" }}>Diary</Text>
        <Text style={{ color: "black", fontSize: 18 }}>Coming Soon</Text> */}
        <Grid>
          <Row size={3}>
            <Col size={2} style={{backgroundColor: '#00CE9F'}}><Text>L</Text></Col>
            <Col size={5} ><Thumbnail large source={uri} /></Col>
            <Col size={2} style={{backgroundColor: '#00CE9F'}}><Text>R</Text></Col>
          </Row>
          <Row size={7} style={{backgroundColor: '#635DB7'}}></Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: '40%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateField: {
    backgroundColor: '#635DB7'
  },
  dairyField: {
    backgroundColor: '#DD9E2C'
  }
});