import React from 'react';
import { Left, Right, Title, Header, Body, Icon, Button, Text } from 'native-base';
import Theme from '../Styles/Theme';

/**
 * @func headheaderGoBacker header for child page of roots
 * @param {Object} props contains title and navigation
 */
const headerGoBack = (props) => {
    return (
        <Header androidStatusBarColor={Theme.headerBar.backgroundColor} style={Theme.headerBar} >
            <Left>
                <Button transparent onPress={() => props.navigation.goBack()}>
                    <Icon name="arrow-back" style={Theme.back} />
                    <Text style={Theme.back}>Back</Text>
                </Button>
            </Left>
            <Body>
                <Title style={Theme.title}>{props.title}</Title>
            </Body>
            <Right />
        </Header>
    );
}

export default headerGoBack;