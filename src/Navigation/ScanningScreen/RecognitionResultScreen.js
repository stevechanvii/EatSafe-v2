import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, H2, Accordion } from 'native-base';
import defaultIngredients from '../../Preferences/Ingredients.js';
var stringSimilarity = require('string-similarity');


const excluterms = ["nutrition", "information", "serving", "per", "package", "size", "energy", "protein", "total", "carbohydrate", "sodium", "average", "quantity", "daily", "intake", "ml", "mg", "g", "kj", "contains", "caffeine", "calcium"]

export default class recognitionResultScreen extends Component {

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
        subText.map(el => (this.match(el, subText)["bestMatch"]["rating"] > 0.5 ? textpair = textpair.concat([[el, this.match(el, subText)["bestMatch"]["target"]]]) : null))
        textpair.map(el => (!finaltext.includes(this.betterHalf(el)) ? finaltext = finaltext.concat(this.betterHalf(el)) : null))
        Ingredients.map(el => (finaltext.join(" ").includes(el) ? ingredList = ingredList.concat(el) : null))
        ingredList = ingredList.concat("-------")
        Ingredients = Ingredients.filter(word => !ingredList.includes(word))
        Ingredients.map(el => (this.fuzzySubString(el, finaltext.join(" ")) ? ingredList = ingredList.concat(el) : null))

        return (
            <Container>
                {/* <Header /> */}
                <Content>
                    {ingredList.map(el => (
                        <Text key={Math.random()}>{el + ","}</Text>
                    ))}
                </Content>
            </Container>
        );
    }
}
