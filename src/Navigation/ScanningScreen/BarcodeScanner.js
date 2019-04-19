import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

const barcodeScanner = ({ navigation }) => {
    onBarCodeEvent = (event) => {
        navigation.navigate('ProductDetail', {
            barcodeType: event.type,
            barcode: event.data
        });
    };
    
    return (
        <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
            captureAudio={false}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onBarCodeRead={this.onBarCodeEvent.bind(this)}
            barCodeTypes={[
                RNCamera.Constants.BarCodeType.aztec,
                RNCamera.Constants.BarCodeType.code128,
                RNCamera.Constants.BarCodeType.code39,
                RNCamera.Constants.BarCodeType.code39mod43,
                RNCamera.Constants.BarCodeType.code93,
                RNCamera.Constants.BarCodeType.ean13,
                RNCamera.Constants.BarCodeType.ean8,
                RNCamera.Constants.BarCodeType.pdf417
            ]}>
            <BarcodeMask width={300} height={100} />
        </RNCamera>
    );
};

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default barcodeScanner;