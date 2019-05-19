import React, { Component } from 'react';
import Mailer from 'react-native-mail';

/**
 * 
 */
const email = (recipients) => {
    // require the module
    var RNFS = require('react-native-fs');

    Mailer.mail({
        subject: 'Email Diary',
        recipients: ['chendanyangvii@gmail.com', 'zba1@student.monash.edu'],
        // recipients: ['chendanyangvii@gmail.com'],
        // ccRecipients: ['supportCC@example.com'],
        // bccRecipients: ['supportBCC@example.com'],
        body: '<b>Hi, this is your data from EatSafe</b>',
        isHTML: true,
        attachment: {
            path: (Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath) + '/data.csv',
            type: 'csv',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            name: 'EatSafe_data.csv',   // Optional: Custom filename for attachment
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

export default email;