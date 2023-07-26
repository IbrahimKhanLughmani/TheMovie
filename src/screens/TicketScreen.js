import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, SafeAreaView, View, TouchableOpacity, Text, Dimensions, FlatList, Image} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import strings from '../../theme/strings';
import moment from 'moment';
import colors from '../../theme/colors';
import { Context } from '../context/Context';
import Toast from 'react-native-simple-toast';

const TicketScreen = ({navigation, route}) => {
    const {state, getHalls} = useContext(Context);
    const movie = route.params.movie;
    const [dates, setDates] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date().setHours(0, 0 ,0 ,0));
    const [selectedHall, setSelectedHall] = useState({id: null, name: null, time: null, seating: []});

    useEffect(() => {
        getHalls(selectedDate)

        const today = new Date()
        const dates = []
        const nextTwoMonths = new Date(today)
        nextTwoMonths.setMonth(today.getMonth() + 2)
        while (today < nextTwoMonths) {
          dates.push(new Date(today))
          today.setDate(today.getDate() + 1)
        }
        setDates(dates)
    }, [])

    return(
        <SafeAreaView style={style.main}>
            <ScreenHeader goBack={() => navigation.pop()} title={movie.title} release={`${strings.theaters} ${moment(movie.release_date).format('MMM DD, yyyy')}`} />
            <View style={style.screen}>
                <View>
                    <Text style={style.movieTitle}>{strings.date}</Text>
                    <FlatList
                        contentContainerStyle={style.flatlist}
                        showsHorizontalScrollIndicator={false}
                        data={dates}
                        horizontal
                        renderItem={({item}) => {
                            return(
                                <TouchableOpacity  
                                    style={style.stripContainer} 
                                    onPress={() => {
                                        setSelectedDate(new Date(item).setHours(0, 0, 0, 0))
                                    }}>
                                    <Text style={(selectedDate === new Date(item).setHours(0, 0, 0, 0)) ? style.buttonTitle : style.dates}>{moment(item).format('D MMM')}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
                <FlatList
                    data={state.halls}
                    contentContainerStyle={style.flatlist2}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({item}) => {
                        return(
                            <View style={style.botItem}>
                                <View style={style.timeContainer}>
                                    <Text style={style.time}>{moment(item.time).format('hh:mm')}</Text>
                                    <Text style={style.hall}>{item.hall}</Text>
                                </View>
                                <TouchableOpacity onPress={() => setSelectedHall({id: item.id, name: item.hall, cost: item.cost, time: moment(item.time).format('hh:mm'), seating: item.seating})}>
                                    <Image style={(selectedHall.id === item.id) ? style.selectedSeatsIcon : style.seatsIcon} source={require('../assets/seats.png')} />
                                </TouchableOpacity>
                                <View style={style.costContainer}>
                                    <Text style={style.hall}>{strings.from} </Text>
                                    <Text style={style.cost}>{item.cost}{strings.currency}</Text>
                                    <Text style={style.hall}> {strings.or} </Text>
                                    <Text style={style.cost}>{item.bonus} {strings.bonus}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={style.ticketButton} onPress={() => selectedHall.id ? navigation.navigate('TicketDetailScreen', {date: selectedDate, hall: selectedHall, title: movie.title, release: movie.release_date}) : Toast.show(strings.selectSeat)}>
                    <Text style={style.buttonTitle}>{strings.select}</Text>
                </TouchableOpacity>
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
        borderColor: colors.silver,
        paddingVertical: Dimensions.get('screen').height * 0.1
    },
    flatlist: {
        marginTop: 10,
        paddingStart: 20, 
        paddingEnd: 10
    },
    flatlist2: {
        marginTop: 50,
        paddingStart: 20, 
        paddingEnd: 10
    },
    stripContainer: {
        height: 40, 
        width: 70, 
        marginEnd: 10, 
        backgroundColor: colors.lightBlue, 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonContainer: {
        position: 'absolute', 
        justifyContent: 'center', 
        alignSelf: 'center', 
        bottom: 20
    },
    ticketButton: {
        height: 55, 
        width: Dimensions.get('window').width - 60,
        backgroundColor: colors.lightBlue, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10,
    },
    buttonTitle: {
        color: colors.white, 
        fontWeight: '500', 
        fontSize: 16,
    },
    dates: {
        color: colors.black, 
        fontWeight: '500', 
        fontSize: 16,
    },
    movieTitle: {
        color: colors.black, 
        fontWeight: '500', 
        fontSize: 16,
        marginStart: 20,
    },
    botItem: {
        marginEnd: 10
    },
    timeContainer: {
        flexDirection: 'row', 
        marginBottom: 5
    },
    seatsIcon: {
        height: 180, 
        width: 250, 
        borderRadius: 10
    },
    selectedSeatsIcon: {
        height: 180, 
        width: 250, 
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.lightBlue,
    },
    costContainer: {
        flexDirection: 'row', 
        marginTop: 5
    },
    time: {
        color: colors.black, 
        fontSize: 12,
        marginEnd: 10
    },
    hall: {
        color: colors.grey, 
        fontSize: 12,
    },
    cost: {
        color: colors.black, 
        fontSize: 12,
        fontWeight: 'bold',
    },
})

export default TicketScreen;