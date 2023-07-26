import React, { useContext, useEffect, useState, useCallback } from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Context } from '../context/Context';
import colors from '../../theme/colors';
import YoutubePlayer from "react-native-youtube-iframe";

const VideoControl = ({navigation, route}) => {
  const {state, getVideo} = useContext(Context);
  const [video, setVideo] = useState(state.video);

  useEffect(() => {
    getVideo(route.params.id)
  }, [])

  useEffect(() => {
    setVideo(state.video)
  }, [state.video])

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      navigation.pop()
    }
  }, []);

  return(
    <View style={style.mainContainer}>
      <TouchableOpacity style={style.searchIconContainer} onPress={() => {
          navigation.pop()
      }}>
          <Image style={style.backIcon} source={require('../assets/back-2.png')} />
      </TouchableOpacity>
      {video?.key ? <YoutubePlayer
        height={300}
        play={true}
        videoId={video.key}
        initialPlayerParams={{
          // set youtube player controls
        }}
        onChangeState={onStateChange}
      /> : <Text style={style.text}>Video not found</Text>}
    </View>
  )
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
  searchIconContainer: {
    height: 32, 
    width: 32,
    position: 'absolute',
    top: 47,
    left: 24
},
  backIcon: {
    height: 28, 
    width: 28,
},
  text: {
    color: colors.white, 
    alignSelf: 'center'
  },
})

export default VideoControl;