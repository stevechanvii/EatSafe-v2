import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Content, ActionSheet, Accordion } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Col, Row, Grid } from 'react-native-easy-grid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EmotionSVG from '../../../assets/svg/emotion_svg';

/**
 * @class meals is the child component of MealContent.js which displays or delete meals within a card
 */
class meals extends Component {
  state = {
    clicked: null,
    mealDetails: this.props.info
  }

  /**
   * @func actionSheetHandler modify (not implemented) and delete in the pop up modle
   * @param {number} index is the clicked button id
   * @param {number} sheetId is the clicked meal key (refers to data structure in AddDiaryScreen.js)
   */
  actionSheetHandler = (index, sheetId) => {
    this.setState({ clicked: index });
    if (index === 'Modify') {
      this.props.navi.navigate('AddDairy', { date: new Date() });
    } else if (index === 'Delete') {
      this.deleteMeal(sheetId);
    }
  }

  /**
   * @func deleteMeal retrive the meal, then delete the object which match sheetId, then save entire value in Async Storage
   * @param {number} sheetId is the clicked meal key (refers to data structure in AddDiaryScreen.js)
   */
  deleteMeal = async (sheetId) => {
    const mealName = this.props.meal;
    let dayValue = await AsyncStorage.getItem(this.props.dateKey);
    dayValue = JSON.parse(dayValue);
    if (dayValue !== null) {

      // if the specific meal is not null
      if (dayValue[mealName] !== null) {
        delete dayValue[mealName][sheetId];

        // check specific meal contains avlue, if does not have value, delete meal then save
        if (Object.keys(dayValue[mealName]).length === 0 && dayValue[mealName].constructor === Object) {
          delete dayValue[mealName];

          // check whether today contains value, if not delete today
          if (Object.keys(dayValue).length === 0 && dayValue.constructor === Object) {
            try {
              await AsyncStorage.removeItem(this.props.dateKey);
            } catch(e) {
              //  error
              console.log(e);
            }
          } else {
            AsyncStorage.setItem(this.props.dateKey, JSON.stringify(dayValue));
          }
        } else {
          AsyncStorage.setItem(this.props.dateKey, JSON.stringify(dayValue));
        }

        // call refresh function in DiaryContent.js and rerender the diary content
        this.props.refreshCards();
      }
    }
  }

  /**
   * @func EmotionIcon hanle the icons of different emotion
   * @param {String} feel 
   * @param {number} width 
   * @param {number} height 
   * @param {String} color 
   */
  EmotionIcon = (feel, width, height, color) => {
    switch (feel) {
      case 'Excellent':
        return (<EmotionSVG.Excellent width={width} height={height} color={color} />);
      case 'Good':
        return (<EmotionSVG.Good width={width} height={height} color={color} />);
      case 'So So':
        return (<EmotionSVG.SoSo width={width} height={height} color={color} />);
      case 'Not Well':
        return (<EmotionSVG.NotWell width={width} height={height} color={color} />);
      case 'Awful':
        return (<EmotionSVG.Awful width={width} height={height} color={color} />);
    }
  }

  /**
   * @func _renderHeader header of meal contains icon and name
   * @param {Object} item info of the meal, from dataArray
   * @param {Boolean} expanded whether content expanded
   */
  _renderHeader = (item, expanded) => {
    return (
      <Grid style={styles.grid}>
        {/* <Col size={1} style={styles.emotionRow}>
          <EmotionIcon
            name={Preference.Feelings[item.feel]}
            size={50}
          />
        </Col> */}
        <Col size={4}>
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
            ? <MaterialIcons size={25} name="expand-less" />
            : <MaterialIcons size={25} name="expand-more" />}
        </Col>
      </Grid>
    );
  }

  /**
   * @func _renderContent content of each meal, contains ingredients and comments, its clickable and can be delete
   * @param {Object} item info of the meal, from dataArray
   */
  _renderContent = (item) => {
    // settings for pop up modle
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
            <Col size={1} >
              {this.EmotionIcon(item.feel, 40, 40, '#333745')}
            </Col>
            <Col size={6} >
              <Grid>
                <Row>
                  <Col size={2} ><Text>Ingredients</Text></Col>
                  <Col size={4} ><Text>{item.ingredients}</Text></Col>
                </Row>
                <Row>
                  <Col size={2} >{item.comments ? <Text>Comments</Text> : <Text></Text>}</Col>
                  <Col size={4} ><Text>{item.comments}</Text></Col>
                </Row>

              </Grid>
            </Col>
          </Grid>
        </Row>
      </Grid>
    );
  }

  render() {
    const dataArray = [];
    Object.entries(this.props.info).forEach(([key, val]) => {
      const obj = {
        key: key,
        ...val,
        time: new Date(JSON.parse(val.time))
      }
      dataArray.push(obj);
    });

    return (
      <Content padder >
        <Accordion
          dataArray={dataArray}
          animation={true}
          expanded={true}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          style={styles.Accordion}
        />
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    paddingVertical: 10,
    marginTop: 5,
    borderTopWidth: 1,
    borderColor: '#DFDFDF'
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
  },
  Accordion: {
    borderWidth: 0,

  }
});

export default meals;