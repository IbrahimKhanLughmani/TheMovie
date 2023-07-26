import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../../theme/colors';

export default Genres = ({ data }) => {

  function generateDarkColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 50;
    const lightness = Math.floor(Math.random() * 50);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return color;
  };

  return (
    <View style={[style.genreTags, { backgroundColor: generateDarkColor() }]}>
      <Text style={style.genre}>{data}</Text>
    </View>
  )
};

const style = StyleSheet.create({
  genre: {
    color: colors.white,
    fontSize: 14,
    paddingStart: 10,
    paddingEnd: 10,
  },
  genreTags: {
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 5,
    marginBottom: 20,
  },
});