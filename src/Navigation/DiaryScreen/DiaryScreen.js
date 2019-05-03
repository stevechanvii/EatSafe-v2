import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Fab, Toast, Root, Button, Header, Body, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Entypo';
import uri from '../../assets/logo.jpg';

import MealCard from './MealCard/Card';
import DiaryContent from './DiaryContent';


export default class diaryScreen extends Component {
  // static navigationOptions = {
  //   title: 'Diary',
  // };
  static navigationOptions = {
    header: null
  }

  state = {
    date: new Date(),
    active: false,
    dairyResult: null,
    afterAddNew: 0,
    isDateTimePickerVisible: false
  };

  getDay = date => {
    // const date = new Date();
    const days = {
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
      0: 'Sun',
    }
    // alert(days[date.getDay()]);
    return days[date.getDay()];
  };

  // date picker
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ date: new Date(date) });
    // console.log("A date has been picked in Diary Screen: ", date);
    this.hideDateTimePicker();
  };

  // this method will set the date and extract the dariy data
  setDayHandler = operator => {
    const nextDay = this.state.date;
    nextDay.setDate(nextDay.getDate() + operator);
    this.setState({ date: nextDay });
    // this.getDariyResult();
  };

  addFabHandler = () => {
    this.setState({ active: !this.state.active });
    this.props.navigation.navigate('AddDairy', { date: this.state.date });
  };

  // before dairy tab get focus, rerender this screen
  componentDidMount() {
    // https://github.com/react-navigation/react-navigation/issues/1617
    // https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      //  # do you update if need
      // this.getDariyResult();
      this.setState({ afterAddNew: this.state.afterAddNew + 1 });
    });
  }

  // https://facebook.github.io/react-native/docs/images.html
  getIconURI = (day) => {
    const uri = [
      require('../../assets/icon/Sun.png'),
      require('../../assets/icon/Mon.png'),
      require('../../assets/icon/Tue.png'),
      require('../../assets/icon/Wed.png'),
      require('../../assets/icon/Thu.png'),
      require('../../assets/icon/Fri.png'),
      require('../../assets/icon/Sat.png'),
    ]
    return uri[day];
  }

  render() {
    const { navigation } = this.props;
    const imgURI = this.getIconURI(this.state.date.getDay());

    return (
      <Root>
        <Container>
          <Header>
            <Body>
              <Title>Dairy</Title>
            </Body>
          </Header>
          <Grid>
            <Row size={3}>
              <Col size={2} style={styles.arrowBtn}>
                <TouchableOpacity onPress={() => this.setDayHandler(-1)}>
                  <Icon name='chevron-thin-left' size={50} color='#333745' />
                </TouchableOpacity>
              </Col>
              <Col size={5} style={styles.datePicker}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                  <Thumbnail large square source={imgURI} />
                </TouchableOpacity>

                <Text>{this.state.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  date={this.state.date}
                  maximumDate={new Date()}
                />
              </Col>
              <Col size={2} style={styles.arrowBtn}>
                {/* <TouchableOpacity onPress={() => this.setDayHandler(1)}> */}
                <TouchableOpacity
                  onPress={this.state.date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) ?
                    () => this.setDayHandler(1) :
                    () => Toast.show({
                      text: 'Time machine is developing!',
                      textStyle: { textAlign: 'center' }
                    })}>
                  <Icon name='chevron-thin-right' size={50} color='#333745' />
                </TouchableOpacity>
              </Col>
            </Row>
            <Row size={7} style={{ backgroundColor: '#635DB7' }}>
              <Content>
                {/* {this.state.dairyResult ? <DiaryContent navi={navigation} dairyResult={this.state.dairyResult} /> : <Text>No dariy</Text>} */}
                {/* {console.log('come from DiaryContent ' + this.state.date)} */}
                <DiaryContent navi={navigation} date={this.state.date} />

                {/* <MealCard style={styles.records} /> */}

              </Content>

            </Row>
          </Grid>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={styles.addFab}
            position="bottomRight"
            // onPress={this.addFabHandler}>
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="add-to-list" />

            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="github" />
            </Button>

          </Fab>
        </Container>
      </Root>
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