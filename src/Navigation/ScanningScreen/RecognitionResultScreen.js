import React, { Component } from 'react';
import { Image, AsyncStorage, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, H2, Accordion } from 'native-base';
import defaultIngredients from '../../Preferences/Ingredients.js';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderGoBack from '../../Components/HeaderGoBack';

var stringSimilarity = require('string-similarity');

const excluterms = ["nutrition", "information", "serving", "per", "package", "size", "energy", "protein", "total", "carbohydrate", "sodium", "average", "quantity", "daily", "intake", "ml", "mg", "g", "kj", "contains", "caffeine", "calcium"]

export default class recognitionResultScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        isLoading: false,
        textList: []
    }

    componentDidMount() {
        const { navigation } = this.props;

        this.setState({
            textList: navigation.getParam('textList', 'No-text')
        })
    }

    prepText(text) {
        textbuff = text.replace(/[^a-zA-Z ]/g, "").trim()
        if (excluterms.some(term => textbuff.includes(term))) {
            return "";
        }
        else
            return textbuff;
    }

    match(elem, array) {
        templist = []
        templist = templist.concat(array.slice(0, array.indexOf(elem))).concat(array.slice(array.indexOf(elem) + 1, array.length))
        return stringSimilarity.findBestMatch(this.prepText(elem), templist)
    }

    subtextCheck(elem, array) {
        templist = []
        subtextList = []
        templist = templist.concat(array.slice(0, array.indexOf(elem))).concat(array.slice(array.indexOf(elem) + 1, array.length))
        templist.map(el => (el.startsWith(elem) & elem.length > 2 ? subtextList = subtextList.concat(el) : null))
        return subtextList.length > 0
    }

    betterHalf(elem) {
        first = elem[0]
        second = elem[1]
        if (elem[0].replace(/[ ]/g, "").length >= elem[1].replace(/[ ]/g, "").length) {
            return first
        }
        else {
            return second
        }
    }

    stringSplitter(text, len) {
        let a = [];
        for (let i = 0; i <= text.length - len; i++) {
            a = a.concat(text.slice(i, i + len));
        }
        return a
    }

    fuzzySubString(elem, text) {
        var ingPresent = false
        arrText = this.stringSplitter(text, elem.length)
        if (arrText.length > 0) {
            stringMatch = stringSimilarity.findBestMatch(elem, arrText)
            if (stringMatch["bestMatch"]["rating"] > 0.8) {
                ingPresent = true
            }
        }
        return ingPresent
    }

    render() {
        textListAdv = []
        clearText = []
        uniqtext = []
        subText = []
        textpair = []
        finaltext = []
        ingredList = []
        Ingredients = defaultIngredients
        this.state.textList.map(el => (textListAdv = textListAdv.concat(el.toLowerCase().split("\n"))))
        textListAdv.map(el => (clearText = clearText.concat(this.prepText(el))))
        clearText.map(el => ((!uniqtext.includes(el)) & el.length > 2 ? uniqtext = uniqtext.concat(el) : null))
        uniqtext.map(el => (!this.subtextCheck(el, uniqtext) ? subText = subText.concat(el) : null))
        text_ingred = subText.join(" ")
        Ingredients.map(el => (text_ingred.includes(el) ? ingredList = ingredList.concat(el) : null))

        return (
            <Container>
                <HeaderGoBack navigation={this.props.navigation} title='Text Recognition' />
                <Content>
                    <Grid>
                        <Row style={styles.gridCenter}>
                            <Image source={require('../../assets/img/icons8-rescan-document-100.png')} />
                        </Row>
                        <Row style={styles.gridCenter}>
                            <Text>We found following Ingredients</Text>
                        </Row>
                        <Row>
                            <Text>{ingredList.join(', ')}</Text>
                        </Row>
                        <Button
                            style={styles.addDiaryBtn}
                            onPress={() => {
                                this.props.navigation.navigate(
                                    'CreateDairy',
                                    {
                                        navigation: this.props.navigation,
                                        ingredients: ingredList
                                    });
                            }} >
                            <Text>Add to Dairy</Text>
                        </Button>
                    </Grid>


                </Content>
            </Container>
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
        marginTop: 15,
        alignSelf: 'center',
        width: '90%',
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
    },
    gridCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },

});
