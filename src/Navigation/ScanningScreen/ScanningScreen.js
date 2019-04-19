'use strict';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container, Text, Header, Content, Button, Icon, Left, Right, Body, Segment } from "native-base";
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import TextRecognitionScreen from './TextRecognitionScreen';


export default class barCodeScanning extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        barcode: null,
        showCamera: true,
        // true is scanner, false is text recognition
        scannerTextRecog: true,
        focusedScreen: true,
        seg: 1
    };

    toggleScannerTextRecog() {
        this.setState({ scannerTextRecog: !this.state.scannerTextRecog })
    }

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

    onBarCodeEvent = (event) => {
        this.setState({
            barcode: event.data,
            // showCamera: false
        });
        // alert(event.type + '  ' +event.data);
        this.props.navigation.navigate('ProductDetail', {
            barcodeType: event.type,
            barcode: event.data
        });
    };

    scannerView() {
        return (

            <RNCamera
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                captureAudio={false}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                onBarCodeRead={this.state.showCamera ? this.onBarCodeEvent.bind(this) : null}
                barCodeTypes={[
                    RNCamera.Constants.BarCodeType.aztec,
                    RNCamera.Constants.BarCodeType.code128,
                    RNCamera.Constants.BarCodeType.code39,
                    RNCamera.Constants.BarCodeType.code39mod43,
                    RNCamera.Constants.BarCodeType.code93,
                    RNCamera.Constants.BarCodeType.ean13,
                    RNCamera.Constants.BarCodeType.ean8,
                    RNCamera.Constants.BarCodeType.pdf417
                ]}
            >
                <BarcodeMask width={300} height={100} />

            </RNCamera>

        );
    };

    segmentView() {
        return (
            <Container style={styles.container}>
                <Header hasSegment>
                    <Body>
                        <Segment>
                            <Button
                                active={this.state.seg === 1 ? true : false}
                                first
                                onPress={() => this.setState({ seg: 1 })}
                            >
                                <Text>Scanner</Text>
                            </Button>
                            <Button
                                last
                                active={this.state.seg === 2 ? true : false}
                                onPress={() => this.setState({ seg: 2 })}
                            >
                                <Text>Text Recognition</Text>
                            </Button>
                        </Segment>
                    </Body>

                </Header>
                {this.state.seg === 1 && this.scannerView()}
                {this.state.seg === 2 && <TextRecognitionScreen />}
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
        // backgroundColor: 'black',
        backgroundColor: "#fff"
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});