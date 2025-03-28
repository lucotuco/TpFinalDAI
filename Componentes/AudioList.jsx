import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

const AudioList = () => {
  const songs = [
    {
      id: '1',
      title: 'Canción 1',
      artist: 'Artista 1',
      duration: 180, // duración en segundos
    },
    {
      id: '2',
      title: 'Canción 2',
      artist: 'Artista 2',
      duration: 240,
    },
  ];


  const renderSongItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.songItem} onPress={() => handleSongPress(item)}>
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
        </View>
        <Ionicons name="ios-play-circle" size={30} color="black" />
      </TouchableOpacity>
    );
  };

  const handleSongPress = (song) => {
    // Lógica para manejar la selección de la canción
    console.log(`Reproducir: ${song.title}`);
  };

  return (
    <View style={styles.container}>
      <Text>PlayList</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderSongItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  songInfo: {
    flex: 1,
    marginRight: 10,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 14,
    color: '#888',
  },
});

export default AudioList;

