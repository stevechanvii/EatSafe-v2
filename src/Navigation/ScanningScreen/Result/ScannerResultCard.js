import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Content, Card, CardItem, Text, Button, H2, Accordion, Left, Body, View } from 'native-base';
import Modal from "react-native-modal";
import UnderScoreToJSX from '../../../Components/Format/UnderScoreToJSX';
import { Col, Row, Grid } from 'react-native-easy-grid';
import LanguageFilter from '../../../Utils/LanguageFilter';
import Theme from '../../../Styles/Theme';
import Feather from 'react-native-vector-icons/Feather';

// this component is in great mass!!!!! and may cause big problem! need reconstrust
class scannerResultCard extends Component {
    state = {
        isModalVisible: false
    };

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    componentWillMount = () => {
        this.userAllergensAlert(this.props.productDetail.allergens);
    }

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
                this.setState({ allergens: str });
                this.toggleModal();
                console.log(this.state.allergens);
                console.log(this.state.isModalVisible);
            }

        } catch (e) {
            // read error
        }
    }

    renderModalContent = () => (
        <View style={styles.content}>
            <Text style={styles.contentTitle}>{`Allergens ${this.state.allergens}detected!`}</Text>
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
                                                    animationIn="slideInLeft"
                                                    animationOut="slideOutRight"
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