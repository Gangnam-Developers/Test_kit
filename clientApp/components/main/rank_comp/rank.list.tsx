import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { EmptyAvartar } from "../../icons/app_icons";

interface Props {
  data: Array<ItemsProps>;
  onDisPlay: Function;
  navigation?: any;
}

export interface ItemsProps {
  rank: {
    digit: number;
    color: string;
  };
  avatar: string;
  name: {
    label: string;
    color: string;
  };
  rate: {
    digit: number;
    color: string;
  };
}

type ItemInterSection = ItemsProps & {
  onDisplay: Function;
  navigation: any;
};

const Items = ({
  rank,
  avatar,
  name,
  rate,
  navigation,
  onDisplay,
}: ItemInterSection) => (
  <TouchableOpacity
    style={styles.itemsContainer}
    onPress={() => {
      navigation.navigate("RANK", {
        name: name,
        rank: rank
      });
      onDisplay();
    }}
  >
    <View style={{ flex: 0.05, marginHorizontal: 18 }}>
      <Text style={{ color: rank.color, fontSize: 20, fontWeight: "bold" }}>
        {rank.digit}
      </Text>
    </View>
    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          borderRadius: 30,
        }}
        source={{
          height: 40,
          width: 40,
          uri: avatar !== undefined ? avatar : EmptyAvartar(),
        }}
      />
      <Text
        style={{
          fontSize: 20,
          color: name.color,
          marginHorizontal: 18,
          fontWeight: "bold",
        }}
      >
        {name.label}
      </Text>
    </View>
    <Text
      style={{
        color: rate.color,
        marginHorizontal: 18,
        fontSize: 20,
        fontWeight: "bold",
      }}
    >
      {rate.digit}%
    </Text>
  </TouchableOpacity>
);

const CompeteList = ({ data, navigation, onDisPlay }: Props) => {
  const renderItems = ({ item }: any) => (
    <Items
      rank={{
        digit: item.rank.digit,
        color: item.rank.color,
      }}
      avatar={item.avatar}
      name={{
        label: item.name.label,
        color: item.name.color,
      }}
      rate={{
        digit: item.rate.digit,
        color: item.rate.color,
      }}
      navigation={navigation}
      onDisplay={onDisPlay}
    />
  );

  return (
    <FlatList
      data={data}
      initialNumToRender={9}
      renderItem={renderItems}
      contentContainerStyle={{
        margin: 18,
      }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 18,
            width: "100%",
          }}
        />
      )}
      keyExtractor={(items: ItemsProps) => `${items.rank.digit}`}
    />
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    height: 70,
    backgroundColor: "rgb(63, 67, 92)",
    borderRadius: 9,
    alignItems: "center",
  },
  items: {},
});

export { CompeteList };
