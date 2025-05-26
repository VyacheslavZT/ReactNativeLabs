import { JSX } from "react";
import { ModalProps, Dimensions, Modal, View, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";

export function BetterModal(
  props: ModalProps & {
    closeFunc: (visible: boolean) => void;
  }
): JSX.Element {
  const dimensions = Dimensions.get("screen");

  return (
    <Modal {...props} transparent={true}>
      <View
        style={{
          width: dimensions.width,
          height: dimensions.height,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: dimensions.width + 100,
            height: dimensions.height + 100,
            position: "absolute",
            opacity: 0.5,
            backgroundColor: "black",
          }}
          activeOpacity={0.5}
          onPress={() => props.closeFunc(false)}
        />
        {props.children}
      </View>
    </Modal>
  );
}
