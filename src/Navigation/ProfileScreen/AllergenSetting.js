import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Text, Button, H2, Root, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderGoBack from '../../Components/HeaderGoBack';
import AllergenSVG from '../../assets/svg/allergens_svg';
import IntoleranceSVG from '../../assets/svg/intolerance_svg';
import Theme from '../../Styles/Theme';

/**
 * @class allergenSetting is the child component of profileScreen.
 * 
 * This component saves allergens and intolerance to Async Storage
 */
class allergenSetting extends Component {
    static navigationOptions = {
        header: null
    }

    // receive allergens and intolerance from parent component as default value
    state = {
        allergens: { ...this.props.navigation.getParam('allergens', {}) },
        intolerance: { ...this.props.navigation.getParam('intolerance', {}) },
    }

    /**
     * @func saveHandler saves data, then call refresh function
     */
    saveHandler = () => {
        this.setAllergens();

        /**
         * DESABLED
         * 
         * Warning: Can't perform a React state update on an unmounted component. 
         * This is a no-op, but it indicates a memory leak in your application. 
         * To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
         */
        // Toast.show({
        //     text: 'Saved',
        //     textStyle: { textAlign: 'center' }
        // });

        // call the refresh function in parent conponent and send current state as parameter
        this.props.navigation.state.params.refresh(
            this.state
        );
        console.log(this.state);
    };

    /**
     * @func setAllergens saves allergens and intolerance to Async Storage
     */
    setAllergens = async () => {
        const allergens = ["allergens", JSON.stringify(this.state.allergens)];
        const intolerance = ["intolerance", JSON.stringify(this.state.intolerance)];
        try {
            await AsyncStorage.multiSet([allergens, intolerance])
        } catch (e) {
            //save error
            console.log(e);
        }
        console.log("Done.")
    }

    /**
     * @func toggleIntoleranceBtn set new state when intolerance button is clicked
     * @param {string} key name of the clicked button 
     */
    toggleIntoleranceBtn = (key) => {
        this.setState({
            intolerance: {
                ...this.state.intolerance,
                [key]: !this.state.intolerance[key]
            }
        }, () => this.saveHandler());
    }

    /**
     * @func toggleAllergenBtn set new state when allergen button is clicked
     * @param {string} key name of the clicked button 
     */
    toggleAllergenBtn = (key) => {
        this.setState({
            allergens: {
                ...this.state.allergens,
                [key]: !this.state.allergens[key]
            }
        }, () => this.saveHandler());
    }


