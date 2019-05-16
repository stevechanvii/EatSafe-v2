import React from 'react';
import { Image, StyleSheet,Modal } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Content, Card, CardItem, Text, Button, H2, Accordion, Left, Body, View } from 'native-base';
// import UnderScoreToJSX from '../../../Components/Format/UnderScoreToJSX';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LanguageFilter from '../../../Utils/LanguageFilter';
import Theme from '../../../Styles/Theme';
import Feather from 'react-native-vector-icons/Feather';

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
            // alert(`Allergens ${str}detected!`);

            // return (
            //     <Modal animationType="slide"
            //     transparent={false}
            //     visible={this.state.modalVisible}
            //     onRequestClose={() => {
            //       Alert.alert('Modal has been closed.');
            //     }}>
            //         <View>hello</View>
            //     </Modal>
            // );
        }

    } catch (e) {
        // read error
    }
}


// navigationOptions = {
//     headerStyle: {
//         backgroundColor: 'red',
//     },
// }

// this is a stateless component which handle show case with pic and text
const cardShowCase = (props) => {
    let productAllergens = '';
    if (props.productDetail.allergens) {
        productAllergens = props.productDetail.allergens;
        userAllergensAlert(productAllergens);
    } else {
        productAllergens = null;
    }
    

    values = [];

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    return (
        <Content padder style={Theme.body} showsVerticalScrollIndicator={false}>
        
            <Card style={styles.card} >
                <CardItem style={styles.cardItem} >
                    <View style={styles.imageView}>
                        <Image
                            source={props.productDetail.image !== 'Image Not Found' ?
                                { uri: props.productDetail.image.toString() } :
                                require('../../../assets/allergies_image.jpg')}
                            style={styles.image}
                        />
                    </View>
                </CardItem>
                <CardItem style={styles.cardItem} >
                    <Left>
                        <Body>
                            <Text style={{ paddingBottom: 5 }}><H2>{props.productDetail.productName}</H2></Text>
                            <Grid>
                                <Row>
                                    <Grid>
                                        <Col size={1}>
                                            {props.productDetail.brands ? <Text>Brand</Text> : <View />}
                                        </Col>
                                        <Col size={3}>
                                            {props.productDetail.brands ? <Text note>{props.productDetail.brands}</Text> : <View />}
                                        </Col>
                                    </Grid>
                                </Row>
                                <Row>
                                    <Grid>
                                        <Col size={1}>
                                            {props.productDetail.genericName ? <Text>Category</Text> : <View />}
                                        </Col>
                                        <Col size={3}>
                                            {props.productDetail.genericName ? <Text note>{props.productDetail.genericName}</Text> : <View />}
                                        </Col>
                                    </Grid>
                                </Row>
                                <Row>
                                    <Grid>
                                        <Col size={1}>
                                            {productAllergens ? <Text>Allergens</Text> : <View />}
                                        </Col>
                                        <Col size={3}>
                                            {productAllergens ? <Text note>{LanguageFilter(productAllergens).join(', ')}</Text> : <View />}
                                        </Col>
                                    </Grid>
                                </Row>
                                <Row>
                                    {props.productDetail.ingredients ? <Text style={{ paddingTop: 5 }}>Ingredients</Text> : <View />}
                                </Row>
                                <Row>
                                    {props.productDetail.ingredients ? <UnderScoreToJSX ingredients={props.productDetail.ingredients} /> : <View />}
                                </Row>
                                
                            </Grid>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
            
            <Button
                style={styles.addDiaryBtn}
                onPress={() => {
                    props.navigation.navigate(
                        'CreateDairy',
                        {
                            navigation: props.navigation,
                            name: props.productDetail.productName.toString(),
                            ingredients: props.productDetail.ingredients
                        });
                }} >
                <Text>Add {props.productDetail.productName} to Dairy</Text>
            </Button>
        </Content>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: "#FFF",
    },
    cardItem: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        borderRadius: 10,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
    },
    imageView: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        height: 200,
        width: '100%',
    },
    addDiaryBtn: {
        backgroundColor: '#FB9D5D',
        marginTop: 5,
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default cardShowCase;