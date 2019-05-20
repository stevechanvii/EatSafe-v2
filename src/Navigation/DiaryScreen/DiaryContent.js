import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Text, View } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import KeyGenerator from '../../Utils/KeyGenerator';
import MealCard from './MealCard/MealContent';
import Preference from '../../Preferences/Preferences';
import EmptySVG from '../../assets/svg/empty_svg';

/**
 * @class diaryContent is the child component of DiaryScreen which displays diary within a day
 */
class diaryContent extends Component {
    state = {
        date: new Date(),
        dairyResult: null
    };

    /**
     * @func getDariyResult retrive the diary from Async Stroage
     */
    getDariyResult = async () => {
        const dateKey = KeyGenerator.dateKeyGenerator(this.props.date);
        // console.log('DiaryContent getDariyResult' + dateKey);
        try {
            const value = await AsyncStorage.getItem(dateKey);
            console.log(value);
            this.setState({ dairyResult: JSON.parse(value) });
        } catch (e) {
            // read error
            console.log(e)
        }
    }

    /**
     * @func componentWillReceiveProps rerender when new props (date changes) received from DiaryScreen
     * @param {Object} newProps should be date
     * 
     * NO LONGER SUPPORT IN FUTURE!!! TRY static getDerivedStateFromProps()
     */
    componentWillReceiveProps(newProps) {
        // setState is a sync function, the date sometimes not been update when getDariyResult access state before setState
        this.setState({ date: newProps.date }, () => {
            this.getDariyResult();
        });
    }

    /**
     * @func refreshFunction will be sent to Card.js, once a card (meal) is been modified or delete,
     * this method will be called to rerender the diary content
     */
    refreshFunction = () => {
        this.getDariyResult();
    }

    /**
     * @func EmptyIcon handle the icons when diary content is empty
     */
    EmptyIcon = (date, width, height) => {
        switch (date.getDay()) {
            case 0:
                return (<EmptySVG.empty1 width={width} height={height} />);
            case 1:
                return (<EmptySVG.empty2 width={width} height={height} />);
            case 2:
                return (<EmptySVG.empty3 width={width} height={height} />);
            case 3:
                return (<EmptySVG.empty4 width={width} height={height} />);
            case 4:
                return (<EmptySVG.empty5 width={width} height={height} />);
            case 5:
                return (<EmptySVG.empty6 width={width} height={height} />);
            case 6:
                return (<EmptySVG.empty7 width={width} height={height} />);
        }
    }

    render() {
        const cards = [];
        // check if the content is empty and either show diary or icons
        if (this.state.dairyResult !== null) {
            Preference.Meals.map(meal => {
                if (meal in this.state.dairyResult) {
                    cards.push(
                        <MealCard
                            key={meal}
                            dateKey={KeyGenerator.dateKeyGenerator(this.props.date)}
                            meal={meal}
                            info={this.state.dairyResult[meal]}
                            navi={this.props.navi}
                            refresh={this.refreshFunction} />
                    );
                }
            });
        } else {
            return (
                <View style={styles.emptyCenter}>
                    {this.EmptyIcon(this.props.date, 120, 120)}
                    <Text>Hi, create diary from today!</Text>
                </View>
            );
        }
        return (
            <View>
                {cards}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    emptyCenter: {
        marginTop: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default diaryContent;