    render() {
        return (
            <Root>
                <Container>
                    <HeaderGoBack navigation={this.props.navigation} title='Setting' />
                    <Content>
                        <Grid style={Theme.body}>
                            <Row style={styles.gridCenter}><H2 style={styles.title}>Set Allergens</H2></Row>
                            <Row>
                                <Grid>
                                    <Row style={styles.rowMargin}>
                                        <Grid>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleAllergenBtn('egg')}>
                                                    <AllergenSVG.Egg style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.egg} />
                                                    <Text style={styles.iconCenter}>Egg</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleAllergenBtn('peanut')}>
                                                    <AllergenSVG.Peanut style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.peanut} />
                                                    <Text style={styles.iconCenter}>Peanut</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleAllergenBtn('milk')}>
                                                    <AllergenSVG.Milk style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.milk} />
                                                    <Text style={styles.iconCenter}>Milk</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleAllergenBtn('soy')}>
                                                    <AllergenSVG.Soy style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.soy} />
                                                    <Text style={styles.iconCenter}>Soy</Text>
                                                </TouchableOpacity>
                                            </Col>
                                        </Grid>
                                    </Row>

                                    <Row style={styles.rowMargin}>
                                        <Grid>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleAllergenBtn('fish')}>
                                                    <AllergenSVG.Fish style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.fish} />
                                                    <Text style={styles.iconCenter}>Fish</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleAllergenBtn('sesame')}>
                                                    <AllergenSVG.Sesame style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.sesame} />
                                                    <Text style={styles.iconCenter}>Sesame</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleAllergenBtn('gluten')}>
                                                    <AllergenSVG.Gluten style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.gluten} />
                                                    <Text style={styles.iconCenter}>Gluten</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleAllergenBtn('shellfish')}>
                                                    <AllergenSVG.Shellfish style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.shellfish} />
                                                    <Text style={styles.iconCenter}>Shellfish</Text>
                                                </TouchableOpacity>
                                            </Col>
                                        </Grid>
                                    </Row>

                                    <Row style={styles.rowMargin}>
                                        <Grid>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleAllergenBtn('nuts')}>
                                                    <AllergenSVG.Nuts style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.nuts} />
                                                    <Text style={styles.iconCenter}>Nuts</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleAllergenBtn('celery')}>
                                                    <AllergenSVG.Celery style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.celery} />
                                                    <Text style={styles.iconCenter}>Celery</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                {/* <TouchableOpacity onPress={() => this.toggleAllergenBtn('milk')}>
                                                <AllergenSVG.Milk style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.milk} />
                                                <Text style={styles.iconCenter}>Milk</Text>
                                            </TouchableOpacity> */}
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                {/* <TouchableOpacity onPress={() => this.toggleAllergenBtn('soy')}>
                                                <AllergenSVG.Soy style={styles.iconCenter} height={60} width={60} isAllergic={this.state.allergens.soy} />
                                                <Text style={styles.iconCenter}>Soy</Text>
                                            </TouchableOpacity> */}
                                            </Col>
                                        </Grid>
                                    </Row>
                                </Grid>
                            </Row>

                            <Row style={styles.gridCenter}><H2 style={styles.title}>Set Intolerance</H2></Row>

                            <Row>
                                <Grid>
                                    <Row style={styles.rowMargin}>
                                        <Grid>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('caffeine')}>
                                                    <IntoleranceSVG.Caffeine style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.caffeine} />
                                                    <Text style={styles.iconCenter}>Caffeine</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('alcohol')}>
                                                    <IntoleranceSVG.Alcohol style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.alcohol} />
                                                    <Text style={styles.iconCenter}>Alcohol</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('salt')}>
                                                    <IntoleranceSVG.Salt style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.salt} />
                                                    <Text style={styles.iconCenter}>Salt</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('sugar')}>
                                                    <IntoleranceSVG.Sugar style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.sugar} />
                                                    <Text style={styles.iconCenter}>Sugar</Text>
                                                </TouchableOpacity>
                                            </Col>
                                        </Grid>
                                    </Row>

                                    <Row style={styles.rowMargin}>
                                        <Grid>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('sweetener')}>
                                                    <IntoleranceSVG.Sweetener style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.sweetener} />
                                                    <Text style={styles.iconCenter}>Sweetener</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('pork')}>
                                                    <IntoleranceSVG.Pork style={styles.iconCenter} height={55} width={55} isAllergic={this.state.intolerance.pork} />
                                                    <Text style={styles.iconCenter}>Pork</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('beef')}>
                                                    <IntoleranceSVG.Beef style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.beef} />
                                                    <Text style={styles.iconCenter}>Beef</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('chicken')}>
                                                    <IntoleranceSVG.Chicken style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.chicken} />
                                                    <Text style={styles.iconCenter}>Chicken</Text>
                                                </TouchableOpacity>
                                            </Col>
                                        </Grid>
                                    </Row>

                                    <Row style={styles.rowMargin}>
                                        <Grid>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('lamb')}>
                                                    <IntoleranceSVG.Lamb style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.lamb} />
                                                    <Text style={styles.iconCenter}>Lamb</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('carrot')}>
                                                    <IntoleranceSVG.Carrot style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.carrot} />
                                                    <Text style={styles.iconCenter}>Carrot</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('garlic')}>
                                                    <IntoleranceSVG.Garlic style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.garlic} />
                                                    <Text style={styles.iconCenter}>Garlic</Text>
                                                </TouchableOpacity>
                                            </Col>
                                            <Col size={1} style={styles.gridCenter}>
                                                <TouchableOpacity onPress={() => this.toggleIntoleranceBtn('chili')}>
                                                    <IntoleranceSVG.Chili style={styles.iconCenter} height={60} width={60} isAllergic={this.state.intolerance.chili} />
                                                    <Text style={styles.iconCenter}>Chilli</Text>
                                                </TouchableOpacity>
                                            </Col>
                                        </Grid>
                                    </Row>
                                </Grid>
                            </Row>

                            <Row style={{ height: 50 }}>
                                {/* <Button style={Theme.button} onPress={this.saveHandler} >
                                    <Text>Save</Text>
                                </Button> */}
                            </Row>
                        </Grid>

                    </Content>
                </Container>
            </Root>
        );
    }
};

const styles = StyleSheet.create({
    gridCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCenter: {
        alignSelf: 'center',
    },
    rowMargin: {
        padding: 5,
    },
    title: {
        marginTop: 15,
        marginBottom: 10
    }

});


export default allergenSetting;