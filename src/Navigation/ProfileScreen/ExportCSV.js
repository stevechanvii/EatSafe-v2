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

/**
 * @class exportCSV generate CSV file and send by email
 */
class exportCSV extends Component {
    static navigationOptions = {
        header: null
    }

    /**
     * @func getDiaryResult retrive diary from Async Storage based on month
     */
    getDiaryResult = async () => {
        // month should from user input, in this case we hard code May 2019
        const dateKey = KeyGenerator.monthKeyGenerator(5, 2019);
        try {
            const value = await AsyncStorage.multiGet(dateKey);
            
            /*
             * reconstruct saving JSON to array
             * expected output [{meal: 'Breakfast', feel: 'Good', ...}, ... , {meal: 'Lunch', feel: 'Good', ...}]
             */
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

            // create CSV file
            this.createCSV(dairy);
        } catch (e) {
            // read error
            console.log(e)
        }
    }

    /**
     * @func componentWillMount retrive diary and generate csv once component initialised
     */
    componentWillMount = () => {
        this.getDiaryResult();
    }

    /**
     * @func createCSV generate CSV file
     * @param {Array} dairy see getDiaryResult()
     */
    createCSV = (dairy) => {
        const { Parser } = require('json2csv');
        // CSV title
        const fields = ['meal', 'comments', 'time', 'feel', 'ingredients', 'symptom', 'food', 'feelingRate'];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(dairy);

        // write csv file to file system
        this.writeFile(csv);
    }

    /**
     * @func writeFile write file to file system
     * @param CSVFile csv file
     */
    writeFile = (CSVFile) => {
        // require the module
        var RNFS = require('react-native-fs');

        // create a path based on platform
        if (Platform.OS === 'ios') {
            var path = RNFS.DocumentDirectoryPath + '/data.csv';
        } else {
            var path = RNFS.ExternalDirectoryPath + '/data.csv';
        }

        // write the file
        RNFS.writeFile(path, CSVFile, 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    /**
     * @func handleEmail call system default email app with parameters
     */
    handleEmail = () => {
        // require the module
        var RNFS = require('react-native-fs');

        // get the parameter user from parent component, set default value if not exist
        const user = this.props.navigation.getParam('user', {avatar: "", name: "PokeAllergist", email: ""});

        Mailer.mail({
            subject: 'Email Diary',
            recipients: [user.email],
            // recipients: ['chendanyangvii@gmail.com'],
            // ccRecipients: ['chendanyangvii@gmail.com'],
            // bccRecipients: ['chendanyangvii@gmail.com'],
            body: `Hi, this is your diary from <b>PokeAllergist</b><br><br><br>Best Regards,<br>${user.name}`,
            isHTML: true,
            attachment: {
                path: (Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath) + '/data.csv',
                type: 'csv',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                name: 'PokeAllergist.csv',   // Optional: Custom filename for attachment
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

export default exportCSV;