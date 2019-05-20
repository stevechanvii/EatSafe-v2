import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, H3, View, Thumbnail, Text, Button, Left, Body, H2, Accordion } from 'native-base';
import defaultIngredients from '../../Preferences/Ingredients.js';
import Modal from "react-native-modal";
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderGoBack from '../../Components/HeaderGoBack';
import ScanSVG from '../../assets/svg/scan_svg';
import Preference from '../../Preferences/Preferences';
import AllergensDetector from '../../Utils/AllergensDetector';

var stringSimilarity = require('string-similarity');

const excluterms = ["nutrition", "information", "serving", "per", "package", "size", "energy", "protein", "total", "carbohydrate", "sodium", "average", "quantity", "daily", "intake", "ml", "mg", "g", "kj", "contains", "caffeine", "calcium"]

/**
 * @class recognitionResultScreen shows the result after user use text recognition,
 * it also give alert when user set the allergens or intolerance
 * 
 * this component also perform data clearning and validation
 * 
 * this component is in mess, clearning should move to utils
 */
export default class recognitionResultScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        isLoading: false,
        // textList: [],

        ingredList: [],
        isModalVisible: false,
        alert: [],
    }

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
        const ingredList = this.dataClearning();
        this.userAllergensAlert(ingredList);
    }

    /**
     * @func userAllergensAlert retrive the allergens and intolerance from Async Storage and compare with
     * preset allergen and intolerance map in Preference, this function is performed by AllergensDetector.js
     */
    userAllergensAlert = async (ingredList) => {
        // check ingredientList exist first!
        console.log(ingredList)
        if (ingredList.length === 0) {
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

            console.log(allergenObj)
            // return if no sensitive ingredients found
            if (Object.entries(allergenObj).length === 0 && allergenObj.constructor === Object) {
                return
            }

            // compare the allergens and intolerence which user suffer from with the ingredients
            const diagnose = AllergensDetector(allergenObj, ingredList);
            console.log(diagnose)
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
        <View style={styles.contentModal}>
            <Text style={styles.contentTitle}>Allergens Detected!</Text>
            <Text style={{ padding: 10 }}>{this.state.alert.join(', ')}</Text>
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

    componentDidMount() {
        // const { navigation } = this.props;

        // this.setState({
        //     textList: navigation.getParam('textList', 'No-text')
        // })
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

    dataClearning = () => {
        textListAdv = []
        clearText = []
        uniqtext = []
        subText = []
        textpair = []
        finaltext = []
        ingredList = []
        Ingredients = defaultIngredients
        this.props.navigation.getParam('textList', 'No-text').map(el => (textListAdv = textListAdv.concat(el.toLowerCase().split("\n"))))
        textListAdv.map(el => (clearText = clearText.concat(this.prepText(el))))
        clearText.map(el => ((!uniqtext.includes(el)) & el.length > 2 ? uniqtext = uniqtext.concat(el) : null))
        uniqtext.map(el => (!this.subtextCheck(el, uniqtext) ? subText = subText.concat(el) : null))
        text_ingred = subText.join(" ")
        Ingredients.map(el => (text_ingred.includes(el) ? ingredList = ingredList.concat(el) : null))

        console.log(ingredList);
        this.setState({ ingredList: ingredList });
        console.log(this.state.ingredList)
        return ingredList;
    }

    render() {
        return (
            <Container>
                <HeaderGoBack navigation={this.props.navigation} title='Recognition' />
                <Content>
                    <Grid>
                        <Row style={styles.gridCenter}>
                            <ScanSVG.TextScan height={200} width={200} />
                        </Row>
                        <Row style={styles.gridCenter}>
                            {console.log(this.state)}
                            <H3 style={{ marginTop: 40 }}>{this.state.ingredList.length > 0 ? 'We found following ingredients' : 'No ingredients found'}</H3>
                        </Row>
                        <Row style={styles.gridCenter}>
                            <Text style={{ margin: 30 }}>{this.state.ingredList.join(', ')}</Text>
                            <Modal
                                isVisible={this.state.isModalVisible}
                                animationIn="slideInUp"
                                animationOut="slideOutDown"
                            >
                                {this.renderModalContent()}
                            </Modal>
                        </Row>
                        <Button
                            style={styles.addDiaryBtn}
                            onPress={() => {
                                this.props.navigation.navigate(
                                    'CreateDairy',
                                    {
                                        navigation: this.props.navigation,
                                        ingredients: this.state.ingredList
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
    },
    contentModal: {
        backgroundColor: 'white',
        // padding: 22,
        margin: 27,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    gridCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },

});
