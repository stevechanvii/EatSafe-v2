import React from 'react';
import { Container, Text } from 'native-base';
import ScanSVG from '../../../assets/svg/scan_svg';

/**
 * @class lostNetworkw is the child component of productDetailScreen.js
 */
const lostNetwork = () => (
    <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ScanSVG.Network width={140} height={140} />
        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold", margin: 30 }}>Sorry, Lost Network Connection!</Text>
    </Container>
);

export default lostNetwork;
