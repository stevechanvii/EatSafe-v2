import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Button, Input, Item, Form } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';

class addDiary extends Component {
    static navigationOptions = {
        title: 'Create Diary',
    };

    state = {};

    render() {
        return (
            <Container>
                <Content>


                    <Form>
                    <Item style={styles.inputItem} >
                        <Icon name='access-time' />
                        <Input placeholder='Time' />
                    </Item>

                    <Item style={styles.inputItem} >
                        <Icon name='restaurant' />
                        <Input placeholder='Food' />
                    </Item>


                    <Item style={styles.inputItem} >
                        <Icon name='mode-edit' />
                        <Input placeholder='Ingredients' />
                    </Item>
                    </Form>

                    <Button info style={{ padding: '10%', alignSelf: 'center', margin: 20 }} onPress={() => this.props.navigation.goBack()} >
                        <Text>Save</Text>
                    </Button>

                </Content>
            </Container>
        );
    };

};

const styles = StyleSheet.create({
    inputItem: {
        marginHorizontal: '3%',
        marginTop: '3%',
        // width: 'auto',
        // height: 'auto',
        // backgroundColor: '#DD9E2C'
    },
});

export default addDiary;