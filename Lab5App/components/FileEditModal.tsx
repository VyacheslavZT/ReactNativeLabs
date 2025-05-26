import { useQuery } from "@tanstack/react-query";
import { JSX, useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SText } from "./SText";
import * as FileSystem from "expo-file-system";

export function FileEditModal(props: {
  path: string[];
  close: () => void;
}): JSX.Element {
  const fileContent = useQuery({
    queryKey: ["fileContent", props.path],
    queryFn: () => FileSystem.readAsStringAsync(props.path.join("")),
  });

  const [content, setContent] = useState<string | null>(null);
  const color = useColorScheme();

  if (!fileContent.isSuccess) {
    return <ActivityIndicator />;
  }

  if (content === null) {
    setContent(fileContent.data);
  }

  return (
    <View
      style={{
        width: "90%",
        backgroundColor: color === "light" ? "white" : "black",
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
        View/Edit {props.path[props.path.length - 1]}
      </SText>
      <TextInput
        multiline
        value={content ?? ""}
        style={{ borderRadius: 8, borderWidth: 1, borderColor: "gray" }}
        placeholder="Initial content"
        onChangeText={setContent}
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
            FileSystem.writeAsStringAsync(props.path.join(""), content!).then(
              () => {
                props.close();
                fileContent.refetch();
              }
            );
          }}
        >
          <SText style={{ color: "white" }}>Save</SText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
