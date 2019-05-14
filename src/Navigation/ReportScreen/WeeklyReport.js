import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, View, Text } from 'native-base';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
import { data, contributionData, pieChartData, progressChartData } from './data';

const weeklyReport = () => {
  const screenWidth = Dimensions.get('window').width * 0.9;
  const height = 220;
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2 // optional, default 3
  };
  return (
    <Content showsVerticalScrollIndicator={false}>
      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Text style={styles.cardTitle}>Weekly Intake</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.chartView}>
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
            />
          </View>
        </CardItem>
      </Card>

      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Text style={styles.cardTitle}>Weekly Intake</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.chartView}>
            <LineChart
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
          </View>
        </CardItem>
      </Card>

      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Text style={styles.cardTitle}>Weekly Intake</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.chartView}>
            <ProgressChart
              data={progressChartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
          </View>
        </CardItem>
      </Card>

      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Text style={styles.cardTitle}>Weekly Intake</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.chartView}>
            <BarChart
              data={data}
              width={screenWidth}
              height={220}
              yAxisLabel={'$'}
              chartConfig={chartConfig}
            />
          </View>
        </CardItem>
      </Card>

      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Text style={styles.cardTitle}>Weekly Intake</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.chartView}>
            <LineChart
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
          </View>
        </CardItem>
      </Card>

      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Text style={styles.cardTitle}>Weekly Intake</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.chartView}>
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </CardItem>
      </Card>

      <Card style={styles.card}>
        <CardItem style={styles.cardItem}>
          <Text style={styles.cardTitle}>Weekly Intake</Text>
        </CardItem>
        <CardItem style={styles.cardItem}>
          <View style={styles.chartView}>
            <ContributionGraph
              values={contributionData}
              endDate={new Date()}
              numDays={50}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
          </View>
        </CardItem>
      </Card>

    </Content>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  cardItem: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 10,
  },
  chartView: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // borderRadius: 10,
    overflow: 'hidden',
  },
  cardTitle: {
    margin: 10,
    fontSize: 20,
  }
});
export default weeklyReport;