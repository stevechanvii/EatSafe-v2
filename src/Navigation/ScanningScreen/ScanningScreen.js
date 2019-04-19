'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
// import { Container, Text, Thumbnail, Header, Content, Accordion } from "native-base";
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';


export default class barCodeScanning extends Component {
    state = {
        barcode: null,
        showCamera: true,
        // true is scanner, false is text recognition
        scannerTextRecog: true,
        focusedScreen: true
    };

    toggleScannerTextRecog () {
        this.setState({scannerTextRecog: !this.state.scannerTextRecog})
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

    cameraView() {
        return (
            <View style={styles.container}>
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
            </View>
        );
    };

    render() {
        // return (
            // <View style={styles.container}>
            //     <RNCamera
            //         style={styles.preview}
            //         type={RNCamera.Constants.Type.back}
            //         flashMode={RNCamera.Constants.FlashMode.auto}
            //         captureAudio={false}
            //         permissionDialogTitle={'Permission to use camera'}
            //         permissionDialogMessage={'We need your permission to use your camera phone'}
            //         onBarCodeRead={this.state.showCamera ? this.onBarCodeEvent.bind(this) : null}
            //         barCodeTypes={[
            //             RNCamera.Constants.BarCodeType.aztec,
            //             RNCamera.Constants.BarCodeType.code128,
            //             RNCamera.Constants.BarCodeType.code39,
            //             RNCamera.Constants.BarCodeType.code39mod43,
            //             RNCamera.Constants.BarCodeType.code93,
            //             RNCamera.Constants.BarCodeType.ean13,
            //             RNCamera.Constants.BarCodeType.ean8,
            //             RNCamera.Constants.BarCodeType.pdf417
            //             ]}
            //         >
            //         <Button onPress={this.toggleScannerTextRecon} title="Learn More" />
            //         {/* <BarcodeMask width={300} height={100} />  */}

            //     </RNCamera>
            // </View>

            const { focusedScreen } = this.state;
            if (focusedScreen){
                return (this.cameraView());
              } else {
                return <View />;
              }
        // );
    }

    // takePicture = async function (camera) {
    //     const options = { quality: 0.5, base64: true };
    //     const data = await camera.takePictureAsync(options);
    //     //  eslint-disable-next-line
    //     console.log(data.uri);
    // };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
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