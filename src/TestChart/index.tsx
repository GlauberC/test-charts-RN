import React, { useState, useRef } from "react";
import { View, Text, Dimensions, Button, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { LineChart } from "react-native-chart-kit";
import { TouchableOpacity, KeyboardAvoidingView } from "react-native";

interface SelectedLineProps {
  id: string;
  startX: number;
  endX: number;
  label: string;
  index: number;
}
interface IntervalProps {
  id: string;
  startX: number;
  endX: number;
  label: string;
}

const dataTemp = [10, 12, 12, 12, 15, 16, 12, 15, 14, 16, 17, 18];
const keysTemp = [
  "Janeiro",
  "Feveiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const startY = 350;
const endY = 400;
const startX = 55;
const endX = Dimensions.get("screen").width - 30;

export function TestChart() {
  const chartRef = useRef(null);
  const [titleInterval, setTitleInterval] = useState("");
  const [dataChart, setDataChart] = useState(dataTemp);
  const [customIntervals, setCustomIntervals] = useState<IntervalProps[]>([]);
  const [firstSelectedLine, setFirstSelectedLine] = useState<SelectedLineProps>(
    {} as SelectedLineProps
  );
  const [secondSelectedLine, setSecondSelectedLine] =
    useState<SelectedLineProps>({} as SelectedLineProps);

  function onSelectedLine(props: SelectedLineProps) {
    if (!firstSelectedLine.id) {
      setFirstSelectedLine(props);
    } else {
      if (props.index === firstSelectedLine.index) {
        setFirstSelectedLine({} as SelectedLineProps);
        setSecondSelectedLine({} as SelectedLineProps);
      } else if (props.index === secondSelectedLine.index) {
        setSecondSelectedLine({} as SelectedLineProps);
      } else {
        setSecondSelectedLine(props);
      }
    }
  }

  function pressLineChart(event: any) {
    const posY = event.nativeEvent.locationY;
    const posX = event.nativeEvent.locationX;
    if (posY > startY && posY < endY) {
      if (posX > startX && posX < endX) {
        const graphWidth = endX - startX;
        const step = graphWidth / keysTemp.length;
        const indexSelected = Math.floor((posX - startX) / step);
        const startPos = indexSelected * step + startX;
        const endPos = startPos + step;
        const id = `${startPos}&${endPos}`;
        onSelectedLine({
          startX: startPos,
          endX: endPos,
          id,
          index: indexSelected,
          label: keysTemp[indexSelected],
        });
      }
    }
  }

  function renderIntervals() {
    return customIntervals.map((interval: IntervalProps) => (
      <View
        key={interval.id}
        style={{
          position: "absolute",
          left: interval.startX,
          width: interval.endX - interval.startX,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: 1, height: endY, backgroundColor: "red" }}></View>
        <Text
          style={{
            color: "red",
            marginHorizontal: 5,
            top: endY,
          }}
        >
          {interval.label}
        </Text>
        <View
          style={{
            width: 1,
            height: endY,
            backgroundColor: "red",
          }}
        ></View>
      </View>
    ));
  }
  function renderSelectedLines(lineProps: SelectedLineProps, opacity = 0.1) {
    return (
      <>
        {lineProps.id && (
          <View
            style={{
              position: "absolute",
              left: lineProps.startX,
              width: lineProps.endX - lineProps.startX,
              backgroundColor: `rgba(255, 0, 0, ${opacity})`,
              top: 0,
              height: endY,
            }}
          ></View>
        )}
      </>
    );
  }

  function addInterval() {
    const startPos = (firstSelectedLine.endX + firstSelectedLine.startX) / 2;
    const endPos = (secondSelectedLine.endX + secondSelectedLine.startX) / 2;

    setCustomIntervals([
      ...customIntervals,
      {
        id: `${firstSelectedLine.id}&${secondSelectedLine.id}`,
        startX: startPos,
        endX: endPos,
        label: titleInterval,
      },
    ]);
    setFirstSelectedLine({} as SelectedLineProps);
    setSecondSelectedLine({} as SelectedLineProps);
    setTitleInterval("");
  }

  return (
    <View style={{ flex: 1, marginVertical: 40, marginHorizontal: 10 }}>
      <Text>Teste Chart</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={(event) => pressLineChart(event)}
      >
        <LineChart
          ref={chartRef}
          verticalLabelRotation={90}
          data={{
            labels: keysTemp,
            datasets: [
              {
                data: dataChart,
              },
            ],
          }}
          decorator={() => (
            <>
              {renderIntervals()}
              {renderSelectedLines(firstSelectedLine)}
              {renderSelectedLines(secondSelectedLine, 0.3)}
            </>
          )}
          getDotColor={() => "blue"}
          width={Dimensions.get("window").width - 20} // from react-native
          height={400}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={2} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#000",
            backgroundGradientFrom: "#000",
            backgroundGradientTo: "#000",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => {
              return `rgba(255, 255, 200, ${opacity})`;
            },
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "8",
              strokeWidth: "2",
              stroke: "#000000",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </TouchableOpacity>
      {!!firstSelectedLine.id && !!secondSelectedLine.id ? (
        <>
          <TextInput
            placeholder="Título do intervalo"
            onChangeText={setTitleInterval}
            value={titleInterval}
            style={{ padding: 10, borderBottomWidth: 1, marginBottom: 40, marginTop: 10, }}
          />
          <Button onPress={addInterval} title="Adicionar intervalo" />
        </>
      ) : null}
    </View>
  );
}
