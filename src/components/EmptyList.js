import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import colors from '../../theme/colors';

  export default EmptyList = ({msg}) => {

    return (
      <View style={style.main}>
        <Text style={style.emptyText}>{msg}</Text>
      </View>
    );
  };

  const style = StyleSheet.create({
    main: {
      height: Dimensions.get('screen').height * 0.7,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 12, 
      color: colors.black,
    },
  });