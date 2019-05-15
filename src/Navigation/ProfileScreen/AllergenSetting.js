import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Header, Thumbnail, Form, Item, Label, Input, Toast, Content, Text, Left, ListItem, CheckBox, Button, Body, Right, Title, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HeaderGoBack from '../../Components/HeaderGoBack';
import AllergenSVG from '../../assets/svg/allergens_svg';
import Preference from '../../Preferences/Preferences';
import Theme from '../../Styles/Theme';


class allergenSetting extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        ...Object.keys(Preference.Allergens),
    }


    saveHandler = async () => {
        console.log('save Handler invoked!');
        // this.props.navigation.state.params.refresh(this.state);
        // this.props.navigation.goBack();

        this.setAllergens();
    };

    // save all the allergens and intolerance from database
    setAllergens = async () => {
        // read all the allergens from preset data
        const allengensList = Object.keys(Preference.Allergens);

        // save the allengens in state to allengensObj
        const allengensObj = {};
        allengensList.map(allengen => {
            allengensObj[allengen] = this.state[allengen] ? true : false;
        });

        console.log(allengensObj);

        const allengens = ["allengens", JSON.stringify(allengensObj)];
        const intolerance = ["intolerance", JSON.stringify({})];
        try {
            await AsyncStorage.multiSet([allengens, intolerance])
        } catch (e) {
            //save error
            console.log(e);
        }

        console.log("Done.")
    }

    // get all the allergens and intolerance from database
    getAllergens = async () => {
        let values;
        try {
            values = await AsyncStorage.multiGet(['allengens', 'intolerance']);
        } catch (e) {
            // read error
            console.log(e);
        }
        console.log(this.state);
        const obj = {};
        // iterate all allergens and intolerance and save in obj
        values.map(el => {
            console.log(JSON.parse(el[1]))
            if (el[1]) {
                Object.entries(JSON.parse(el[1])).forEach(([key, value]) => {
                    obj[key] = JSON.parse(value);
                });
            }
        });
        this.setState(obj);
        console.log(obj);
    }

    // Search the local database 
    componentDidMount() {
        this.getAllergens();
    }

    toggleBtn = (key) => {
        const obj = {};
        obj[key] = !this.state[key];
        this.setState(obj);
    }


    render() {
        return (
            <Container>
                <HeaderGoBack navigation={this.props.navigation} title='Setting' />
                <Content>
                    <Grid style={Theme.body}>
                        <Row><Text>Set Allergens</Text></Row>
                        <Row>
                            <Grid>
                                <Row style={styles.rowMargin}>
                                    <Grid>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleBtn('egg')}>
                                                <AllergenSVG.Egg style={styles.iconCenter} height={60} width={60} isAllergic={this.state.egg} />
                                                <Text style={styles.iconCenter}>Egg</Text>
                                                {console.log(this.state.egg)}
                                            </TouchableOpacity>
                                        </Col>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleBtn('peanut')}>
                                                <AllergenSVG.Peanut style={styles.iconCenter} height={60} width={60} isAllergic={this.state.peanut} />
                                                <Text style={styles.iconCenter}>Peanut</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleBtn('milk')}>
                                                <AllergenSVG.Milk style={styles.iconCenter} height={60} width={60} isAllergic={this.state.milk} />
                                                <Text style={styles.iconCenter}>Milk</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleBtn('soy')}>
                                                <AllergenSVG.Soy style={styles.iconCenter} height={60} width={60} isAllergic={this.state.soy} />
                                                <Text style={styles.iconCenter}>Soy</Text>
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </Row>

                                <Row style={styles.rowMargin}>
                                    <Grid>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleBtn('fish')}>
                                                <AllergenSVG.Fish style={styles.iconCenter} height={60} width={60} isAllergic={this.state.fish} />
                                                <Text style={styles.iconCenter}>Fish</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleBtn('sesame')}>
                                                <AllergenSVG.Sesame style={styles.iconCenter} height={60} width={60} isAllergic={this.state.sesame} />
                                                <Text style={styles.iconCenter}>Sesame</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleBtn('gluten')}>
                                                <AllergenSVG.Gluten style={styles.iconCenter} height={60} width={60} isAllergic={this.state.gluten} />
                                                <Text style={styles.iconCenter}>Gluten</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleBtn('shellfish')}>
                                                <AllergenSVG.Shellfish style={styles.iconCenter} height={60} width={60} isAllergic={this.state.shellfish} />
                                                <Text style={styles.iconCenter}>Shellfish</Text>
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </Row>

                                <Row style={styles.rowMargin}>
                                    <Grid>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleBtn('nuts')}>
                                                <AllergenSVG.Nuts style={styles.iconCenter} height={60} width={60} isAllergic={this.state.nuts} />
                                                <Text style={styles.iconCenter}>Nuts</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col size={1} style={styles.gridCenter}>
                                            <TouchableOpacity onPress={() => this.toggleBtn('celery')}>
                                                <AllergenSVG.Celery style={styles.iconCenter} height={60} width={60} isAllergic={this.state.celery} />
                                                <Text style={styles.iconCenter}>Celery</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col size={1} style={styles.gridCenter}>
                                            {/* <TouchableOpacity onPress={() => this.toggleBtn('milk')}>
                                                <AllergenSVG.Milk style={styles.iconCenter} height={60} width={60} isAllergic={this.state.milk} />
                                                <Text style={styles.iconCenter}>Milk</Text>
                                            </TouchableOpacity> */}
                                        </Col>
                                        <Col size={1} style={styles.gridCenter}>
                                            {/* <TouchableOpacity onPress={() => this.toggleBtn('soy')}>
                                                <AllergenSVG.Soy style={styles.iconCenter} height={60} width={60} isAllergic={this.state.soy} />
                                                <Text style={styles.iconCenter}>Soy</Text>
                                            </TouchableOpacity> */}
                                        </Col>
                                    </Grid>
                                </Row>
                            </Grid>
                        </Row>

                        <Row><Text>Set Intolerance</Text></Row>

                        <Row style={styles.gridCenter}>
                            <Button style={Theme.button} onPress={this.saveHandler} >
                                <Text>Save</Text>
                            </Button>
                        </Row>
                    </Grid>

                </Content>
            </Container>
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
    }

});


export default allergenSetting;