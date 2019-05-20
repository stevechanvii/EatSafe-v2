import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, Header, Content, Thumbnail, Text, Button, Badge, Body, ListItem } from 'native-base';

/**
 * @class lostNetworkw is the child component of productDetailScreen.js
 */
const lostNetwork = () => (
    <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Icon name='comment-alert-outline' size={40} />
        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>Sorry, Lost Network Connection!</Text>
    </Container>
);

export default lostNetwork;
