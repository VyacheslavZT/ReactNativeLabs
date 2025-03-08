import { useRef } from "react";
import {
  Button,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";

export default function ProfileScreen() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const lastNameRef = useRef("");
  const firstNameRef = useRef("");

  const handleRegister = () => {
    console.log("Email:", emailRef.current);
    console.log("Password:", passwordRef.current);
    console.log("Confirm Password:", confirmPasswordRef.current);
    console.log("Last Name:", lastNameRef.current);
    console.log("First Name:", firstNameRef.current);
  };

  const textBoxStyle: StyleProp<TextStyle> = {
    marginBottom: 32,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1.5,
    borderRadius: 4,
  };

  const titleStyle: StyleProp<TextStyle> = {
    fontSize: 16,
    fontWeight: "400",
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 16 }}>
        Register
      </Text>

      <Text style={titleStyle}>E-mail</Text>
      <TextInput
        onChangeText={(t) => emailRef.current = t}
        style={textBoxStyle}
        keyboardType="email-address"
      />

      <Text style={titleStyle}>Password</Text>
      <TextInput
        onChangeText={(t) => passwordRef.current = t}
        style={textBoxStyle}
        secureTextEntry
      />

      <Text style={titleStyle}>Confirm password</Text>
      <TextInput
        onChangeText={(t) => confirmPasswordRef.current = t}
        style={textBoxStyle}
        secureTextEntry
      />

      <Text style={titleStyle}>Last Name</Text>
      <TextInput
        onChangeText={(t) => lastNameRef.current = t}
        style={textBoxStyle}
      />

      <Text style={titleStyle}>First Name</Text>
      <TextInput
        onChangeText={(t) => firstNameRef.current = t}
        style={textBoxStyle}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
