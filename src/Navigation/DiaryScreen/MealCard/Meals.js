import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Button, Input, Icon, Body, Accordion, Right, Left, Title, View } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import EmotionIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const dataArray = [
  {
    title: "Milk",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur sunt itaque adipisci quisquam pariatur qui, reiciendis architecto quod sint incidunt labore nisi totam illum numquam non magnam praesentium, maxime quaerat!"
  },
  {
    title: "Second Element",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur sunt itaque adipisci quisquam pariatur qui, reiciendis architecto quod sint incidunt labore nisi totam illum numquam non magnam praesentium, maxime quaerat!"
  },
  {
    title: "Third Element",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur sunt itaque adipisci quisquam pariatur qui, reiciendis architecto quod sint incidunt labore nisi totam illum numquam non magnam praesentium, maxime quaerat!"
  }
];

class mealCard extends Component {
  _renderHeader(item, expanded) {
    return (
      <Grid style={styles.grid}>
        <Col size={1} style={styles.emotionRow}>
          <EmotionIcon
            name='emoticon-cool-outline'
            size={50}
          // style={styles.emotion} 
          />
        </Col>
        <Col size={3}>
          <Grid>
            <Row style={styles.infoCol} >
              <Text style={{ fontWeight: "600", marginEnd: '2%' }}>
                {item.title}
              </Text>
              <Text note>12:00</Text>
            </Row>
            <Row style={{ alignItems: "flex-start" }}>
              <Text note>Feeling Well</Text>
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
  _renderContent(item) {
    return (
      <Text
        style={{
          backgroundColor: "#e3f1f1",
          padding: 10,
          fontStyle: "italic"
        }}
      >
        {item.content}
      </Text>
    );
  }
  render() {
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