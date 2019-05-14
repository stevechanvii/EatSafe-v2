// Mock data object used for LineChart and BarChart

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [
        50,
        20,
        2,
        86,
        71,
        100
      ],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    }
    // ,{
    //   data: [
    //     20,
    //     10,
    //     4,
    //     56,
    //     87,
    //     90
    //   ]
    // },{
    //   data: [
    //     30,
    //     90,
    //     67,
    //     54,
    //     10,
    //     2
    //   ]
    // }
  ]
  }

  // Mock data object used for Contribution Graph

  const contributionData = [
    { date: '2019-05-06', count: 1 },
    { date: '2019-05-07', count: 2 },
    { date: '2019-05-08', count: 5 },
    { date: '2019-05-09', count: 1 },
    { date: '2019-05-10', count: 4 },
    { date: '2019-05-11', count: 3 },
    { date: '2019-05-12', count: 1 },
    { date: '2019-05-13', count: 2 },
    { date: '2019-05-14', count: 1 },
  ]

  // Mock data object for Pie Chart

  const pieChartData = [
    { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ]

  // Mock data object for Progress

  const progressChartData = [0.4, 0.6, 0.8]

  export { data, contributionData, pieChartData, progressChartData }