import * as FileSystem from "expo-file-system";
import { JSX, useRef } from "react";
import {
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SText } from "./SText";

export function DirectoryModal(props: {
  path: string[];
  close: () => void;
}): JSX.Element {
  const textRef = useRef<string>("");

  return (
    <View
      style={{
        width: "70%",
        backgroundColor: useColorScheme() === "light" ? "white" : "black",
        borderRadius: 16,
        padding: 12,
        gap: 10,
        alignItems: "stretch",
      }}
    >
      <SText
        style={{
          alignSelf: "stretch",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        New directory
      </SText>
      <TextInput
        style={{ borderRadius: 8, borderWidth: 1, borderColor: "gray" }}
        placeholder="Directory name"
        onChange={(t) => (textRef.current = t.nativeEvent.text)}
      ></TextInput>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "gray",
            borderRadius: 8,
            padding: 8,
          }}
          onPress={() => {
            props.close();
          }}
        >
          <SText style={{ color: "white" }}>Cancel</SText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "dodgerblue",
            borderRadius: 8,
            padding: 8,
          }}
          onPress={() => {
            FileSystem.makeDirectoryAsync(
              props.path.join("") + textRef.current
            ).then(() => {
              props.close();
            });
          }}
        >
          <SText style={{ color: "white" }}>Create</SText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
