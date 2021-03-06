'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

/**
 * @class textRecognitionScreen is the child component of ScannerSegScreen.js which calls the camera sensor
 * and perform text recognition by Google Machine Learning Engine
 */
class textRecognitionScreen extends Component {
    state = {
        canDetectText: true,
        textBlocks: []
    };

    // contains all the text camera recognized in each onTextRecognizedEvent
    allTextList = [];

    /**
     * @func onTextRecognizedEvent once camera detect text, this function will be invoked
     * @param {Object} object please refer to RNCamera doc
     */
    onTextRecognizedEvent = object => {
        const { textBlocks } = object;
        this.setState({ textBlocks });

        console.log(object);
        // save all the text camera detected into allTextList Array
        textBlocks.map(el => {
            this.allTextList.push(el.value);
        });
        
    };

    /**
     * @func buttonHandler detect button
     */
    buttonHandler = () => {
        this.props.navigation.navigate('RecognitionResult', {
            textList: this.allTextList,
            navigation: this.props.navigation,
        });
    }

    /**
     * @func renderTextBlocks render text block on top of canera screen
     */
    renderTextBlocks = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.textBlocks.map(this.renderTextBlock)}
        </View>
    );

    /**
     * @func renderTextBlock render text inside text block
     * @param {Object} bounds demension of detected text
     * @param {String} value detected text
     */
    renderTextBlock = ({ bounds, value }) => (
        <React.Fragment key={value + bounds.origin.x}>
            <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
                {value}
            </Text>
            <View
                style={[
                    styles.text,
                    {
                        ...bounds.size,
                        left: bounds.origin.x,
                        top: bounds.origin.y,
                    },
                ]}
            />
        </React.Fragment>
    );

    render() {
        const { canDetectText } = this.state;
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                captureAudio={false}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                onTextRecognized={this.state.canDetectText ? this.onTextRecognizedEvent : null} >
                {/* <View style={{
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}> */}
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={this.buttonHandler} style={styles.flipButton}>
                        <Text style={styles.flipText}>
                            {!canDetectText ? 'Detect Text' : 'Detecting Text'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.renderTextBlocks()}
            </RNCamera>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    // bottom: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     marginBottom: 36
    //   },
      bottom: {
        position: 'absolute',
        left: '30%',
        bottom:'10%',
        justifyContent: 'center', 
        alignItems: 'center'
      }
});

export default textRecognitionScreen;