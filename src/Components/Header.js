import React from 'react';
import { Left, Right, Title, Header, Body, Icon } from 'native-base';
import Theme from '../Styles/Theme';

/**
 * @func header header for root page of each tab
 * @param {Object} props contains title
 */
const header = (props) => (
    <Header androidStatusBarColor={Theme.headerBar.backgroundColor} style={Theme.headerBar} >
        <Body>
            <Title style={Theme.title}>{props.title}</Title>
        </Body>
    </Header>
);

export default header;