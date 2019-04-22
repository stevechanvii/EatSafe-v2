import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Fab, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class addDiary extends Component {
    static navigationOptions = {
        title: 'Create Diary',
    };

    state = {};

    render() {
        return (
            <Text> Add New </Text>
        );
    };

};

export default addDiary;