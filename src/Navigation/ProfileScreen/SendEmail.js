import React, { Component } from 'react';
import { Platform, Alert, Image, StyleSheet } from 'react-native';
import { Container, Text, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Mailer from 'react-native-mail';
import AsyncStorage from '@react-native-community/async-storage';
import KeyGenerator from '../../Utils/KeyGenerator';
import HeaderGoBack from '../../Components/HeaderGoBack';
import Theme from '../../Styles/Theme';
import ProfileSVG from '../../assets/svg/profile_svg';
import Preference from '../../Preferences/Preferences';

class sendEmail extends Component {
    static navigationOptions = {
        header: null
    }

    getDariyResult = async () => {
        // console.log('DiaryContent getDariyResult' + dateKey);
        const dateKey = KeyGenerator.monthKeyGenerator(5, 2019);
        try {
            const value = await AsyncStorage.multiGet(dateKey);
            console.log(value);
            // this.setState({ dairyResult: JSON.parse(value) });
            let dairy = [];
            value.map(el => {
                if (el[1]) {
                    Object.entries(JSON.parse(el[1])).forEach(([key, value]) => {
                        let obj = { 'meal': key };
                        Object.entries(value).forEach(([key, value]) => {
                            obj = { 
                                ...obj, 
                                ...value, 
                                time: new Date(JSON.parse(value.time)).toLocaleString(),
                                feelingRate: Preference.FeelingRate[value.feel]
                             }
                            dairy.push(obj);
                        });
                    });
                }
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
        const fields = ['meal', 'comments', 'time', 'feel', 'ingredients', 'symptom', 'food', 'feelingRate'];

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
        if (Platform.OS === 'ios') {
            var path = RNFS.DocumentDirectoryPath + '/data.csv';
        } else {
            var path = RNFS.ExternalDirectoryPath + '/data.csv';
        }
        console.log(path)

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

    render() {
        return (
            <Container>
                <HeaderGoBack navigation={this.props.navigation} title='Export Data' />
                <Grid style={Theme.body}>
                    <Row size={4} style={styles.rowCenter} >
                        {/* <Image source={require('../../assets/icon/icons8-export-csv-100.png')} /> */}
                        <ProfileSVG.CSV width={120} height={120} />
                    </Row>
                    <Row size={6}>
                        <Grid>
                            <Row style={styles.rowCenter}>
                                <Text>
                                    Export the data in CSV format by Email
                        </Text>
                            </Row>
                            <Row style={styles.rowCenter}>
                                <Button
                                    onPress={this.handleEmail}
                                    style={Theme.button} >
                                    <Text>Send Email</Text>
                                </Button>
                            </Row>
                        </Grid>


                    </Row>
                </Grid>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    rowCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default sendEmail;