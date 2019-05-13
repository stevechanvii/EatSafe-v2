import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit';
import { data, contributionData, pieChartData, progressChartData } from './data';

const monthlyReport = () => {
    const screenWidth = Dimensions.get('window').width * 0.9;
    const height = 220;
    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2 // optional, default 3
    };
    return (
        <Content>
            {console.log('4')}
            <LineChart
                data={data}
                width={screenWidth} // from react-native
                height={220}
                yAxisLabel={'$'}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                bezier
                style={graphStyle}
            />

            {console.log('6')}
            <ProgressChart
                data={progressChartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                style={graphStyle}
            />

            {console.log('5')}
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={graphStyle}
            />



            {console.log('8')}
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                style={graphStyle}
            />

            <PieChart
                data={pieChartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                style={graphStyle}
            />

            {console.log('7')}
            <BarChart
                style={graphStyle}
                data={data}
                width={screenWidth}
                height={220}
                yAxisLabel={'$'}
                chartConfig={chartConfig}
                style={graphStyle}
            />

        </Content>
    );
}

const graphStyle = StyleSheet.create({
    marginVertical: 8,
    borderRadius: 16
});

export default monthlyReport;