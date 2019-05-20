import React from "react";
import { StyleSheet } from "react-native";
import { Content, Card, CardItem, Text, Left, Body } from "native-base";
import Meals from './Meals';
import MealSVG from '../../../assets/svg/meal_svg';

/**
 * @func mealIcon hanle the icons of different meals
 * @param {String} meal 
 */
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
      return (<MealSVG.Snak width={50} height={50} />);
  }
}

/**
 * @func MealContent is the child component of DiaryContent.js which displays card (meal) within a day
 * @param {Object} props includes meal, info (meal details), navi, date key, refresh function from parent component
 */
const MealContent = (props) => {
  console.log(props)
  return (
    <Content style={styles.content} >
      <Card style={styles.mb}>
        <CardItem style={styles.CardHeader}>
        {console.log('1')}
          <Left>
            {mealIcon(props.meal)}
            <Body>
            {console.log('2')}
              <Text>{props.meal}</Text>
              {/* <Text note>Place Holder</Text> */}
            </Body>
          </Left>
        </CardItem>
        {console.log('3')}
        

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

export default MealContent;