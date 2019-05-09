import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Container, Header, Left, Right, Title, Body, Icon, Text, Button } from 'native-base';
import Theme from '../../Styles/Theme';
// import CardShowCase from './Card/CardShowCase';
import ProductNotFound from './Card/ProductNotFound';
import ScannerResultCard from './Card/ScannerResultCard';

class productDetailScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        isLoading: true
    }

    // componentDidMount() {
    componentWillMount() {
        const { navigation } = this.props;
        const barcode = navigation.getParam('barcode', 'NO-Code');
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
            });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        // const { navigation } = this.props;
        // cobnst barcodeType = navigation.getParam('arcodeType', 'NO-Type');
        // const barcode = navigation.getParam('barcode', 'NO-Code');

        if (this.state.productName === false) {
            return (
                <ProductNotFound barcode={this.state.barcode} />
            )
        }

        return (
            <Container>
                <Header androidStatusBarColor={Theme.headerBar.backgroundColor} style={Theme.headerBar} >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" style={Theme.back} />
                            <Text style={Theme.back}>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={Theme.title}>Scanner</Title>
                    </Body>
                    <Right />
                </Header>
                {/* <CardShowCase productDetail={this.state} navigation={this.props.navigation.getParam('navigation', 'No-Navigation')} /> */}
                
                {/* testing */}
                <ScannerResultCard productDetail={this.state} navigation={this.props.navigation.getParam('navigation', 'No-Navigation')} />
            </Container>
        );
    }
}

export default productDetailScreen;