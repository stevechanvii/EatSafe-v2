import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import {Container,Header,Title,Content,Button,Icon,Card,CardItem,Text,Thumbnail,Left,Body,Right} from "native-base";
import Meals from './Meals';

const logo = require("../../../assets/logo.jpg");

class NHCardImage extends Component {
  render() {
    return (

        <Content padder>
          <Card style={styles.mb}>
            <CardItem>
              <Left>
                <Thumbnail source={logo} />
                <Body>
                  <Text>Breakfast</Text>
                  <Text note>Breakfast</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem cardBody>
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
      mb: {
        marginBottom: 15
      }
});
export default NHCardImage;
