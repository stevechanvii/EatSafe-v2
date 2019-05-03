import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Button, ActionSheet, Icon, Accordion, Right, Left, Title, View } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Col, Row, Grid } from 'react-native-easy-grid';
import EmotionIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Preference from '../../../Preferences/Preferences';

class mealCard extends Component {
  state = {
    clicked: null,
    mealDetails: this.props.info
  }

  actionSheetHandler = (index, sheetId) => {
    this.setState({ clicked: index });
    if (index === 'Modify') {
      this.props.navi.navigate('AddDairy', { date: new Date() });
    } else if (index === 'Delete') {
      this.deleteMeal(sheetId);
    }
  }

  // retrive the value, then find the object which need to remove, then save entire value
  deleteMeal = async (sheetId) => {
    const mealName = this.props.meal;
    let dayValue = await AsyncStorage.getItem(this.props.dateKey);
    dayValue = JSON.parse(dayValue);
    if (dayValue !== null) {
      // console.log('dayValue');
      // console.log(dayValue);
      if (dayValue[mealName] !== null) {
        delete dayValue[mealName][sheetId];
        // console.log('deleteMeal');
        // console.log(dayValue);
        // console.log(this.state.mealDetails);
        // if ( dayValue[mealName] !== {}){
        if (Object.keys(dayValue[mealName]).length === 0 && dayValue[mealName].constructor === Object){
          delete dayValue[mealName];
          AsyncStorage.setItem(this.props.dateKey, JSON.stringify(dayValue));
          // console.log('null');
          // console.log(dayValue[mealName]);
        } else {
          // console.log('not null');
          // console.log(dayValue[mealName]);
          AsyncStorage.setItem(this.props.dateKey, JSON.stringify(dayValue));
          
        }
        // this.setState({ mealDetails: dayValue[mealName] });
        this.props.refreshCards();

      }
    }
  }

  // componentWillReceiveProps(newProps) {
  //   this.setState({ mealDetails: this.props.info });
  //   console.log('tttttttttt');
  // }

  _renderHeader = (item, expanded) => {
    return (
      <Grid style={styles.grid}>
        <Col size={1} style={styles.emotionRow}>
          <EmotionIcon
            name={Preference.Feelings[item.feel]}
            size={50}
          />
        </Col>
        <Col size={3}>
          <Grid>
            <Row style={styles.infoCol} >
              <Text style={{ fontWeight: "600", marginEnd: '2%' }}>
                {item.food}
              </Text>
              <Text note>{item.time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</Text>
            </Row>
            <Row style={{ alignItems: "flex-start" }}>
              <Text note>{item.symptom}</Text>
            </Row>
          </Grid>
        </Col>
        <Col size={1} style={styles.expandBth} >
          {expanded
            ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
            : <Icon style={{ fontSize: 18 }} name="add-circle" />}
        </Col>
      </Grid>
    );
  }

  _renderContent = (item) => {
    // const BUTTONS = ["Modify", "Delete", "Cancel"];
    // const DESTRUCTIVE_INDEX = 1;
    // const CANCEL_INDEX = 2;

    const BUTTONS = ["Delete", "Cancel"];
    const DESTRUCTIVE_INDEX = 0;
    const CANCEL_INDEX = 1;

    return (
        <Grid
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Select an option"
              },
              (buttonIndex) => {
                this.actionSheetHandler(BUTTONS[buttonIndex], item.key);
              }
            )
          }>
          <Row>
            <Grid>
              <Col size={2}></Col>
              <Col size={3}>
                <Text>Ingredients</Text>
              </Col>
              <Col size={5}>
                <Text>{item.ingredients}</Text>
              </Col>
            </Grid>
          </Row>
          <Row>
            <Grid>
              <Col size={2}></Col>
              <Col size={3}>
                <Text>Comments</Text>
              </Col>
              <Col size={5}>
                <Text>{item.comments}</Text>
              </Col>
            </Grid>
          </Row>
        </Grid>
    );
  }

  render() {
    const dataArray = [];
    // console.log(this.props.info);
    // console.log(this.state.mealDetails);
    Object.entries(this.props.info).forEach(([key, val]) => {
      const obj = {
        key: key,
        ...val,
        time: new Date(JSON.parse(val.time))
      }
      dataArray.push(obj);
    });
    // console.log('dataArray');
    // console.log(dataArray);
    // console.log('dateKey ' + this.props.dateKey);

    return (
      <Content padder >
        <Accordion
          dataArray={dataArray}
          animation={true}
          expanded={true}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    backgroundColor: "#F3FFBD"
  },
  emotionRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emotion: {
    marginHorizontal: '2%',
  },
  infoCol: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  expandBth: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default mealCard;