import React, { Component } from 'react';
import { View, Alert, Button } from 'react-native';
import Mailer from 'react-native-mail';

export default class sendEmail extends Component {

  handleEmail = () => {
    Mailer.mail({
      subject: 'need help',
      recipients: ['chendanyangvii@gmail.com'],
      ccRecipients: ['supportCC@example.com'],
      bccRecipients: ['supportBCC@example.com'],
      body: '<b>A Bold Body</b>',
      isHTML: true,
    //   attachment: {
    //     path: '',  // The absolute path of the file from which to read data.
    //     type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
    //     name: '',   // Optional: Custom filename for attachment
    //   }
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }

  render() {
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