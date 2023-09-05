import React, { useRef, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { WebView } from "react-native-webview";
import {
  IntervlModal,
  ChartTypeModal,
  DrawingTypeModal,
} from "../components/modalComponents";
// } from "./../modalComponents";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
// const chartHtml = require("../assets/chartFiles/html/chart.html");
// const chartHtml = require("../chartFiles/html/chart.html");

const chartHtml = Platform.OS === 'ios'
        ? require("../chartFiles/html/chart.html")
        : { uri: 'file:///android_asset/chartFiles/html/chart.html', baseurl: 'file:///android_asset/' }

export default function ChartScreen() {
  const webViewRef = useRef(null);

  const [activeInterval, setActiveInterval] = useState("1m");
  const [activeCharttype, setActiveChartType] = useState("barschart");
  const [intervalModalVisibility, setIntervalModalVisble] = useState(false);
  const [drawingsModalVisibility, setDrawingModalVisble] = useState(false);
  const [chartTypeModalVisibility, setchartTypeModalVisble] = useState(false);

  const changeInterval = (interval) => {
    const injectingCode =
      `  
        var chart = infChart.manager.getChart("mainchart");
        if (chart) {      
          chart.setIntervalManually("` +
      interval +
      `", undefined, true);
        }
          true; 
        `;
    console.log("injectcode", injectingCode);
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(injectingCode);
    }
  };

  const changeChartType = (type) => {
    console.log("changeChartType");
    const changeChartType =
      `  
          infChart.manager.setChartStyle("mainchart", "` +
      type +
      `", undefined, true);
          true; 
    `;

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(changeChartType);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 18 }}>
        <WebView ref={webViewRef} style={{ flex: 1 }} source={chartHtml} />
      </View>
      <View style={[styles.buttonBar]}>
        <TouchableOpacity
          key={activeInterval}
          onPress={() => {
            setDrawingModalVisble(false);
            setIntervalModalVisble(true);
            setchartTypeModalVisble(false);
          }}
          style={[styles.buttonBarButtons]}
        >
          <Text style={[styles.buttonLabel]}>{activeInterval}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setDrawingModalVisble(false);
            setIntervalModalVisble(false);
            setchartTypeModalVisble(true);
          }}
          style={[styles.buttonBarButtons]}
        >
          {/* <Text
              style={[
                styles.buttonLabel
              ]}>
              {activeCharttype}
            </Text> */}
          <AntDesign name={activeCharttype} size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setDrawingModalVisble(true)}
          style={[styles.buttonBarButtons]}
        >
          {/* <Text
              style={[
                styles.buttonLabel
              ]}>
              Drawings
            </Text> */}
          <EvilIcons name="pencil" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <IntervlModal
        intervalModalVisibility={intervalModalVisibility}
        values={config.interval}
        setIntervalModalVisble={setIntervalModalVisble}
        changeInterval={changeInterval}
        setActiveInterval={setActiveInterval}
      >
        {" "}
      </IntervlModal>

      <ChartTypeModal
        values={config.chartType}
        chartTypeModalVisibility={chartTypeModalVisibility}
        changeChartType={changeChartType}
        setActiveChartType={setActiveChartType}
        setchartTypeModalVisble={setchartTypeModalVisble}
      ></ChartTypeModal>

      <DrawingTypeModal
        drawingsModalVisibility={drawingsModalVisibility}
        values={config.interval}
        setDrawingModalVisble={setDrawingModalVisble}
        changeInterval={changeInterval}
        setActiveInterval={setActiveInterval}
      ></DrawingTypeModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "gainsboro",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "28%",
    textAlign: "center",
    // flex: 1,
    flexDirection: "row",
  },
  buttonBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "space-around",
    padding: 8,

    borderTopColor: "gray",
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "white",

    columnGap: 50,
  },
  buttonBarButtons: {
    // paddingHorizontal: 8,
    // paddingVertical: 6,
    borderRadius: 4,

    // backgroundColor: 'lightblue',
    // alignSelf: 'flex-start',
    // marginHorizontal: '1%',
    // marginBottom: 6,
    // minWidth: '28%',
    // textAlign: 'center',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shadedBorder: {
    height: 10, // Adjust the height of the shaded border
    borderTopWidth: 1, // Add a top border
    borderColor: "transparent", // Set the border color to transparent
    backgroundColor: "linear-gradient(to right, lightgray, transparent)", // Use a linear gradient for shading
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
    marginLeft: 10,
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    // width: '100%',
    // height: '100%',
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 35,
    paddingBottom: 35,
    paddingLeft: 35,
    paddingRight: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // backgroundColor: 'lightblue'
  },
  modalText: {
    marginBottom: 15,
  },
  buttonClose: {
    textAlign: "center",
    justifyContent: "center",
  },
});

const config = {
  interval: [
    {
      key: "I_1",
      desc: "1 m",
    },
    {
      key: "I_2",
      desc: "2 m",
    },
    {
      key: "I_3",
      desc: "3 m",
    },
    {
      key: "I_5",
      desc: "5 m",
    },
    {
      key: "I_15",
      desc: "15 m",
    },
    {
      key: "I_30",
      desc: "30 m",
    },
    {
      key: "I_60",
      desc: "1 hr",
    },
    {
      key: "I_120",
      desc: "2 hrs",
    },
    {
      key: "I_240",
      desc: "4 hrs",
    },
    {
      key: "I_360",
      desc: "6 h",
    },
    {
      key: "D",
      desc: "Daily",
    },
    {
      key: "W",
      desc: "Weekly",
    },
    {
      key: "M",
      desc: "Monthly",
    },
  ],

  chartType: [
    { key: "line", desc: "Line", label: "label.line", ico: "linechart" },
    {
      key: "candlestick",
      desc: "Candlestick",
      label: "label.candlestick",
      ico: "barschart",
    },
    { key: "area", desc: "Area", label: "label.area", ico: "areachart" },
    { key: "ohlc", desc: "OHLC", label: "label.ohlc", ico: "barchart" },
    {
      key: "heikinashi",
      desc: "Heikin Ashi",
      label: "label.heikinashi",
      ico: "dotchart",
    },
  ],
};
