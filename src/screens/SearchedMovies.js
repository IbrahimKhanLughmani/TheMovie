import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, FlatList, Image} from 'react-native';
import { Context } from '../context/Context';
import colors from '../../theme/colors';
import Apis from '../utils/apiConfig';
import ScreenHeader from '../components/ScreenHeader';
import EmptyList from '../components/EmptyList';
import strings from '../../theme/strings';

const SearchedMovies = ({navigation}) => {
    const {state} = useContext(Context);
    const [searchedMovies, setSearchedMovies] = useState(state.searchedMovies.results);

    useEffect(() => {
        setSearchedMovies(state.searchedMovies.results)
    }, [state.searchedMovies])

    return(
        <SafeAreaView style={style.main}>
            {/* screen header */}
            <ScreenHeader goBack={() => navigation.pop()} results={`${state.searchedMovies.total_results.toString()} Results Found`} />
            {/* screen body */}
            <View style={style.screen}>
                <FlatList 
                    style={style.list}
                    showsVerticalScrollIndicator={false}
                    data={searchedMovies}
                    contentContainerStyle={style.flatlist}
                    ListEmptyComponent={<EmptyList msg={strings.noMovie} />}
                    renderItem={({item}) => {
                        let genres = state.genre.filter((genre) => item.genre_ids.includes(genre.id))
                        let names = genres.map((item) => item.name).join(', ')
                        return(
                            <TouchableOpacity style={style.itemContainer} activeOpacity={1} onPress={() => navigation.navigate('MovieDetailScreen', {movie: item})}>
                                <View style={style.subContainerInfo}>
                                    <Image style={style.img} source={{uri : `${Apis.image}${item.backdrop_path ? item.backdrop_path : item.poster_path}`}} />
                                    <View style={style.infoContainer}>
                                        <Text numberOfLines={1} style={style.movieTitle}>{item.title}</Text>
                                        <Text numberOfLines={1} style={style.movieDesc}>{names}</Text>
                                    </View>
                                    
                                </View>
                                <TouchableOpacity style={style.subContainerDots} onPress={() => {}}>
                                    <Image style={style.dots} source={require('../assets/dots.png')} />
                                </TouchableOpacity>
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
    list: {
        marginBottom: 20
    },
    flatlist: {
        paddingBottom: 60
    },
    itemContainer: {
        width: Dimensions.get('window').width - 40, 
        height: 100, 
        marginTop: 20, 
        marginHorizontal: 20, 
        flexDirection: 'row'
    },
    subContainerInfo: {
        flex: 0.85, 
        flexDirection: 'row'
    },
    img: {
        height: 100, 
        width: 120, 
        borderRadius: 10, 
        marginEnd: 15,
        backgroundColor: colors.black
    },
    infoContainer: {
        flex: 1, 
        justifyContent: 'center'
    },
    movieTitle: {
        color: colors.black, 
        fontWeight: '500', 
        fontSize: 16
    },
    movieDesc: {
        color: colors.grey, 
        fontWeight: '500', 
        fontSize: 14,
        paddingTop: 3
    },
    subContainerDots: {
        flex: 0.15, 
        justifyContent: 'center', 
        alignItems: 'flex-end'
    },
    dots: {
        height: 22, 
        width: 22
    },
})

export default SearchedMovies;