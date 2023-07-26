import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, ImageBackground, Text, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import LinearGradient from "react-native-linear-gradient"
import colors from '../../theme/colors';
import moment from 'moment';
import strings from '../../theme/strings';
import { Context } from '../context/Context';
import Genres from '../components/Genres';

const MovieDetailScreen = ({navigation, route}) => {
    const {state} = useContext(Context);
    const [genres, setGenres] = useState(state.genre);
    const movie = route.params.movie;

    useEffect(() => {
        setGenres(state.genre.filter((item) => movie.genre_ids.includes(item.id)))
    }, [])

    return(
        <View style={style.main}>
            <View style={style.upperContainer}>
                <ImageBackground
                    style={style.image}
                    resizeMode='cover'
                    source={{uri : `${Apis.image}${movie.poster_path ? movie.poster_path : movie.backdrop_path}`}}>
                    <LinearGradient 
                        colors={[(movie.backdrop_path || movie.poster_path) ? '#00000000' : colors.black, colors.black]} 
                        style={style.linearGradient}>
                        <View style={style.main}>
                            <View style={style.backContainer}>
                                <TouchableOpacity style={style.searchIconContainer} onPress={() => navigation.pop()}>
                                    <Image style={style.backIcon} source={require('../assets/back-2.png')} />
                                    <Text style={style.back}>{strings.watch}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={style.infoContainer}>
                                <Text style={style.movieRelease}>{strings.theaters} {moment(movie.release_date).format('MMM DD, yyyy')}</Text>
                                <TouchableOpacity style={style.ticketButton} onPress={() => navigation.navigate('TicketScreen', {movie})}>
                                    <Text style={style.movieTitle}>{strings.tickets}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.trailerButton} onPress={() => navigation.navigate('VideoControl', {id: movie.id})}>
                                    <Text style={style.movieTitle}>{strings.trailer}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
            <View style={style.bottomContainer}>
                <View style={style.genreContainer}>
                    <Text style={style.title}>{strings.genres}</Text>
                    <FlatList 
                        data={genres} 
                        horizontal
                        renderItem={({item}) => {
                            return(
                                <Genres data={item.name} />
                            )
                        }}
                    />
                </View>
                <View style={style.overiewContainer}>
                    <Text style={style.title2}>{strings.overiew}</Text>
                    <ScrollView>
                        <Text style={style.overView}>{movie.overview}</Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
};

const style = StyleSheet.create({
    main: {
        flex: 1,
    },
    upperContainer: {
        flex: 0.6
    },
    image: {
        height: '100%', 
        width: '100%'
    },
    linearGradient: {
        height : '100%', 
        width : '100%', 
        borderRadius: 10
    },
    movieRelease: {
        color: colors.white, 
        fontWeight: '500', 
        fontSize: 16,
        marginBottom: 10
    },
    movieTitle: {
        color: colors.white, 
        fontWeight: '500', 
        fontSize: 16,
    },
    backContainer: {
        flex: 0.5, 
        marginStart: 15, 
        marginVertical: 35
    },
    searchIconContainer: {
        height: 32, 
        width: 52,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginStart: 20,
        marginTop: 10,
    },
    backIcon: {
        height: 28, 
        width: 28,
    },
    back: {
        color: colors.white,
        fontSize: 14,
        marginStart: 5
    },
    infoContainer: {
        flex: 0.5, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginVertical: 20
    },
    ticketButton: {
        height: 55, 
        width: 240, 
        backgroundColor: colors.lightBlue, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10, 
        marginBottom: 10
    },
    trailerButton: {
        height: 55, 
        width: 240, 
        borderWidth: 1, 
        borderColor: colors.lightBlue, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10
    },
    bottomContainer: {
        flex: 0.4
    },
    title: {
        color: colors.black, 
        fontWeight: '500', 
        fontSize: 16,
        marginBottom: 10
    },
    title2: {
        color: colors.black, 
        fontWeight: '500', 
        fontSize: 16,
    },
    overView: {
        color: colors.grey, 
        fontSize: 16,
        marginTop: 5,
        paddingBottom: 15
    },
    genreContainer: {
        marginHorizontal: 20, 
        marginTop: 30, 
        borderBottomWidth: 1, 
        borderColor: colors.silver,
    },
    overiewContainer: {
        flex: 1, 
        marginHorizontal: 20, 
        marginTop: 20
    },
})

export default MovieDetailScreen;