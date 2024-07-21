import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../theme';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import useTabletStyle from '../../../styles/TabStyles';

const DashboardStats: React.FC = () => {

  const { isTablet, orientation, tabletStyle } = useTabletStyle();

  const chartDimension = {
    width: isTablet && orientation === 'horizontal' ? (190) : (120),
    height: isTablet && orientation === 'horizontal' ? (180) : (120),
  }

  const projectsData = [
    // {
    //   name: "Projects",
    //   count: 200,
    //   color: "#7CB490",
    //   legendFontColor: "#7F7F7F",
    //   legendFontSize: 15
    // },
    {
      name: "Not Started",
      count: 80,
      color: '#E49491',
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "In Progress",
      count: 50,
      color: "#F9D593",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Completed",
      count: 70,
      color: "#64BC97",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];

  const paymentsData = [
    {
      name: "Total Amount",
      count: 100,
      amount: '100K',
      color: "#7CB490",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Pending Amount",
      count: 70,
      amount: '70K',
      color: '#F9D593',
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  const renderCustomProjectsLegend = () => (
    <View style={styles.legendContainer}>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: projectsData[0].color }]} />
          <Text style={styles.legendText}>{`${projectsData[0].name}: ${projectsData[0].count}`}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: projectsData[1].color }]} />
          <Text style={styles.legendText}>{`${projectsData[1].name}: ${projectsData[1].count}`}</Text>
        </View>
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: projectsData[2].color }]} />
          <Text style={styles.legendText}>{`${projectsData[2].name}: ${projectsData[2].count}`}</Text>
        </View>
        {/* <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: projectsData[3].color }]} />
          <Text style={styles.legendText}>{`${projectsData[3].name}: ${projectsData[3].count}`}</Text>
        </View> */}
      </View>
    </View>
  );

  // Function to render the custom legend
  const renderCustomPaymentLegend = () => (
    <View style={styles.legendContainer}>
      {paymentsData.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{`${item.name}: ${item.amount}`}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, isTablet && orientation === 'horizontal' ? { flexDirection: 'column' } : {}]}>

      <View style={[styles.statBox, styles.largeBox, isTablet && orientation === 'horizontal' ? { marginBottom: 10, width: '100%' } : {}]}>
        <Text style={styles.TitleText}>Projects - 200</Text>
        <PieChart
          data={projectsData}
          width={chartDimension.width}
          height={chartDimension.height}
          chartConfig={chartConfig}
          accessor={"count"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          center={[25, 10]}
          hasLegend={false}
          absolute
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {renderCustomProjectsLegend()}
        </View>
      </View>

      <View style={[styles.statBox, styles.shortBox, isTablet && orientation === 'horizontal' ? { width: '100%' } : {}]}>
      <Text style={styles.TitleText}>Compl Projects - 70</Text>
        <PieChart
          data={paymentsData}
          width={chartDimension.width}
          height={chartDimension.height}
          chartConfig={chartConfig}
          accessor={"count"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          center={[25, 10]}
          hasLegend={false}
          absolute={false}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {renderCustomPaymentLegend()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statBox: {
    backgroundColor: '#E7F0E6',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeBox: {
    width: '58%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    // marginRight: 10, // Add margin to separate from the small boxes
  },
  shortBox: {
    width: '40%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  legendContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensures the row takes full width
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 8,
    color: theme.colors.text,
  },
  TitleText: {
    fontSize: 14,
    marginBottom: -10,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center'
  },
});

export default DashboardStats;
