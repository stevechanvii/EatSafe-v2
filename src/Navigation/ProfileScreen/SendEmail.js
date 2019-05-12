import React, { Component } from 'react';
import { View, Alert, Button } from 'react-native';
import Mailer from 'react-native-mail';
import AsyncStorage from '@react-native-community/async-storage';

export default class sendEmail extends Component {
    // formatedDiary = [];

    dateKeyGenerator = (date) => {
        // console.log('dateKeyGenerator ' + this.state)
        const dateKey = ('' + date.getDate() + (date.getMonth() + 1) + date.getFullYear()).trim();
        return dateKey;
    }

    getDariyResult = async () => {
        const dateKey = this.dateKeyGenerator(new Date());
        // console.log('DiaryContent getDariyResult' + dateKey);
        try {
            const value = await AsyncStorage.getItem(dateKey);
            console.log(value);
            // this.setState({ dairyResult: JSON.parse(value) });
            let dairy = [];
            Object.entries(JSON.parse(value)).forEach(([key, value]) => {
                let obj = {'meal': key};
                Object.entries(value).forEach(([key, value]) => {
                    obj = {...obj, ...value}
                    dairy.push(obj);
                });
            });
            
            // this.formatedDiary = dairy;
            // console.log(this.formatedDiary);
            this.createCSV(dairy);
        } catch (e) {
            // read error
            console.log(e)
        }
    }

    componentWillMount = () => {
        this.getDariyResult();
    }

    createCSV = (dairy) => {
        const { Parser } = require('json2csv');
        const fields = ['meal', 'comments', 'time', 'feel', 'ingredients', 'symptom', 'food'];
     
        const json2csvParser = new Parser({ fields });
        // console.log(this.formatedDiary);
        console.log(dairy);
        const csv = json2csvParser.parse(dairy);

        console.log(csv);
        this.writeFile(csv);
    }

    writeFile = (CSVFile) => {
        // require the module
        var RNFS = require('react-native-fs');

        // create a path you want to write to
        // :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
        // but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
        var path = RNFS.DocumentDirectoryPath + '/data.csv';

        // write the file
        RNFS.writeFile(path, CSVFile, 'utf8')
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
            subject: 'Email Diary',
            recipients: ['chendanyangvii@gmail.com', 'zba1@student.monash.edu'],
            // recipients: ['chendanyangvii@gmail.com'],
            // ccRecipients: ['supportCC@example.com'],
            // bccRecipients: ['supportBCC@example.com'],
            body: '<b>Hi, this is your data from EatSafe</b>',
            isHTML: true,
            attachment: {
                path: RNFS.DocumentDirectoryPath + '/data.csv',  // The absolute path of the file from which to read data.
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

    render() {
        // this.createCSV();
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