import React from 'react';
import { StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

/**
 * @class barcodeScanner is the child component of ScannerSegScreen.js which calls the camera sensor
 * @param { navigation } navigation from parent component
 */
const barcodeScanner = ({ navigation }) => {

    /**
     * @func onBarCodeEvent once camera scanned a barcode, this function will be invoked
     * @param {Object} event please refer to RNCamera doc
     */
    onBarCodeEvent = (event) => {
        navigation.navigate('ProductDetail', {
            barcodeType: event.type,
            barcode: event.data,
            navigation: navigation
        });
    };

    return (
        <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
            captureAudio={false}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
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