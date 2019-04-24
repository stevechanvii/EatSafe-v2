import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Fab, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Entypo';
import uri from '../../assets/logo.jpg';

import MealCard from './MealCard/Card';


export default class diaryScreen extends Component {
  static navigationOptions = {
    title: 'Diary',
  };

  state = {
    date: new Date(),
    active: false
  };

  getDay = date => {
    // const date = new Date();
    const days = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat'
    }
    // alert(days[date.getDay()]);
    return days[date.getDay()];
  };

  setDayHandler = operator => {
    const nextDay = this.state.date;
    nextDay.setDate(nextDay.getDate() + operator);
    this.setState({ date: nextDay });
  };

  addFabHandler = () => {
    this.setState({ active: !this.state.active });
    this.props.navigation.navigate('AddDairy', {date: this.state.date});
  };

  render() {
    return (
      <Container>
        <Grid>
          <Row size={3}>
            <Col size={2} style={styles.arrowBtn}>
              <TouchableOpacity onPress={() => this.setDayHandler(-1)}>
                <Icon name='chevron-thin-left' size={50} color='#333745' />
              </TouchableOpacity>
            </Col>
            <Col size={5} style={styles.datePicker}>
              <Thumbnail large source={uri} />
              <Text>{this.getDay(this.state.date)}</Text>
            </Col>
            <Col size={2} style={styles.arrowBtn}>
              <TouchableOpacity onPress={() => this.setDayHandler(1)}>
                <Icon name='chevron-thin-right' size={50} color='#333745' />
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={7} style={{ backgroundColor: '#635DB7' }}>
            <Content>
              <MealCard style={styles.records}/>
              <Col style={styles.records}></Col>
              <Col style={styles.records}></Col>
              <Col style={styles.records}></Col>
              <Col style={styles.records}></Col>
              <Col style={styles.records}></Col>

            </Content>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{}}
              style={styles.addFab}
              position="bottomRight"
              onPress={this.addFabHandler}>
              <Icon name="add-to-list" />

              {/* <Button disabled style={{ backgroundColor: '#DD5144' }}>
                <Icon name="github" />
              </Button> */}

            </Fab>
          </Row>
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
  },
  datePicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  records: {
    backgroundColor: '#00CE9F',
    height: 80,
    marginHorizontal: '3%',
    marginTop: '3%'
  },
  arrowBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C7EFCF'
  },
  addFab: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5067FF'
  }
});