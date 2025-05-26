import { JSX, useRef } from "react";
import {
  View,
  useColorScheme,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SText } from "./SText";
import * as FileSystem from "expo-file-system";

export function FileCreateModal(props: {
  path: string[];
  close: () => void;
}): JSX.Element {
  const nameRef = useRef<string>("");
  const contentRef = useRef<string>("");

  return (
    <View
      style={{
        width: "90%",
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
        New file
      </SText>
      <TextInput
        style={{ borderRadius: 8, borderWidth: 1, borderColor: "gray" }}
        placeholder="File name"
        onChange={(t) => (nameRef.current = t.nativeEvent.text)}
      ></TextInput>
      <TextInput
        multiline
        style={{ borderRadius: 8, borderWidth: 1, borderColor: "gray" }}
        placeholder="Initial content"
        onChange={(t) => (contentRef.current = t.nativeEvent.text)}
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
            FileSystem.writeAsStringAsync(
              props.path.join("") + nameRef.current,
              contentRef.current
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
