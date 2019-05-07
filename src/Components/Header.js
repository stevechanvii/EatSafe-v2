import React from 'react';
import { Left, Right, Title, Header, Body, Icon } from 'native-base';
import Theme from '../Styles/Theme';

const header = (props) => (
    <Header androidStatusBarColor={Theme.headerBar.backgroundColor} style={Theme.headerBar} >
        <Body>
            <Title>{props.title}</Title>
        </Body>
    </Header>
);

export default header;