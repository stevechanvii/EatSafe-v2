import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Fab, Toast, Root, Button, Body, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { FloatingAction } from 'react-native-floating-action';
import Header from '../../Components/Header';
import DateTimePicker from "react-native-modal-datetime-picker";
import Entypo from 'react-native-vector-icons/Entypo';
import Theme from '../../Styles/Theme';
import KeyGenerator from '../../Utils/KeyGenerator';
import DiaryContent from './DiaryContent';
import DayCalendarSVG from '../../assets/svg/day_calendar_svg';
import ScanSVG from '../../assets/svg/scan_svg';


export default class diaryScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    date: new Date(),
    dairyResult: null,
    afterAddNew: 0,
    isDateTimePickerVisible: false
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

  floatingActionHandler = (name) => {
    if (name === 'btn_input') {
      // console.log('floatingActionHandler ' + this.state.date);
      this.props.navigation.navigate('AddDairy', { date: this.state.date });
    } else if (name === 'btn_scan') {
      // pass isAddDairy to scanner
      // this.props.navigation.navigate('Scanning', { isAddDairy: true });
      this.props.navigation.navigate('Scanning', { date: new Date() });
    }
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

  dayCalender = (date) => {
    switch (date.getDay()) {
      case 0:
        return (<DayCalendarSVG.Sunday width={80} height={80} />);
      case 1:
        return (<DayCalendarSVG.Monday width={80} height={80} />);
      case 2:
        return (<DayCalendarSVG.Tuesday width={80} height={80} />);
      case 3:
        return (<DayCalendarSVG.Wednesday width={80} height={80} />);
      case 4:
        return (<DayCalendarSVG.Thursday width={80} height={80} />);
      case 5:
        return (<DayCalendarSVG.Friday width={80} height={80} />);
      case 6:
        return (<DayCalendarSVG.Saturday width={80} height={80} />);
    }
  }

  render() {
    const { navigation } = this.props;

    // define the float action button
    const actions = [{
      text: 'Create by Input',
      icon: <Entypo name='pencil' size={20} />,
      name: 'btn_input',
      position: 2,
      color: '#DD5144'
    }, {
      text: 'Add by Scanning',
      icon: <ScanSVG  width={20} height={20} />,
      name: 'btn_scan',
      position: 1,
      color: '#E84D0B'
    }];
    
    return (
      <Root>
        <Container>
          <Header title='Dairy' />
          <Grid style={Theme.body} >
            <Row size={2}>
              <Col size={2} style={styles.arrowBtn}>
                <TouchableOpacity onPress={() => this.setDayHandler(-1)}>
                  <Entypo name='chevron-thin-left' size={50} color='#333745' />
                </TouchableOpacity>
              </Col>
              <Col size={5} style={styles.datePicker}>
                <TouchableOpacity onPress={this.showDateTimePicker}>
                  {this.dayCalender(this.state.date)}
                </TouchableOpacity>
                {/* {console.log('TouchableOpacity ' + this.state.date)} */}
                <Text>{this.state.date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  date={this.state.date}
                  titleIOS='Pick a Date'
                  maximumDate={new Date()}
                />
              </Col>
              <Col size={2} style={styles.arrowBtn}>
                {/* <TouchableOpacity onPress={() => this.setDayHandler(1)}> */}
                <TouchableOpacity
                  onPress={KeyGenerator.dateKeyGenerator(this.state.date) < KeyGenerator.dateKeyGenerator(new Date()) ?
                    () => this.setDayHandler(1) :
                    () => Toast.show({
                      text: 'Time machine is developing!',
                      textStyle: { textAlign: 'center' }
                    })}>
                  <Entypo name='chevron-thin-right' size={50} color='#333745' />
                </TouchableOpacity>
              </Col>
            </Row>
            {/* <Row size={8} style={{ backgroundColor: '#635DB7' }}> */}
            <Row size={8} >
              <Content showsVerticalScrollIndicator={false}>
                {/* {this.state.dairyResult ? <DiaryContent navi={navigation} dairyResult={this.state.dairyResult} /> : <Text>No dariy</Text>} */}
                {/* {console.log('come from DiaryContent ' + this.state.date)} */}
                <DiaryContent navi={navigation} date={this.state.date} />

                {/* <MealCard style={styles.records} /> */}

              </Content>
            </Row>
          </Grid>

          <FloatingAction
            actions={actions}
            onPressItem={(name) => { this.floatingActionHandler(name) }}
            color='#E55934' />
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
    justifyContent: 'center',
    // backgroundColor: 
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
    // backgroundColor: '#C7EFCF'
  },
  addFab: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5067FF'
  }
});