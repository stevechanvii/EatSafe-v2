import React from 'react';
import { StyleSheet } from 'react-native';
import { Content } from 'native-base';

import MealCard from './MealCard/Card';
import Preference from '../../Preferences/Preferences';

const diaryContent = (props) => {
    // search the meal in preference (for sorting) then save it in cards
    const cards = [];
    Preference.Meals.map(meal => {
        if (meal in props.dairyResult) {
            cards.push(
                <MealCard key={Math.random()} meal={meal} info={props.dairyResult[meal]} />
            );
        }
    });

    return (
        <Content>
            {cards}
        </Content>
    );
};

const styles = StyleSheet.create({

});

export default diaryContent;