import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Thumbnail, Content, Fab, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Entypo';
import uri from '../../assets/logo.jpg';

import MealCard from './MealCard/Card';

const diaryContent = (props) => {
    return (
        <Text>length of dairy obj {Object.keys(props.dairyResult)}</Text>
    );
};

const styles = StyleSheet.create({

});

export default diaryContent;