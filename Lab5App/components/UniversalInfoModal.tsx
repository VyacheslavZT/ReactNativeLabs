import { useQuery } from "@tanstack/react-query";
import { JSX } from "react";
import { Alert, TouchableOpacity, useColorScheme, View } from "react-native";
import { SText } from "./SText";
import * as FileSystem from "expo-file-system";

export function UniversalInfoModal(props: {
  path: string[];
  name: string;
  close: () => void;
}): JSX.Element {
  console.log(props.path, props.name);
  const info = useQuery({
    queryKey: ["file_info", props.path, props.name],
    queryFn: () =>
      FileSystem.getInfoAsync(props.path.join("") + props.name, {}),
  });
  const colors = useColorScheme();

  let infoView: any;
  const folderContent = useQuery({
    queryKey: ["path", props.path + props.name],
    queryFn: () =>
      FileSystem.readDirectoryAsync([...props.path, props.name].join("")),
  });

  if (!info.isSuccess) return <></>;
  if (!info.data.exists) return <></>;

  if (info.data.isDirectory) {
    if (!folderContent.isSuccess) {
      return <></>;
    }
    infoView = (
      <>
        <SText>Type: Directory 📂</SText>
        <SText>Name: {props.name}</SText>
        <SText>Inner element count: {folderContent.data.length}</SText>
      </>
    );
  } else {
    const arr = props.name.split(".");
    let type = arr.pop();
    let name = arr.join(".");

    if (arr.length === 0) {
      name = type!;
      type = "None";
    }

    infoView = (
      <>
        <SText>Type: File 📄</SText>
        <SText>Name: {name}</SText>
        <SText>Type: {type}</SText>
        <SText>Size: {info.data.size}</SText>
      </>
    );
  }

  return (
    <View
      style={{
        backgroundColor: colors === "light" ? "white" : "black",
        width: "90%",
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
        {props.name} info:
      </SText>
      {infoView}
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: "red",
          }}
          onPress={() => {
            Alert.alert("Delete", "Do you want to delete " + props.name + "?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                  FileSystem.deleteAsync(
                    [...props.path, props.name].join("")
                  ).then(props.close);
                },
              },
            ]);
          }}
        >
          <SText style={{ color: "white" }}>Delete</SText>
        </TouchableOpacity>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity
          style={{
            padding: 8,
            paddingHorizontal: 30,
            borderRadius: 8,
            backgroundColor: "gray",
          }}
          onPress={props.close}
        >
          <SText style={{ color: "white" }}>Exit</SText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
