import React from "react";
import { View, ScrollView } from "react-native";
import { Card, Button, Text, Avatar, Divider } from "react-native-paper";

const Insight = ({ data }) => {
  return (
    <View style={{ flex: 1, padding: 8 }}>
      <Card>
        <Card.Cover source={{ uri: data.coverImage }} />

        <Card.Title
          title={
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "orange", fontSize: 18 }}>
                {data.symbol}
              </Text>
              <Text style={{ fontSize: 18 }}>.NAS</Text>
            </View>
          }
          subtitle={<Text style={{ color: "#888" }}>{data.name}</Text>}
          left={(props) => (
            <Avatar.Image {...props} source={{ uri: data.icon }} />
          )}
          right={(props) => (
            <Button
              {...props}
              icon="rocket"
              mode="contained-tonal"
              buttonColor="#ff4040"
              style={{ marginRight: 10 }}
            >
              Buy
            </Button>
          )}
        />

        <Card.Content>
          <Text variant="titleMedium">{data.date.toLocaleString()}</Text>
          <Text variant="bodyMedium">{data.content}</Text>
        </Card.Content>

        <Divider style={{ marginTop: 20, marginBottom: 20 }} />

        <Card.Actions>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Avatar.Image size={40} source={{ uri: data.avatar }} />

            <Button
              icon="plus"
              mode="outlined"
              onPress={() => console.log("You pressed follow btn")}
            >
              Follow
            </Button>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
};

const Insights = () => {
  return (
    <ScrollView>
      {insightData.map((data) => (
        <Insight key={data.symbol} data={data} />
      ))}
    </ScrollView>
  );
};

export default Insights;


const insightData = [
    {
      symbol: "AAPL",
      name: "Apple",
      content:
        "Apple officially announces September 12 launch event for the iPhone 15",
      date: new Date(),
      icon: "https://e7.pngegg.com/pngimages/121/286/png-clipart-apple-logo-computer-icons-apple-logo-company-heart.png",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
      coverImage: "https://picsum.photos/700",
    },
    {
      symbol: "MSFT",
      name: "Microsoft",
      content: "Microsoft is killing Visual Studio for Mac next year",
      date: new Date(),
      icon: "https://e1.pngegg.com/pngimages/682/548/png-clipart-simply-styled-icon-set-731-icons-free-microsoft-windows-icon.png",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
      coverImage: "https://picsum.photos/704",
    },
    {
      symbol: "GOOGL",
      name: "Google",
      content: "Google tests watermark to identify AI images",
      date: new Date(),
      icon: "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
      coverImage: "https://picsum.photos/702",
    },
  ];
  