import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import MealCard from './MealCard/Card';
import Preference from '../../Preferences/Preferences';

//  diaryContent = (props) => {
class diaryContent extends Component {
    state = {
        date: this.props.date,
        dairyResult: null
    };

    dateKeyGenerator = () => {
        const dateKey = ('' + this.state.date.getDate() + (this.state.date.getMonth() + 1) + this.state.date.getFullYear()).trim();
        return dateKey;
    }

    getDariyResult = async () => {
        const dateKey = this.dateKeyGenerator();
        console.log('DiaryContent getDariyResult' + dateKey);
        try {
            const value = await AsyncStorage.getItem(dateKey);
            console.log('getDariyResult' + value);
            this.setState({ dairyResult: JSON.parse(value) });
            console.log('333333');
            console.log('dairy result ' + this.state.dairyResult);
        } catch (e) {
            // read error
            console.log(e)
        }
    }

    componentDidUpdate() {
        this.getDariyResult();
    }

    // componentDidMount() {
    //     // https://github.com/react-navigation/react-navigation/issues/1617
    //     // https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle
    //     this._subscribe = this.props.navi.addListener('didFocus', () => {
    //       //  # do you update if need
    //       this.getDariyResult();
    //     //   this.setState({afterAddNew: this.state.afterAddNew + 1});
    //     });
    //   }

    render() {
        console.log(this.state.date);
        const cards = [];
        if (this.state.dairyResult !== null) {
            Preference.Meals.map(meal => {
                if (meal in this.state.dairyResult) {
                    cards.push(
                        <MealCard key={meal} meal={meal} info={this.state.dairyResult[meal]} navi={this.props.navi} />
                    );
                }
            });
        } else {
            return (
                <Text>No dairy</Text>
            );
        }
        return (
            <Content>
                {cards}
            </Content>
        );
    }
}
// search the meal in preference (for sorting) then save it in cards
//     const cards = [];
//     Preference.Meals.map(meal => {
//         if (meal in props.dairyResult) {
//             cards.push(
//                 <MealCard key={meal} meal={meal} info={props.dairyResult[meal]} navi={props.navi}/>
//             );
//         }
//     });

//     return (
//         <Content>
//             {cards}
//         </Content>
//     );
// };

const styles = StyleSheet.create({

});

export default diaryContent;