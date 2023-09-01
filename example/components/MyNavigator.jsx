import * as React from "react";
import { Text, View } from "react-native";
import createWormhole from "../wormhole/createWormhole";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const { Wormhole } = createWormhole({
  global: {
    require: (moduleId) => {
      if (moduleId === "react") {
        return require("react");
      } else if (moduleId === "react-native") {
        return require("react-native");
      } else if (moduleId === "react-native-svg") {
        return require("react-native-svg");
      } else if (moduleId === "react-native-paper") {
        return require("react-native-paper");
      } else if (moduleId === "@react-navigation/material-top-tabs") {
        return require("@react-navigation/material-top-tabs");
      }
      return null;
    },
  },
  verify: async () => true,
});

const useComponentSize = () => {
  const [size, setSize] = React.useState(null);

  const onLayout = React.useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

function HomeScreen() {
  const [size, onLayout] = useComponentSize();
  console.log(
    "🚀 ~ file: MyNavigator.jsx:39 ~ HomeScreen ~ size, onLayout:",
    size,
    onLayout
  );

  return (
    <View
      onLayout={onLayout}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text onLayout={onLayout}>Home!</Text>
      <View
        onLayout={onLayout}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text onLayout={onLayout}>
          Home 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Commodi rerum quasi excepturi consectetur, aliquid eveniet provident
          expedita magnam, dignissimos, repudiandae minima non error eligendi
          quaerat earum debitis minus. Sunt, vero!!
        </Text>
      </View>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <Wormhole
        source={{ uri: "http://192.168.1.5:3000/component/MyTable.jsx" }}
      />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function MyNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
