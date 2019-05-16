import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Content, Card, CardItem, Text, Button, H2, Accordion, Left, Body, View } from 'native-base';
import Modal from "react-native-modal";
import UnderScoreToJSX from '../../../Components/Format/UnderScoreToJSX';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LanguageFilter from '../../../Utils/LanguageFilter';
import Theme from '../../../Styles/Theme';
import Preference from '../../../Preferences/Preferences';
import AllergensDetector from '../../../Utils/AllergensDetector';


class scannerResultCard extends Component {
    state = {
        isModalVisible: false,
        alert: []
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    componentWillMount = () => {
        this.userAllergensAlert();
    }


    userAllergensAlert = async () => {
        // check ingredientList exist first!
        if (!this.props.productDetail.ingredients){
            return;
        }

        try {
            // get all the allergens and intolerance from database
            let values;
            try {
                values = await AsyncStorage.multiGet(['allengens', 'intolerance']);
            } catch (e) {
                // read error
                console.log(e);
            }
            console.log(this.state);
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

            // iterate ingredients obj from parameter and change into list ingredientsList
            const ingredientsList = [];
            this.props.productDetail.ingredients.map(obj => {
                ingredientsList.push(obj.text);
            });

            const diagnose = AllergensDetector(allergenObj, ingredientsList);
            if (diagnose) {
                // remove duplicant in diagnose
                console.log(diagnose);
                diagnoseCleaned = [...new Set(diagnose)];
                console.log('sss')
                this.setState({ alert: diagnoseCleaned });
                this.toggleModal();

                console.log(diagnoseCleaned);
            }

        } catch (e) {
            // read error
        }
    }

    renderModalContent = () => (
        <View style={styles.content}>
            <Text style={styles.contentTitle}>Allergens detected!</Text>
            {this.state.alert.map(el => (<Text key={Math.random()} >{el}</Text>))}
            <Button
                onPress={this.toggleModal}
                style={styles.allergenBtn}>
                <Text>Close</Text>
            </Button>
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
                                ingredients: this.props.productDetail.ingredients
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
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    allergenBtn: {
        backgroundColor: '#FB9D5D',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default scannerResultCard;