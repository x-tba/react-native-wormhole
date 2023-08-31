import * as React from "react";
import { Animated, Alert, TouchableOpacity, Text } from "react-native";

function CustomButton() {
  return (
    <TouchableOpacity onPress={() => Alert.alert("Hello!")}>
      <Animated.Text children="Click here!" />
    </TouchableOpacity>
  );
}

export default function MyNewWormhole({ screenTitle }) {
  const message = React.useMemo(() => "Hello, world!", []);
  return (
    <Animated.View style={{ flex: 1, backgroundColor: "green" }}>
      <Animated.Text>{message}</Animated.Text>
      <Text style={{ color: "blue" }}>{screenTitle}</Text>
      <Text>{screenTitle}</Text>
      <CustomButton />
    </Animated.View>
  );
}
