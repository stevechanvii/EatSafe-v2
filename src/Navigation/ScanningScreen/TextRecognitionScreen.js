'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
// import BarcodeMask from 'react-native-barcode-mask';


export default class textRecognitionScreen extends Component {
    state = {
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',

        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        recordOptions: {
            mute: false,
            maxDuration: 5,
            quality: RNCamera.Constants.VideoQuality['288p'],
        },
        isRecording: false,
        canDetectFaces: false,
        canDetectText: true,
        canDetectBarcode: false,
        faces: [],
        textBlocks: [],
        barcodes: [],
    };

    onTextRecognizedEvent = object => {
        const { textBlocks } = object;
        this.setState({ textBlocks });

        // alert(event.type + '  ' +event.data);
        // this.props.navigation.navigate('RecognitionResult', { textBlocks });
    };

    renderTextBlocks = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.textBlocks.map(this.renderTextBlock)}
        </View>
    );

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


    toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

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
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                onTextRecognized={this.state.canDetectText ? this.onTextRecognizedEvent : null} >
                <View style={{
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                    <TouchableOpacity onPress={this.toggle('canDetectText')} style={styles.flipButton}>
                        <Text style={styles.flipText}>
                            {!canDetectText ? 'Detect Text' : 'Detecting Text'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.renderTextBlocks()}
            </RNCamera>

        );
    }

    // takePicture = async function (camera) {
    //     const options = { quality: 0.5, base64: true };
    //     const data = await camera.takePictureAsync(options);
    //     //  eslint-disable-next-line
    //     console.log(data.uri);
    // };
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     backgroundColor: 'black',
    // },
    // preview: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    // },
    // capture: {
    //     flex: 0,
    //     backgroundColor: '#fff',
    //     borderRadius: 5,
    //     padding: 15,
    //     paddingHorizontal: 20,
    //     alignSelf: 'center',
    //     margin: 20,
    // },
    // textBlock: {
    //     color: '#F00',
    //     position: 'absolute',
    //     textAlign: 'center',
    //     backgroundColor: 'transparent',
    //   }
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
    autoFocusBox: {
        position: 'absolute',
        height: 64,
        width: 64,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
        opacity: 0.4,
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    zoomText: {
        position: 'absolute',
        bottom: 70,
        zIndex: 2,
        left: 2,
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
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
});