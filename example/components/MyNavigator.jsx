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

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      <Wormhole
        source={{ uri: "http://192.168.1.5:3000/component/MyTable.jsx" }}
      />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
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
