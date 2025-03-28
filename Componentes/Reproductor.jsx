import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as Notifications from 'expo-notifications';

export default function Reproductor() {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    (async () => {
      
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to receive notifications was denied');
      }

      
      sendNotification("¡Bienvenido!", "Gracias por usar la aplicación");
    })();
  }, []);

  useEffect(() => {
    if (position === duration && duration > 0) {
      console.log("Sending notification...");
      sendNotification("¡Canción finalizada!", "Tu notificación de canción finalizada");
    }
  }, [position, duration]);

  async function playSound() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log("Loading Sound");
      const { sound, status } = await Audio.Sound.createAsync(
        require("../assets/Brazuca.mp3"),
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      setSound(sound);
      setDuration(status.durationMillis);

      console.log("Playing Sound");
      setIsPlaying(true);
    }
  }

  async function skipToNext() {
    // Implementa lógica para saltar a la siguiente canción
  }

  async function skipToPrevious() {
    // Implementa lógica para retroceder a la canción anterior
  }

  const onPlaybackStatusUpdate = (status) => {
    if (status.positionMillis && status.durationMillis) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
    }
  };

  async function sendNotification(title, body) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: null,
      });
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
    }
  }

  async function changeVolume(value) {
    setVolume(value);
    await sound.setVolumeAsync(value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onSlidingComplete={(value) => setPosition(value)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={skipToPrevious}>
          <AntDesign name="stepbackward" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={playSound}>
          {isPlaying ? (
            <AntDesign name="pause" size={24} color="black" />
          ) : (
            <AntDesign name="play" size={24} color="black" />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToNext}>
          <AntDesign name="stepforward" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.sliderContainer}>
        <AntDesign name="sound" size={24} color="black" />
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onValueChange={changeVolume}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  sliderContainer: {
    width: 200,
    height: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  roundImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
