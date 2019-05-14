import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Thumbnail, Left, Body, View } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Meals from './Meals';
import MealSVG from '../../../assets/svg/meal_svg';


const mealIcon = (meal) => {
  switch (meal) {
    case 'Breakfast':
      return (<MealSVG.Breakfast width={50} height={50} />);
    case 'Brunch':
      return (<MealSVG.Brunch width={50} height={50} />);
    case 'Lunch':
      return (<MealSVG.Lunch width={50} height={50} />);
    case 'Afternoon Tea':
      return (<MealSVG.AfternoonTea width={50} height={50} />);
    case 'Dinner':
      return (<MealSVG.Dinner width={50} height={50} />);
    case 'Midnight Sanck':
      return (<MealSVG.MidnightSanck width={50} height={50} />);
  }
}

const NHCardImage = (props) => {
  return (
    <Content style={styles.content} >
      <Card style={styles.mb}>
        <CardItem style={styles.CardHeader}>
          <Left>
            {mealIcon(props.meal)}
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
    borderWidth: 1,
    backgroundColor: '#ffffff'
  },
  content: {
    // marginVertical: 5,
    marginHorizontal: 10
  }
});
export default NHCardImage;
