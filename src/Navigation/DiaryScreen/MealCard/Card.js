import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, Left, Body, View } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Meals from './Meals';

const logo = require("../../../assets/icons8-sandwich-96.png");

const NHCardImage = (props) => {

  return (

    <Content style={styles.content} >
      <Card style={styles.mb}>
        <CardItem style={styles.CardHeader}>
          <Left>
            <Thumbnail source={logo} />
            <Body>
              <Text>{props.meal}</Text>
              {/* <Text note>Place Holder</Text> */}
            </Body>
          </Left>
        </CardItem>

        <CardItem cardBody style={styles.CardBody} >
          <Meals
            meal={props.meal}
            info={props.info}
            navi={props.navi}
            dateKey={props.dateKey}
            refreshCards={props.refresh} />
        </CardItem>
      </Card>
    </Content>

  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  CardHeader: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingBottom: 0,
  },
  CardBody: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  mb: {
    // marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  content: {
    // marginVertical: 5,
    marginHorizontal: 10
  }
});
export default NHCardImage;
