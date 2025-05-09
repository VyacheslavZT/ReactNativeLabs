import { useColors } from "@/hooks/useThemeColor";
import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { IconBrandSteam } from "tabler-icons-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SecurityScreen() {
  const colors = useColors();
  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          margin: 10,
        }}
      >
        <IconBrandSteam size={40} color={colors.symbolUnimportant} stroke={1} />
        <Text
          style={{
            color: colors.symbolUnimportant,
            fontSize: 40,
            fontWeight: "200",
          }}
        >
          Safety
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        <View
          style={{
            backgroundColor: colors.backgroundFocus,
            borderRadius: 8,
            height: 30,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: colors.background,
              margin: 2,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: colors.symbolImportant }}>Guard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              margin: 2,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: colors.symbolUnimportant }}>
              Confirmations
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <LinearGradient colors={[colors.background, colors.backgroundFocus]}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 30,
            }}
          >
            <Text style={{ color: colors.symbolUnimportant }}>
              Logged in as player
            </Text>
            <Text
              style={{
                color: colors.symbolImportant,
                fontSize: 60,
                fontWeight: "bold",
              }}
            >
              ABCDE
            </Text>
            <View
              style={{
                backgroundColor: colors.background,
                height: 8,
                width: "70%",
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.focus,
                  height: 8,
                  width: "35%",
                  borderRadius: 8,
                }}
              ></View>
            </View>
          </View>
        </LinearGradient>
        <View style={{margin: 18, gap: 20}}>
          <Text style={{fontSize: 20,color: colors.symbolImportant}}>
            You’ll enter your code each time you enter your password to sign in
            to your Steam account.
          </Text>
          <Text style={{fontSize: 18,color: colors.focus}}>
          Tip: If you don't share your PC, you can select "Remember my
            password" when you sign in to the PC client to enter your password
            and authenticator code less often.
          </Text>
          <View style={{width:"100%", borderRadius:8, gap: 3, overflow:"hidden"}}>
            <TouchableOpacity style={{backgroundColor:colors.backgroundFocus, padding: 15}}><Text style={{color: colors.symbolImportant, fontSize: 20}}>Remove Authenticator</Text></TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:colors.backgroundFocus, padding: 15}}><Text style={{color: colors.symbolImportant, fontSize: 20}}>My Recovery Code</Text></TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:colors.backgroundFocus, padding: 15}}><Text style={{color: colors.symbolImportant, fontSize: 20}}>Help</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
