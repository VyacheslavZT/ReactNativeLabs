import React, { JSX, useRef, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { transform } from "@babel/core";
const size = { width: 160, height: 40 };
const box = { width: 300, height: 200 };
export default function GameScreen(): JSX.Element {
  const [score, setScore] = useState(0);

  const tapGesture = Gesture.Tap()
    .numberOfTaps(10)
    .maxDuration(5000)
    .onStart(() => {
      console.log("10 Taps!");
      runOnJS(setScore)(score + 1);
    });

  const doubleTaps = useRef(0);
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(500)
    .onStart(() => {
      console.log("Double Tap!");
      doubleTaps.current += 1;
      if (doubleTaps.current === 5) {
        doubleTaps.current = 0;
        runOnJS(setScore)(score + 1);
      }
    });

  const longTapGesture = Gesture.LongPress()
    .minDuration(3000)
    .onStart(() => {
      console.log("Long Tap!");
      runOnJS(setScore)(score + 5);
    });

  const panPrevPosition = useSharedValue({ x: 0, y: 0 });
  const panPosition = useSharedValue({ x: 0, y: 0 });
  const panStyle = useAnimatedStyle(() => ({
    left: panPosition.get().x,
    top: panPosition.get().y,
  }));
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      console.log("x: ", e.translationX, " y: ", e.translationY);
      panPosition.value = {
        x: Math.max(
          Math.min(
            panPrevPosition.value.x + e.translationX,
            box.width - size.width
          ),
          0
        ),
        y: Math.max(
          Math.min(
            panPrevPosition.value.y + e.translationY,
            box.height - size.height
          ),
          0
        ),
      };
    })
    .onEnd(() => {
      panPrevPosition.value = panPosition.value;
    });

  const flingPosition = useSharedValue(0);
  const flingStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: flingPosition.value }],
  }));
  const flingGesture = Gesture.Fling()
    .direction(Directions.RIGHT | Directions.LEFT)
    .onStart((e) => {
      runOnJS(setScore)(score + Math.round(Math.random() * 40 - 20));
      flingPosition.value = withSpring((flingPosition.value + 100) % 200, {
        duration: 250,
        dampingRatio: 0.5,
        stiffness: 1,
      });
    });

  const pinchScale = useSharedValue(1);
  const pinchStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pinchScale.value }],
  }));
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      pinchScale.value = e.scale;
    })
    .onEnd((e) => {
      runOnJS(setScore)(score + Math.round(e.scale * 3));
      pinchScale.value = withSpring(1, {
        duration: 250,
        dampingRatio: 0.5,
        stiffness: 1,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pinchScale.value }],
  }));
  return score >= 100 ? (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
        backgroundColor: "#888888",
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 20,
          color: "black",
        }}
      >
        You won!
      </Text>
      <Button
        title="Restart"
        onPress={() => {
          setScore(0);
        }}
      ></Button>
    </View>
  ) : (
    <GestureHandlerRootView style={{ backgroundColor: "$7f7f7f" }}>
      <View collapsable={false} style={{ padding: 10, gap: 10 }}>
        <View
          style={{
            height: size.height,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              color: "black",
            }}
          >
            Score: {score}
          </Text>
        </View>

        <GestureDetector gesture={tapGesture}>
          <SButton text="10 taps" />
        </GestureDetector>

        <GestureDetector gesture={doubleTapGesture}>
          <SButton text="5 double taps" />
        </GestureDetector>

        <GestureDetector gesture={longTapGesture}>
          <SButton text="3 second hold" />
        </GestureDetector>

        <View
          collapsable={false}
          style={[
            {
              width: box.width,
              height: box.height,
              backgroundColor: "#DDDDDD",
            },
          ]}
        >
          <Animated.View style={[{ position: "absolute" }, panStyle]}>
            <GestureDetector gesture={panGesture}>
              <SButton text="Pan" />
            </GestureDetector>
          </Animated.View>
        </View>

        <View style={{ height: size.height }}>
          <GestureDetector gesture={flingGesture}>
            <Animated.View style={[flingStyle]}>
              <SButton text="Fling 🎰" />
            </Animated.View>
          </GestureDetector>
        </View>
        <GestureDetector gesture={pinchGesture}>
          <View
            collapsable={false}
            style={[
              {
                width: box.width,
                height: box.height,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#DDDDDD",
              },
            ]}
          >
            <Animated.View style={[{}, pinchStyle]}>
              <SButton text="Pinch" />
            </Animated.View>
          </View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

function SButton(props: { text: string }): JSX.Element {
  return (
    <TouchableOpacity
      style={{
        width: size.width,
        height: size.height,
        borderRadius: 8,
        backgroundColor: "#FF7F00",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 20,
          color: "white",
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
