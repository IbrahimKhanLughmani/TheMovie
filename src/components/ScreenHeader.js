import React, { useContext, useEffect, useState } from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Platform} from 'react-native';
import colors from '../../theme/colors';
import strings from '../../theme/strings';
import { TextInput } from 'react-native-element-textinput';
import { Context } from '../context/Context';

export default ScreenHeader = ({goBack, search, setSearch, setMovies, showSearch, setShowSearch, results, title, release, callback}) => {
    const {state, searchedMovies, resetSearchedMovies} = useContext(Context);

    return(
        <View style={style.main}>
            {/* header */}
            {showSearch ? <View style={style.header}>
                <TextInput
                    style={style.textInput}
                    inputStyle={style.inputText}
                    iconStyle={style.crossIcon}
                    showIcon
                    placeholder={strings.search}
                    placeholderTextColor={colors.grey}
                    renderLeftIcon={() => {
                        return(
                            <Image style={style.inputIcon} source={require('../assets/search.png')} />
                        )
                    }}
                    renderRightIcon={() => {
                        return(
                            <TouchableOpacity onPress={() => {
                                setShowSearch(false)
                                setSearch()
                                setMovies(state.movies)
                            }}>
                                <Image style={style.crossIcon} source={require('../assets/close.png')} />
                            </TouchableOpacity>
                        )
                    }}
                    onChangeText={setSearch}
                    value={search}
                    onSubmitEditing={(event) => {
                        searchedMovies(event.nativeEvent.text)
                        callback()
                    }}
                /> 
            </View> :
            (goBack ? 
            <View style={style.backContainer}>
                <TouchableOpacity style={style.searchIconContainer} onPress={() => {
                    goBack()
                    results ? resetSearchedMovies() : null
                }}>
                    <Image style={style.backIcon} source={require('../assets/back.png')} />
                </TouchableOpacity>
                <View style={[style.mainContainer, results ? {marginStart: 10} : {alignItems: 'center'}]}>
                    {title ? <Text style={style.searchText}>{title}</Text> : null}
                    {release ? <Text style={style.searchDesc}>{release}</Text> : null}
                    {results ? <Text style={style.searchText}>{results}</Text> : null}
                </View>
                <View style={style.searchIconContainer}/>
            </View> :
            <View style={style.headerContainer}>
                <Text style={style.headerTitle}>{strings.watch}</Text>
                <TouchableOpacity style={style.searchIconContainer} onPress={() => setShowSearch(true)}>
                    <Image style={style.searchIcon} source={require('../assets/search.png')} />
                </TouchableOpacity>
            </View>
            )}
        </View>
    )
};

const style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    main: {
        height: Platform.OS === 'android' ? 100 : 80,
    },
    header: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginHorizontal: 20,
    },
    backContainer: {
        flex: 1, 
        alignItems: 'center',
        flexDirection: 'row', 
        marginHorizontal: 20,
    },
    headerContainer: {
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexDirection: 'row',
        marginHorizontal: 30
    },
    headerTitle: {
        fontSize: 18, 
        color: colors.black, 
        fontWeight: '500'
    },
    searchIconContainer: {
        height: 32, 
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        height: 18, 
        width: 18
    },
    backIcon: {
        height: 28, 
        width: 28,
    },
    textInput: {
        backgroundColor: colors.both,
        height: 50, 
        width: Dimensions.get('window').width - 40, 
        borderRadius: 100,
        paddingHorizontal: 20
    },
    inputText: {
        color: colors.black
    },
    searchText: {
        fontSize: 18, 
        color: colors.black, 
        fontWeight: '500',
    },
    searchDesc: {
        fontSize: 14, 
        color: colors.lightBlue, 
    },
    crossIcon: {
        height: 20, 
        width: 20
    },
    inputIcon: {
        height: 18, 
        width: 18, 
        marginEnd: 10
    },
});