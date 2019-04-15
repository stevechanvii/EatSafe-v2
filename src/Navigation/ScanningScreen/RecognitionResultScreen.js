import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, H2, Accordion } from 'native-base';

export default class recognitionResultScreen extends Component {

    state = {
        isLoading: false
    }

    componentDidMount() {
        const { navigation } = this.props;
        
        this.setState({
            textBlocks: navigation.getParam('textBlocks', 'No-text')
        })
    }

    render() {
        return (
            <Container>
                {/* <Header /> */}
                <Content>
                    <Text>{this.state.textBlocks.map(this.renderTextBlock)}</Text>

                </Content>
            </Container>
        );
    }
}
