import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Text, View } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import KeyGenerator from '../../Utils/KeyGenerator';
import MealCard from './MealCard/Card';
import Preference from '../../Preferences/Preferences';
import EmptySVG from '../../assets/svg/empty_svg';


class diaryContent extends Component {
    state = {
        date: new Date(),
        dairyResult: null
    };

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

    // NO LONGER SUPPORT IN FUTURE!!! TRY static getDerivedStateFromProps()
    componentWillReceiveProps(newProps) {
        // one problem is that setState is a sync function, if we setState then get driy Result, the date have'nt been update
        this.setState({ date: newProps.date }, () => {
            this.getDariyResult();
        });
        // console.log('componentWillReceiveProps count!!!');

    }

    // this function will be sent to edit profile, then refresh code after go back
    refreshFunction = () => {
        // this.setState({
        //     dairyResult: props.updatedResult
        // });
        // console.log('refreshFunction in Diary Content1111' );
        this.getDariyResult();
        // console.log('refreshFunction in Diary Content' );
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
        // console.log('Diary Content Render!!!');
        // console.log(this.props.date);
        const cards = [];
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