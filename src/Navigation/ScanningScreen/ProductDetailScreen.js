import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Container, Left, Right, Title, Body, Icon, Text, Button } from 'native-base';
import Theme from '../../Styles/Theme';
import ProductNotFound from './Result/ProductNotFound';
import ScannerResultCard from './Result/ScannerResultCard';
import LostNetwork from './Result/LostNetwork';
import NetInfo from "@react-native-community/netinfo";
import HeaderGoBack from '../../Components/HeaderGoBack';

/**
 * @class productDetailScreen handles the API request to https://worldopenfoodfacts.org after barcode scanned,
 * it extract the detail of return JSON and send the valuable data to ScannerResultCard.js
 * 
 * this component is in a mess!! set state not needed!!
 */
class productDetailScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        isLoading: true,
        isLostnetwork: false,
    }

    /**
     * @func componentWillMount fetch the data from open food fact and extract useful values
     */
    componentWillMount() {
        const { navigation } = this.props;
        const barcode = navigation.getParam('barcode', 'NO-Code');
        // internet connection check
        NetInfo.getConnectionInfo().then(data => {
            if (data.type === 'cellular' || data.type === 'wifi') {
                return fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode.toString()}.json`)

                    // testing
                    // return fetch(`https://world.openfoodfacts.org/api/v0/product/93600057.json`)
                    .then((response) => response.json())
                    .then((responseJson) => {

                        if (responseJson.status_verbose.toString() === 'product not found') {
                            this.setState({
                                isLoading: false,
                                barcode: barcode,
                                productName: false
                            });
                        } else {
                            this.setState({
                                isLoading: false,
                                barcode: barcode,
                                productName: responseJson.product.product_name ? responseJson.product.product_name : false,
                                // be careful bugs here, if product not exist, these won't found
                                ingredients: responseJson.product.ingredients ? responseJson.product.ingredients : [{ 'text': 'Ingredients Not Found' }],
                                // ingredients: responseJson.product.ingredients_text_with_allergens ? responseJson.product.ingredients_text_with_allergens : false,
                                allergens: responseJson.product.allergens ? responseJson.product.allergens : false,
                                image: responseJson.product.image_url ? responseJson.product.image_url : 'Image Not Found',
                                traces: responseJson.product.traces_tags ? responseJson.product.traces_tags : '',
                                categories: responseJson.product.categories_tags ? responseJson.product.categories_tags : false,
                                nutrientLevel: responseJson.product.nutrient_levels ? responseJson.product.nutrient_levels : 'Nutrient Level Not Found',
                                genericName: responseJson.product.generic_name ? responseJson.product.generic_name : false,
                                brands: responseJson.product.brands ? responseJson.product.brands : false
                            }, function () {

                            });

                        }
                    }

                    )
                    .catch((error) => {
                        console.error(error);
                        this.setState({ isLostnetwork: true });
                    });
            } else {
                this.setState({ isLostnetwork: true });
            }
        });
    }

    render() {
        // check the network status
        if (this.state.isLostnetwork) {
            return (
                <Container>
                    <HeaderGoBack navigation={this.props.navigation} title='Scanner' />
                    <LostNetwork />
                </Container>
            );
        }

        // wait for fetching data
        if (this.state.isLoading) {
            return (
                <Container>
                    <HeaderGoBack navigation={this.props.navigation} title='Scanner' />
                    <ActivityIndicator />
                </Container>
            )
        }

        // check the product exist
        if (this.state.productName === false) {
            return (
                <Container>
                    <HeaderGoBack navigation={this.props.navigation} title='Scanner' />
                    <ProductNotFound barcode={this.props.navigation.getParam('barcode', 'NO-Code')} />
                </Container>

            )
        }

        return (
            <Container>
                <HeaderGoBack navigation={this.props.navigation} title='Scanner' />
                <ScannerResultCard productDetail={this.state} navigation={this.props.navigation.getParam('navigation', 'No-Navigation')} />
            </Container>
        );
    }
}

export default productDetailScreen;