import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Button, ActionSheet, Icon, Root, Accordion, Right, Left, Title, View } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import EmotionIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Preference from '../../../Preferences/Preferences';

class mealCard extends Component {
  state = {
    clicked: null
  }

  actionSheetHandler = (index) => {
    this.setState({ clicked: index });
    console.log('index ' + index);
    if (index === 'Modify') {
      this.props.navi.navigate('AddDairy', { date: new Date() });
      console.log(this.props.navi);
    } else if (index === 'Delete') {
      this.deleteMeal();
    }
  }

  // retrive the value, then find the object which need to remove, then save entire value
  deleteMeal = async () => {
    // const value = await AsyncStorage.getItem(theKey);
    // if (value !== null) {
    //   var index = array.indexOf(theItem);
    //   if (index > -1) {
    //     value.splice(index, 1);
    //   }
    // }
    // AsyncStorage.setItem(theKey, value);
  }

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
    const BUTTONS = ["Modify", "Delete", "Cancel"];
    const DESTRUCTIVE_INDEX = 1;
    const CANCEL_INDEX = 2;

    return (
      <Root>
        <Grid onPress={() =>
          ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              destructiveButtonIndex: DESTRUCTIVE_INDEX,
              title: "Select an option"
            },
            (buttonIndex) => {
              this.actionSheetHandler(BUTTONS[buttonIndex]);
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
      </Root>
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
    console.log(dataArray);

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