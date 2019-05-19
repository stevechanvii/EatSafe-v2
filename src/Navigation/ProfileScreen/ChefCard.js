import React, { Component } from 'react';
import { Platform, Alert, Image, StyleSheet } from 'react-native';
import { Container, Text, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Mailer from 'react-native-mail';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import HeaderGoBack from '../../Components/HeaderGoBack';
import ProfileSVG from '../../assets/svg/profile_svg';
import Theme from '../../Styles/Theme';

/**
 * @class chefCard generate chef card ind pdf file then send by email
 */
class chefCard extends Component {
  static navigationOptions = {
    header: null
  }
  
  componentWillMount() {
    this.createPDF();
  }

  /**
   * @func createPDF generate PDF file
   */  
  createPDF = () => {
    // Create a new PDF in your app's private Documents directory
    const RNFS = require('react-native-fs');
    // const docsDir = RNFS.ExternalDirectoryPath;
    const pdfPath = (Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath) + '/ChefCard.pdf';

    // get the parameter allergens and intolerance from parent component, set default value if not exist
    const info = this.props.navigation.getParam('info', {allergens: {}, intolerance: {}});

    // convert allergens and intolerance from object to array
    const allergens = [];
    Object.entries(info.allergens).forEach(([key, value]) => {
      value ? allergens.push(key) : ''
    });
    
    const intolerance = [];
    Object.entries(info.intolerance).forEach(([key, value]) => {
      value ? intolerance.push(key) : ''
    });

    // generate pdf page
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
      .drawText('Allergens: ', {
        x: 5,
        y: 125,
        fontSize: 4,
        color: '#000000',
      })
      .drawText(allergens.join(', '), {
        x: 22,
        y: 125,
        fontSize: 4,
        color: '#000000',
      })
      .drawText('Intolerance:', {
        x: 5,
        y: 120,
        fontSize: 4,
        color: '#000000',
      })
      .drawText(intolerance.join(', '), {
        x: 25,
        y: 120,
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

  /**
   * @func handleEmail call system default email app with parameters
   */
  handleEmail = () => {
    // Create a new PDF in your app's private Documents directory
    const RNFS = require('react-native-fs');
    // const docsDir = RNFS.ExternalDirectoryPath;
    const pdfPath = (Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath) + '/ChefCard.pdf';

    // get the parameter user from parent component, set default value if not exist
    const user = this.props.navigation.getParam('info', {user: {avatar: "", name: "PokeAllergist", email: ""}}).user;

    Mailer.mail({
      subject: 'Chef card',
      recipients: [user.email],
      // ccRecipients: ['supportCC@example.com'],
      // bccRecipients: ['supportBCC@example.com'],
      body: `Hi, this is your chef card from <b>PokeAllergist</b><br><br><br>Best Regards,<br>${user.name}`,
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
      <Container>
        <HeaderGoBack navigation={this.props.navigation} title='Chef Card' />
        <Grid style={Theme.body}>
          <Row size={4} style={styles.rowCenter} >
          <ProfileSVG.PDF width={120} height={120} />
          </Row>
          <Row size={6}>
            <Grid>
              <Row style={styles.rowCenter}>
                <Text>
                  Email your conditions to chef in PDF format
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

export default chefCard;