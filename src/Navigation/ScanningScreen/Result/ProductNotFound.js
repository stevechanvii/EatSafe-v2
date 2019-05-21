import React from 'react';
import { Container, Text } from 'native-base';
import ScanSVG from '../../../assets/svg/scan_svg';

/**
 * @class productNotFound is the child component of productDetailScreen.js
 */
const productNotFound = (props) => (
    <Container style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* <Icon name='comment-alert-outline' size={40} /> */}
        <ScanSVG.EmptyBox width={140} height={140} />
        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold", marginTop: 30 }}>Sorry, product not found!</Text>
        <Text style={{ color: "black", fontSize: 18 }}>Barcode: {props.barcode}</Text>
    </Container>
);

export default productNotFound;
