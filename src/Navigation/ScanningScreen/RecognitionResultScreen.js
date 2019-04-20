import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, H2, Accordion } from 'native-base';

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

    render() {
        return (
            <Container>
                {/* <Header /> */}
                <Content>
                    {this.state.textList.map(el => (<Text>{el}</Text>))}

                </Content>
            </Container>
        );
    }
}
