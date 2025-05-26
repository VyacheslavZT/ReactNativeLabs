import { useQuery } from "@tanstack/react-query";
import { JSX } from "react";
import { TouchableOpacity } from "react-native";
import { SText } from "./SText";
import * as FileSystem from "expo-file-system";

export function DirectoryElement(props: {
  path: string[];
  name: string;
  setPath: (path: string[]) => void;
  openFile: (path: string[]) => void;
  longPress: (path: string[], name: string) => void;
}): JSX.Element {
  const info = useQuery({
    queryKey: ["file_info", props.path, props.name],
    queryFn: () => FileSystem.getInfoAsync(props.path + props.name),
  });

  const open = () => {
    if (info.data?.isDirectory) {
      props.setPath([...props.path, props.name+"/"]);
    } else {
      props.openFile([...props.path, props.name]);
    }
  };

  return (
    <TouchableOpacity
      style={{
        borderWidth: 0.5,
        borderColor: "gray",
        padding: 10,
        flexDirection: "row",
      }}
      onPress={open}
      onLongPress={()=>props.longPress(props.path,props.name)}
    >
      <SText>
        {info.isSuccess ? (info.data.isDirectory ? "📂 " : "📄 ") : "*️⃣ "}
      </SText>
      <SText>{props.name}</SText>
    </TouchableOpacity>
  );
}
