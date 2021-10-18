import React from "react";
import { View } from "react-native";
import { LineChart, Grid, XAxis, YAxis } from "react-native-svg-charts";

export function LineChartTest() {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <View style={{ margin: 20 }}>
      {/* <XAxis
        data={keys}
        formatLabel={(value, index) => index}
        svg={{ fontSize: 8, fill: "black" }}
      /> */}
      <YAxis
        data={data}
        formatLabel={(value, index) => index}
        svg={{ fontSize: 8, fill: "red" }}
        numberOfTicks={10}
        contentInset = {{ top: 20, bottom: 20 }}
        formatLabel={(value) => `${value}ºC`}
      />
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: "rgb(0,0,0)" }}
      >
        <Grid />
      </LineChart>
    </View>
  );
}
