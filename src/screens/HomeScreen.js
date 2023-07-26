import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, FlatList, ImageBackground} from 'react-native';
import { Context } from '../context/Context';
import colors from '../../theme/colors';
import LinearGradient from "react-native-linear-gradient"
import Apis from '../utils/apiConfig';
import ScreenHeader from '../components/ScreenHeader';
import EmptyList from '../components/EmptyList';

const HomeScreen = ({navigation}) => {
    const {state, getMovies, getGenre} = useContext(Context);
    const [movies, setMovies] = useState(state.movies);
    const [search, setSearch] = useState();
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        getMovies()
        getGenre()
    }, [])

    useEffect(() => {
        setMovies(state.movies)
    }, [state.movies])

    return(
        <SafeAreaView style={style.main}>
            {/* screen header */}
            <ScreenHeader 
                search={search} 
                setSearch={setSearch} 
                setMovies={setMovies} 
                showSearch={showSearch} 
                setShowSearch={setShowSearch} 
                callback={() => navigation.navigate('SearchedMovies')}
            />
            {/* screen body */}
            <View style={style.screen}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyList msg={'Loading...'} />}
                    data={movies}
                    contentContainerStyle={style.flatlist}
                    renderItem={({item}) => {
                        return(
                            <TouchableOpacity style={style.itemContainer} activeOpacity={1} onPress={() => navigation.navigate('MovieDetailScreen', {movie: item})}>
                                <ImageBackground
                                    style={style.item}
                                    imageStyle={style.itemStyle}
                                    source={{uri : `${Apis.image}${item.backdrop_path}`}}>
                                    <LinearGradient 
                                        colors={[(item.backdrop_path || item.poster_path) ? '#00000000' : colors.black, colors.black]} 
                                        style={style.linearGradient}>
                                        <View style={style.movieTitleContainer}>
                                            <Text numberOfLines={1} style={style.movieTitle}>{item.title}</Text>
                                        </View>
                                    </LinearGradient>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
};

const style = StyleSheet.create({
    main: {
      flex: 1,
    },
    screen: {
        flex: 1, 
        backgroundColor: colors.both, 
        borderTopWidth: 1, 
        borderColor: colors.silver
    },
    flatlist: {
        paddingBottom: 80
    },
    itemContainer: {
        alignItems: 'center', 
        marginTop: 20
    },
    item: {
        width: Dimensions.get('window').width - 40, 
        height: 200,
    },
    itemStyle: {
        borderRadius: 10,
    },
    linearGradient: {
        height : '100%', 
        width : '100%', 
        borderRadius: 10
    },
    movieTitleContainer: {
        flex: 1, 
        justifyContent: 'flex-end', 
        margin: 20
    },
    movieTitle: {
        color: colors.white, 
        fontWeight: '500', 
        fontSize: 16
    },
})

export default HomeScreen;