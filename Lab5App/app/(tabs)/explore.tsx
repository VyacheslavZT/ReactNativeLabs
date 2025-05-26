import { SText } from "@/components/SText";
import * as FileSystem from "expo-file-system";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useQuery } from "@tanstack/react-query";
import { BetterModal } from "@/components/BetterModal";
import { DirectoryModal } from "@/components/DirectoryModal";
import { FileCreateModal } from "@/components/FileCreateModal";
import { DirectoryElement } from "@/components/DirectoryElement";
import { UniversalInfoModal } from "@/components/UniversalInfoModal";
import { FileEditModal } from "@/components/FileEditModal";

export default function TabTwoScreen() {
  const [path, setPath] = useState<string[]>([]);
  const content = useQuery({
    queryKey: ["path", path],
    queryFn: () => FileSystem.readDirectoryAsync(path.join("")),
    refetchInterval: 1000,
  });

  if (path.length === 0) {
    const defaultPath = [FileSystem.documentDirectory!+"AppData/"];
    FileSystem.makeDirectoryAsync(defaultPath.join(""));
    setPath(defaultPath);
  }

  console.log("path:", path);
  const [directoryNameModalOpen, setDirectoryNameModalOpen] =
    useState<boolean>(false);

  const [fileNameModalOpen, setFileNameModalOpen] = useState<boolean>(false);
  const [editModalFile, setEditModalFile] = useState<string[] | null>(null);
  const [infoModalOpen, setInfoModalOpen] = useState<{
    path: string[];
    name: string;
  } | null>(null);

  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();

  const temp1 = [...path];
  temp1.shift();
  const displayDirectory = "AppData/"+temp1.join("");
  return (
    <View
      style={{
        overflow: "visible",
        backgroundColor: "darkgray",
        flex: 1,
      }}
    >
      <View
        style={{
          width: "100%",
          height: insets.top,
          marginBottom: 0.5,
          backgroundColor: "gray",
        }}
      />
      <View
        style={{
          width: "100%",
          height: 60,
          backgroundColor: "gray",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SText>{displayDirectory}</SText>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "darkgray",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {content.status === "success" ? (
          <FlatList
            data={content.data}
            contentContainerStyle={{
              width: dimensions.width,
            }}
            renderItem={(i) => {
              return (
                <DirectoryElement
                  path={path}
                  setPath={setPath}
                  name={i.item}
                  openFile={(file) => setEditModalFile(file)}
                  longPress={(a, b) => setInfoModalOpen({ path: a, name: b })}
                />
              );
            }}
          ></FlatList>
        ) : content.status === "pending" ? (
          <ActivityIndicator />
        ) : content.status === "error" ? (
          <SText>ERROR</SText>
        ) : (
          <SText>UNKNOWN</SText>
        )}
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "lightgray",
          flexDirection: "row",
          gap: 4,
          padding: 4,
        }}
      >
        <Button
          title="<"
          onPress={() => {
            const newPath = [...path];
            newPath.pop();
            setPath(newPath);
          }}
        />
        <Button
          title="New 📂"
          onPress={() => setDirectoryNameModalOpen(true)}
        />
        <Button title="New 📄" onPress={() => setFileNameModalOpen(true)} />
      </View>
      <BetterModal
        visible={directoryNameModalOpen}
        closeFunc={setDirectoryNameModalOpen}
      >
        <DirectoryModal
          path={path}
          close={() => {
            content.refetch();
            setDirectoryNameModalOpen(false);
          }}
        />
      </BetterModal>

      <BetterModal visible={fileNameModalOpen} closeFunc={setFileNameModalOpen}>
        <FileCreateModal
          path={path}
          close={() => {
            content.refetch();
            setFileNameModalOpen(false);
          }}
        />
      </BetterModal>

      <BetterModal
        visible={!!editModalFile}
        closeFunc={() => setEditModalFile(null)}
      >
        <FileEditModal
          path={editModalFile!}
          close={() => {
            content.refetch();
            setEditModalFile(null);
          }}
        />
      </BetterModal>

      <BetterModal
        visible={!!infoModalOpen}
        closeFunc={() => setInfoModalOpen(null)}
      >
        <UniversalInfoModal
          path={infoModalOpen?.path ?? []}
          name={infoModalOpen?.name ?? ""}
          close={() => {
            content.refetch();
            return setInfoModalOpen(null);
          }}
        />
      </BetterModal>
    </View>
  );
}
