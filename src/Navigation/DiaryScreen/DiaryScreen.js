import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Fab } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Entypo';
import uri from '../../assets/logo.jpg';

import MealCard from './MealCard/Card';
import DiaryContent from './DiaryContent';


export default class diaryScreen extends Component {
  static navigationOptions = {
    title: 'Diary',
  };

  state = {
    date: new Date(),
    active: false,
    dairyResult: null,
    afterAddNew: 0
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

  // this method will set the date and extract the dariy data
  setDayHandler = operator => {
    const nextDay = this.state.date;
    nextDay.setDate(nextDay.getDate() + operator);
    this.setState({ date: nextDay });
    this.getDariyResult();
  };

  addFabHandler = () => {
    this.setState({ active: !this.state.active });
    this.props.navigation.navigate('AddDairy', { date: this.state.date });
  };

  dateKeyGenerator = () => {
    const dateKey = ('' + this.state.date.getDate() + (this.state.date.getMonth() + 1) + this.state.date.getFullYear()).trim();
    return dateKey;
  }

  getDariyResult = async () => {
    const dateKey = this.dateKeyGenerator();
    try {
      const value = await AsyncStorage.getItem(dateKey);
      this.setState({dairyResult: JSON.parse(value)});
      console.log('dairy result '+ this.state.dairyResult);
    } catch (e) {
      // read error
      console.log(e)
    }
  }

  // before dairy tab get focus, rerender this screen
  componentDidMount() {
    // https://github.com/react-navigation/react-navigation/issues/1617
    // https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      //  # do you update if need
      this.getDariyResult();
      this.setState({afterAddNew: this.state.afterAddNew + 1});
    });
  }

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
              {this.state.dairyResult ? <DiaryContent dairyResult={this.state.dairyResult}/> : <Text>No dariy</Text>}
              {/* <MealCard style={styles.records} /> */}
              
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
    marginTop: '3%',
    borderRadius: 10
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