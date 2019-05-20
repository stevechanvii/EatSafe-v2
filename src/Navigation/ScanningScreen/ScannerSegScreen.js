'use strict';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Button, Segment, Header, Body } from "native-base";
import Theme from '../../Styles/Theme';
import TextRecognition from './TextRecognition';
import BarcodeScanner from './BarcodeScanner';

/**
 * @class scannerSegScreen is the main entry for scanner which contains a segment screen of scanner tab,
 * it will navigate to seg 1 (BarcodeScanner) and seg 2 (TextRecognition)
 */
class scannerSegScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        focusedScreen: true,
        seg: 1
    };

    /**
     * @func componentDidMount Refer to react navigation lifecycle, everytime switch to another tab, 
     * the camera will be rerendered to turn off (render empty component), if not android will crash
     * because camera sensors called more than one time and get crashed
     */
    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({ focusedScreen: true })
        );
        navigation.addListener('willBlur', () =>
            this.setState({ focusedScreen: false })
        );
    }

    /**
     * @func segmentView handle the segment switch button and view
     */
    segmentView() {
        return (
            <Container style={styles.container}>
            <Header hasSegment androidStatusBarColor={Theme.headerBar.backgroundColor} style={Theme.headerBar} >
                {/* <Header hasSegment> */}
                    <Body style={Theme.headerBar}>
                        <Segment style={Theme.headerBar}>
                            <Button
                                active={this.state.seg === 1 ? true : false}
                                first
                                onPress={() => this.setState({ seg: 1 })}
                                style={{backgroundColor: this.state.seg === 1 ? "#E55934" : undefined,
                                borderColor: "#E55934",}}>
                                <Text style={{color: '#FFFFFF'}}>Scanner</Text>
                                {/* <Text style={{ color: this.state.seg === 1 ? "#FFF" : "black" }}>Scanner</Text> */}
                            </Button>
                            <Button
                                last
                                active={this.state.seg === 2 ? true : false}
                                onPress={() => this.setState({ seg: 2 })}
                                style={{backgroundColor: this.state.seg === 2 ? "#E55934" : undefined,
                                borderColor: "#E55934",}}>
                                <Text style={{color: '#FFFFFF'}}>Text Recognition</Text>
                                {/* <Text style={{ color: this.state.seg === 2 ? "#FFF" : "black" }}>Text Recognition</Text> */}
                            </Button>
                        </Segment>
                    </Body>

                </Header>
                {this.state.seg === 1 && <BarcodeScanner navigation={this.props.navigation} />}
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
    },
});

export default scannerSegScreen;