import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, Left, Body, Right } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Meals from './Meals';

const logo = require("../../../assets/logo.jpg");

class NHCardImage extends Component {
  render() {
    return (

      <Content padder >
        <Card style={styles.mb}>
          <CardItem style={styles.CardHeader}>
            <Left>
              <Thumbnail source={logo} />
              <Body>
                <Text>Breakfast</Text>
                <Text note>Breakfast</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem cardBody style={styles.CardBody}>
            <Meals />
          </CardItem>
        </Card>
      </Content>

    );
  }
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
    borderTopLeftRadius: 10
  },
  CardBody: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  mb: {
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1
  }
});
export default NHCardImage;
