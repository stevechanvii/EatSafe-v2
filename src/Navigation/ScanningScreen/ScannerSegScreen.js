'use strict';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Button, Segment, Left, Right, Title, Header, Body, Icon } from "native-base";
import Theme from '../../Styles/Theme';
import TextRecognition from './TextRecognition';
import BarcodeScanner from './BarcodeScanner';
import ProductDetailScreen from './ProductDetailScreen';

// this is a segment screen of scanner tab, it will navigate to seg 1 (BarcodeScanner) and seg 2 (TextRecognition)
class scannerSegScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        focusedScreen: true,
        seg: 1
    };

    // Refer to react navigation lifecycle, everytime switch to another tab, 
    // the camera will be rerendered to turn off (render empty component)
    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({ focusedScreen: true })
        );
        navigation.addListener('willBlur', () =>
            this.setState({ focusedScreen: false })
        );
    }

    segmentView() {
        // console.log(this.props.navigation.getParam('isAddDairy', false))
        // console.log(this.props.navigation.state.params);
        return (
            <Container style={styles.container}>
            <Header hasSegment androidStatusBarColor={Theme.headerBar.backgroundColor} style={Theme.headerBar} >
                {/* <Header hasSegment> */}
                    <Body style={Theme.headerBar}>
                        <Segment style={Theme.headerBar}>
                            <Button
                                active={this.state.seg === 1 ? true : false}
                                first
                                onPress={() => this.setState({ seg: 1 })}>
                                <Text>Scanner</Text>
                            </Button>
                            <Button
                                last
                                active={this.state.seg === 2 ? true : false}
                                onPress={() => this.setState({ seg: 2 })}>
                                <Text>Text Recognition</Text>
                            </Button>
                        </Segment>
                    </Body>

                </Header>
                {this.state.seg === 1 && <BarcodeScanner navigation={this.props.navigation} />}

                {/* testing */}
                {/* {this.state.seg === 1 && <ProductDetailScreen navigation={this.props.navigation} />} */}
                {this.state.seg === 2 && <TextRecognition navigation={this.props.navigation} />}
            </Container>
        );
    };

    render() {
        const { focusedScreen } = this.state;
        if (focusedScreen) {
            return (this.segmentView());
        } else {
            return <Container />;
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff"
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});

export default scannerSegScreen;