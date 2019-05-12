import React, { Component } from 'react';
import { View, Alert, Button } from 'react-native';
import Mailer from 'react-native-mail';

export default class sendEmail extends Component {
    
    
    writeFile = () => {
        // require the module
        var RNFS = require('react-native-fs');

        // create a path you want to write to
        // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
        // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
        var path = RNFS.DocumentDirectoryPath + '/test.html';

        // write the file
        RNFS.writeFile(path, '<b>Lorem ipsum dolor sit amet</b>', 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    handleEmail = () => {
        // require the module
        var RNFS = require('react-native-fs');
        
        Mailer.mail({
            subject: 'need help',
            recipients: ['chendanyangvii@gmail.com'],
            ccRecipients: ['supportCC@example.com'],
            bccRecipients: ['supportBCC@example.com'],
            body: '<b>A Bold Body</b>',
            isHTML: true,
            attachment: {
                path: RNFS.DocumentDirectoryPath + '/test.html',  // The absolute path of the file from which to read data.
                type: 'html',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                name: 'test.html',   // Optional: Custom filename for attachment
            }
        }, (error, event) => {
            Alert.alert(
                error,
                event,
                [
                    { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
                    { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
                ],
                { cancelable: true }
            )
        });
    }

    render() {
        this.writeFile();
        return (
            <View>
                <Button
                    onPress={this.handleEmail}
                    title="Email Me"
                    color="#841584"
                    accessabilityLabel="Purple Email Me Button"
                />
            </View>
        );
    }
}