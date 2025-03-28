import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

const QR = () => {
 
  


  return (
    <View style={styles.container}>
      <Text>QR</Text>
      <Image source={require('../qrcode.jpg')} />
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

export default QR;

