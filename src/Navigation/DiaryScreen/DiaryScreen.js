import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Content, Toast, Root } from 'native-base';
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

/**
 * @class diaryScreen is the main entry for Diary which contains date picker content and diary content (DiaryContent.js)
 */
export default class diaryScreen extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    date: new Date(),
    afterAddNew: 0,
    isDateTimePickerVisible: false
  };

  /**
   * @func showDateTimePicker show date picker
   */
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  /**
   * @func hideDateTimePicker hide date picker
   */
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  /**
   * @func handleDatePicked set new date
   * @param {Object} date 
   */
  handleDatePicked = date => {
    this.setState({ date: new Date(date) });
    this.hideDateTimePicker();
  };

  /**
   * @func setDayHandler set the date when user click go forward or backward
   * @param {number} operator either 1 or -1
   */
  setDayHandler = operator => {
    const nextDay = this.state.date;
    nextDay.setDate(nextDay.getDate() + operator);
    this.setState({ date: nextDay });
  };

  /**
   * @func floatingActionHandler control float action button
   * @param {String} name name of sub button
   */
  floatingActionHandler = (name) => {
    if (name === 'btn_input') {
      this.props.navigation.navigate('AddDairy', { date: this.state.date });
    } else if (name === 'btn_scan') {
      // parameter may not successfully passed because they are not in same navigation stack
      this.props.navigation.navigate('Scanning', { date: new Date() });
    }
  };

  /**
   * @func componentDidMount before dairy tab get focus, rerender this screen
   */
  componentDidMount() {
    // https://github.com/react-navigation/react-navigation/issues/1617
    // https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      //  # do you update if need
      this.setState({ afterAddNew: this.state.afterAddNew + 1 });
    });
  }

  /**
   * @func dayCalender handle calender icons
   * @param {Object} date js date object
   */
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
      color: '#C94A3E'
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
            <Row size={8} >
              <Content showsVerticalScrollIndicator={false}>
                <DiaryContent navi={navigation} date={this.state.date} />
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