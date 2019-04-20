import React from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Card, CardItem, Text, Button, Left, Body, H2, Accordion } from 'native-base';
import UnderScoreToJSX from '../Format/UnderScoreToJSX';
import Icon from 'react-native-vector-icons/Feather';

userAllergensAlert = async (productAllergens) => {
    const keys = ['milk', 'soy', 'seafood'];
    let userAllergens = [];
    try {
        // get the allergens from database, and saves in userAllergens
        values = await AsyncStorage.multiGet(keys);
        values.map((el, index) => {
            if (JSON.parse(el[1])) {
                userAllergens.push(keys[index]);
            }
        });
        console.log(userAllergens + ' userAllergens');

        // search the allergen in the ingredients, if found then save in allergenAlert
        let allergenAlert = [];
        userAllergens.map(el => {
            if (productAllergens.search(el) >= 0) {
                allergenAlert.push(el);
            }
        });

        // if allergenAlert size greater than 0, then formate and alert
        if (allergenAlert.length > 0) {
            let str = '';
            allergenAlert.map(el => {
                str += el;
                str += ' ';
            });
            alert(`Allergens ${str}detected!`);
        }

    } catch (e) {
        // read error
    }
}

// this is a stateless component which handle show case with pic and text
const cardShowCase = (props) => {
    const productAllergens = props.productDetail.allergens.toString();
    userAllergensAlert(productAllergens);

    values = [];

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    return (
        <Container>
            {/* <Header /> */}
            <Content>
                <Card style={{ flex: 1 }}>
                    <CardItem>
                        <Left>
                            {/* <Thumbnail source={{ uri: 'Image URL' }} /> */}
                            <Body>
                                <Text><H2>{props.productDetail.productName.toString()}</H2></Text>
                                <Text note>{props.productDetail.genericName.toString()}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Image source={props.productDetail.image !== 'Image Not Found' ? { uri: props.productDetail.image.toString() } : require('../../asserts/allergies_image.jpg')}
                                style={{ height: 200, width: '100%', flex: 1 }} />
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent >
                                <Icon name="alert-circle" size={16} color='red' />
                                <Text style={{ color: "black", fontSize: 16 }}>ALLERGENS</Text>
                            </Button>
                        </Left>
                        <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text note style={{ color: "black", fontSize: 15 }}>{productAllergens.split(",").filter(onlyUnique).join(",").replace(/en:/g, "").replace(/fr:/g, "")}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent >
                                <Icon name="alert-circle" size={16} color='red' />
                                <Text style={{ color: "black", fontSize: 15 }}>TRACES</Text>
                            </Button>
                        </Left>
                        <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text note style={{ color: "black", fontSize: 15 }}>{props.productDetail.traces.toString().split(",").filter(onlyUnique).join(",").replace(/en:/g, "").replace(/fr:/g, "")}</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Accordion
                    dataArray={[{ title: "Ingredients", content: <UnderScoreToJSX ingredients={props.productDetail.ingredients} /> }]}
                    icon="add"
                    expandedIcon="remove"
                    animation={true}
                />
            </Content>
        </Container>
    );
}


export default cardShowCase;