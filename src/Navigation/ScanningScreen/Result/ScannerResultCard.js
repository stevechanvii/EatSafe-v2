import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Content, Card, CardItem, Text, Button, H2, Accordion, Left, Body, View } from 'native-base';
import Modal from "react-native-modal";
import UnderScoreToJSX from '../../../Components/Format/UnderScoreToJSX';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LanguageFilter from '../../../Utils/LanguageFilter';
import Theme from '../../../Styles/Theme';
import Preference from '../../../Preferences/Preferences';
import AllergensDetector from '../../../Utils/AllergensDetector';

/**
 * @class scannerResultCard shows the result after user scaned if data exist from open food facts,
 * it also give alert when user set the allergens or intolerance
 */
class scannerResultCard extends Component {
    state = {
        isModalVisible: false,
        alert: []
    };

    /**
     * @func toggleModal haldle whether show allergen detected alert
     */
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    /**
     * @func componentWillMount call userAllergensAlert() when component initialized
     */
    componentWillMount = () => {
        this.userAllergensAlert();
    }

    /**
     * @func userAllergensAlert retrive the allergens and intolerance from Async Storage and compare with
     * preset allergen and intolerance map in Preference, this function is performed by AllergensDetector.js
     */
    userAllergensAlert = async () => {
        // check ingredientList exist first!
        if (this.props.productDetail.ingredients.text === 'Ingredients Not Found') {
            return;
        }

        try {
            // get all the allergens and intolerance from database
            let values;
            try {
                values = await AsyncStorage.multiGet(['allergens', 'intolerance']);
            } catch (e) {
                // read error
                console.log(e);
            }

            const allergenObj = {};
            // iterate all allergens and intolerance and find allergens only true
            values.map(el => {
                if (el[1]) {
                    Object.entries(JSON.parse(el[1])).forEach(([key, value]) => {
                        // find corresponding value in Preference
                        if (JSON.parse(value)) {
                            if (key in Preference.Allergens) {
                                allergenObj[key] = Preference.Allergens[key];
                            } else if (key in Preference.Intolerance) {
                                allergenObj[key] = Preference.Intolerance[key];
                            } else {
                                allergenObj[key] = [];
                            }
                        }
                    });
                }
            });

            // return if no sensitive ingredients found
            if (Object.entries(allergenObj).length === 0 && allergenObj.constructor === Object) {
                return
            }

            // iterate ingredients obj from parameter and change into Array ingredientsList
            const ingredientsList = [];
            this.props.productDetail.ingredients.map(obj => {
                ingredientsList.push(obj.text);
            });

            // compare the allergens and intolerance which user suffer from with the ingredients
            const diagnose = AllergensDetector(allergenObj, ingredientsList);
            if (diagnose.length > 0) {
                // remove duplicant in diagnose
                diagnoseCleaned = [...new Set(diagnose)];

                this.setState({ alert: diagnoseCleaned });
                this.toggleModal();
            }

        } catch (e) {
            console.log(e);
            // read error
        }
    }

    /**
     * @func renderModalContent modal content (alert)
     */
    renderModalContent = () => (
        <View style={styles.content}>
            <Text style={styles.contentTitle}>Allergens Detected!</Text>
            <Text style={{padding: 10}}>{this.state.alert.join(', ')}</Text>
            <TouchableOpacity onPress={this.toggleModal} style={styles.allergenAllertBtn}>
                <Text style={styles.allergenAllertText}>Close</Text>
            </TouchableOpacity>
            {/* <Button
                onPress={this.toggleModal}
                style={styles.allergenBtn}>
                <Text>Close</Text>
            </Button> */}
        </View>
    );



    render() {
        let productAllergens = '';
        if (this.props.productDetail.allergens) {
            productAllergens = this.props.productDetail.allergens;
            // userAllergensAlert(productAllergens);
        } else {
            productAllergens = null;
        }

        // convert ingredients object to list
        const allergenList = [];
        let cleanedAllergenList = [];
        this.props.productDetail.ingredients.map(ingredient => {
            allergenList.push(ingredient.text);
            // remove the duplicant
            cleanedAllergenList = [...new Set(allergenList)];
        });

        return (
            <Content padder style={Theme.body}>

                <Card style={styles.card} >
                    <CardItem style={styles.cardItem} >
                        <View style={styles.imageView}>
                            <Image
                                source={this.props.productDetail.image !== 'Image Not Found' ?
                                    { uri: this.props.productDetail.image.toString() } :
                                    require('../../../assets/allergies_image.jpg')}
                                style={styles.image}
                            />
                        </View>
                    </CardItem>
                    <CardItem style={styles.cardItem} >
                        <Left>
                            <Body>
                                <Text style={{ paddingBottom: 5 }}><H2>{this.props.productDetail.productName}</H2></Text>
                                <Grid>
                                    <Row>
                                        <Grid>
                                            <Col size={1}>
                                                {this.props.productDetail.brands ? <Text>Brand</Text> : <View />}
                                            </Col>
                                            <Col size={3}>
                                                {this.props.productDetail.brands ? <Text note>{this.props.productDetail.brands}</Text> : <View />}
                                            </Col>
                                        </Grid>
                                    </Row>
                                    <Row>
                                        <Grid>
                                            <Col size={1}>
                                                {this.props.productDetail.genericName ? <Text>Category</Text> : <View />}
                                            </Col>
                                            <Col size={3}>
                                                {this.props.productDetail.genericName ? <Text note>{this.props.productDetail.genericName}</Text> : <View />}
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
                                                <Modal
                                                    isVisible={this.state.isModalVisible}
                                                    animationIn="slideInUp"
                                                    animationOut="slideOutDown"
                                                >
                                                    {this.renderModalContent()}
                                                </Modal>
                                            </Col>
                                        </Grid>
                                    </Row>
                                    <Row>
                                        {this.props.productDetail.ingredients ? <Text style={{ paddingTop: 5 }}>Ingredients</Text> : <View />}
                                    </Row>
                                    <Row>
                                        {this.props.productDetail.ingredients ? <UnderScoreToJSX ingredients={this.props.productDetail.ingredients} /> : <View />}
                                    </Row>

                                </Grid>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
                <Button
                    style={styles.addDiaryBtn}
                    onPress={() => {
                        this.props.navigation.navigate(
                            'CreateDairy',
                            {
                                navigation: this.props.navigation,
                                name: this.props.productDetail.productName.toString(),
                                ingredients: cleanedAllergenList
                            });
                    }} >
                    <Text>Add {this.props.productDetail.productName} to Dairy</Text>
                </Button>
            </Content>
        );
    }
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
    },
    content: {
        backgroundColor: 'white',
        // padding: 22,
        margin: 27,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginTop: 15
    },
    allergenAllertBtn: {
        marginTop: 7,
        backgroundColor: '#FB9D5D',
        width: '100%',
        height: 45,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    allergenAllertText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18
    }

});

export default scannerResultCard;