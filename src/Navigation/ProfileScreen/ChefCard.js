import React, { Component } from 'react';
import { View, Alert, Button, Platform } from 'react-native';
import Mailer from 'react-native-mail';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import AsyncStorage from '@react-native-community/async-storage';

export default class chefCard extends Component {

  componentWillMount() {
    this.userAllergens();
  }

  userAllergens = async () => {
    const keys = ['milk', 'soy', 'seafood'];
    let allergenString = '';
    let userAllergens = [];
    // get the allergens from database, and saves in userAllergens
    values = await AsyncStorage.multiGet(keys);
    values.map((el, index) => {
      if (JSON.parse(el[1])) {
        userAllergens.push(keys[index]);
      }
    });
    // console.log(userAllergens);
    allergenString = userAllergens.join(", ");
    // console.log(allergenString);
    // this.setState({ mailDetails: allergenString });
    console.log(this.state.mailDetails);

    this.createPDF(allergenString)
  }

  createPDF = (allergenString) => {

    // Create a new PDF in your app's private Documents directory
    const RNFS = require('react-native-fs');
    // const docsDir = RNFS.ExternalDirectoryPath;
    const pdfPath = (Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath) + '/ChefCard.pdf';

    // this.userAllergens();
    var allergens = allergenString;
    console.log(allergens);
    const page1 = PDFPage
      .create()
      .setMediaBox(100, 150)
      .drawRectangle({
        x: 0,
        y: 0,
        width: 100,
        height: 150,
        color: '#ffffff',
      })
      .drawText(' TO THE CHEF: ', {
        x: 5,
        y: 140,
        fontSize: 5,
        color: '#f44336',
      })
      .drawText('I have severe food allergy.To avoid a life-threatening', {
        x: 5,
        y: 135,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('allergic reaction, I must avoid all foods that contain', {
        x: 5,
        y: 130,
        fontSize: 4,
        color: '#000000',
      })
      .drawText(allergens, {
        x: 5,
        y: 125,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('Add More comments Below', {
        x: 5,
        y: 105,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('__________________________________________', {
        x: 5,
        y: 100,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('__________________________________________', {
        x: 5,
        y: 95,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('__________________________________________', {
        x: 5,
        y: 90,
        fontSize: 4,
        color: '#000000',
      })

      .drawText('__________________________________________', {
        x: 5,
        y: 85,
        fontSize: 4,
        color: '#000000',
      })


      .drawText('Fold--- --- --- --- --- --- --- --- --- --- --- --- --- --- ---here', {
        x: 5,
        y: 70,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('I have severe food allergy.To avoid a life-threatening', {
        x: 5,
        y: 135,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('For my meal,can you please make sure that my food does', {
        x: 5,
        y: 60,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('not contain these ingredients and that only clean/washed', {
        x: 5,
        y: 55,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('food preparation equipment & surfaces are used e.g.:', {
        x: 5,
        y: 50,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('   •Chopping-boards  •Mixing-bowls     •Utensils', {
        x: 5,
        y: 40,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('   •Knives & tongs   •Pans & saucepans •Surfaces', {
        x: 5,
        y: 35,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('•THANK YOU FOR YOUR COOPERATION•', {
        x: 5,
        y: 25,
        fontSize: 4,
        color: '#000000',
      })

    PDFDocument
      .create(pdfPath)
      .addPages(page1)
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        console.log('PDF created at: ' + path);
        console.log(page1);
        // Do stuff with your shiny new PDF!
      });
  }

  handleEmail = () => {
    // Create a new PDF in your app's private Documents directory
    const RNFS = require('react-native-fs');
    // const docsDir = RNFS.ExternalDirectoryPath;
    const pdfPath = (Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath) + '/ChefCard.pdf';

    Mailer.mail({
      subject: 'need help',
      recipients: ['chendanyangvii@gmail.com'],
      // ccRecipients: ['supportCC@example.com'],
      // bccRecipients: ['supportBCC@example.com'],
      body: '<b>Chef Card</b>',
      isHTML: true,
      attachment: {
        path: pdfPath,
        type: 'pdf',
        name: 'ChefCard.pdf'
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