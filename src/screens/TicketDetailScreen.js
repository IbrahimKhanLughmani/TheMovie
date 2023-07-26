import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Dimensions, Image, BackHandler, Alert} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import strings from '../../theme/strings';
import colors from '../../theme/colors';
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView';
import Toast from 'react-native-simple-toast';

const TicketDetailScreen = ({navigation, route}) => {
    const selectedDate = moment(route.params.date).format('MMM D, YYYY');
    const selectedHall = route.params.hall;
    const [seating] = useState(route.params.hall.seating)
    const [prevSeat, setPrevSeat] = useState({rowsIndex: null, rowIndex: null, seatIndex: null, seat: null})
    const [seat, setSeat] = useState({row: 0, seat: 0})

    useEffect(() => {
        let backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        })
    
        return () => {
          backHandler.remove()
        }
    }, [])

    return(
        <SafeAreaView style={style.main}>
            <ScreenHeader 
                goBack={() => {
                    navigation.pop()
                    if(prevSeat.seat != null){
                        seating[prevSeat.rowsIndex][prevSeat.rowIndex][prevSeat.seatIndex] = prevSeat.seat
                    }
                }} 
                title={route.params.title} 
                release={`${selectedDate} | ${selectedHall.time} ${selectedHall.name}`} 
            />
            <View style={style.screen}>
                <View style={style.seatingPlanContainer}>
                    <ReactNativeZoomableView
                        maxZoom={1.5}
                        minZoom={0.5}
                        zoomStep={0.5}
                        initialZoom={1}>
                        <Text style={style.screenText}>{strings.screen}</Text>
                        {seating.map((rows, rowsIndex) => (
                            <View key={rowsIndex} style={style.Row}>
                            {rows.map((row, rowIndex) => (
                                <View key={rowIndex} style={rowIndex + 1 === rows.length ? style.Row : style.Row2}>
                                {row.map((seat, seatIndex) => {
                                    if(seat === 0) {
                                        return (
                                            <TouchableOpacity 
                                                key={seatIndex} 
                                                onPress={() => {
                                                    // remove previous seat
                                                    if(prevSeat.seat != null){
                                                        seating[prevSeat.rowsIndex][prevSeat.rowIndex][prevSeat.seatIndex] = prevSeat.seat
                                                    }
                                                    // setting previous seat
                                                    setPrevSeat({rowsIndex, rowIndex, seatIndex, seat})
                                                    // adding new seat
                                                    seating[rowsIndex][rowIndex][seatIndex] = 3
                                                    // setting row and seat
                                                    const position = seating[rowsIndex][rowIndex].filter((element) => element !== -1);
                                                    setSeat({row: rowsIndex + 1, seat: (seatIndex - (seating[rowsIndex][rowIndex].length - position.length) + 1)})
                                                }}>
                                                <Image style={style.seat} source={require('../assets/movie-seat-2.png')} />
                                            </TouchableOpacity>
                                        )
                                    } 
                                    else if(seat === 1) {
                                        return (
                                            <Image key={seatIndex} style={style.seat} source={require('../assets/movie-seat-4.png')} />
                                        )
                                    }
                                    else if(seat === 2) {
                                        return (
                                            <TouchableOpacity 
                                                key={seatIndex} 
                                                onPress={() => {
                                                    // remove previous seat
                                                    if(prevSeat.seat != null){
                                                        seating[prevSeat.rowsIndex][prevSeat.rowIndex][prevSeat.seatIndex] = prevSeat.seat
                                                    }
                                                    // setting previous seat
                                                    setPrevSeat({rowsIndex, rowIndex, seatIndex, seat})
                                                    // adding new seat
                                                    seating[rowsIndex][rowIndex][seatIndex] = 3
                                                    // setting row and seat
                                                    const position = seating[rowsIndex][rowIndex].filter((element) => element !== -1);
                                                    setSeat({row: rowsIndex + 1, seat: (seatIndex - (seating[rowsIndex][rowIndex].length - position.length) + 1)})
                                                }}>
                                                <Image style={style.seat} source={require('../assets/movie-seat-3.png')} />
                                            </TouchableOpacity>
                                        )
                                    }
                                    else if(seat === 3) {
                                        return (
                                            <TouchableOpacity key={seatIndex}>
                                                <Image style={style.seat} source={require('../assets/movie-seat.png')} />
                                            </TouchableOpacity>
                                        )
                                    }
                                    else if(seat === -1) {
                                        return (
                                            <View key={seatIndex} style={style.seat} />
                                        )
                                    }
                                })}
                                </View>
                            ))}
                            </View>
                        ))}
                    </ReactNativeZoomableView>
                </View>
                <View style={style.seatContainer}>
                    <View style={style.seatSubContainer}>
                        <View style={style.seathalfContainer}>
                            <View style={style.seathalf}>
                                <Image style={style.movie} source={require('../assets/movie-seat.png')} />
                                <Text style={style.movieText}>{strings.selected}</Text>
                            </View>
                            <View style={style.seathalf}>
                                <Image style={style.movie} source={require('../assets/movie-seat-3.png')} />
                                <Text style={style.movieText}>{`${strings.vip} (150${strings.currency})`}</Text>
                            </View>
                        </View>
                        <View style={style.seathalfContainer}>
                            <View style={style.seathalf}>
                                <Image style={style.movie} source={require('../assets/movie-seat-4.png')} />
                                <Text style={style.movieText}>{'Not available'}</Text>
                            </View>
                            <View style={style.seathalf}>
                                <Image style={style.movie} source={require('../assets/movie-seat-2.png')} />
                                <Text style={style.movieText}>{`${strings.regular} (50${strings.currency})`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={style.rowContainer}>
                        <TouchableOpacity style={style.row} onPress={() => selectedHall.id ? navigation.navigate('TicketDetailScreen', {date: selectedDate, hall: selectedHall, title: movie.title, release: movie.release_date}) : Toast.show(strings.selectSeat)}>
                            <Text style={style.rowText}>{seat.seat}/</Text>
                            <Text style={style.price}>{seat.row} {strings.rows}</Text>
                            <TouchableOpacity>
                                <Image style={style.closeIcon} source={require('../assets/close.png')} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={style.buttonContainer}>
                    <TouchableOpacity style={style.costButton} onPress={() => selectedHall.id ? navigation.navigate('TicketDetailScreen', {date: selectedDate, hall: selectedHall, title: movie.title, release: movie.release_date}) : Toast.show(strings.selectSeat)}>
                        <Text style={style.price}>{strings.price}</Text>
                        <Text style={style.cost}>{prevSeat.seat === 0 ? 50 : prevSeat.seat === 2 ? 150 : 0}{strings.currency}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.payButton} onPress={() => {
                        if(prevSeat.seat != null){
                            Alert.alert(
                                strings.confirm,
                                `Do you want to pay ${prevSeat.seat === 0 ? 50 : prevSeat.seat === 2 ? 150 : 0}${strings.currency} for\nSeat: ${seat.seat}/${seat.row}\nHall: ${selectedHall.name}\nTime: ${selectedHall.time}`,
                                [
                                  {
                                    text: strings.reject,
                                    onPress: async () => {
                                      
                                    },
                                    style: 'cancel',
                                  },
                                  {
                                    text: strings.accept,
                                    onPress: async () => {
                                      
                                    },
                                    style: 'default',
                                  },
                                ],
                                {
                                  cancelable: true,
                                }
                            )
                        }
                        else{
                            Toast.show(strings.selectSeat)
                        }
                    }}>
                        <Text style={style.buttonTitle}>{strings.pay}</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};

const style = StyleSheet.create({
    main: {
      flex: 1,
    },
    Row: {
        flexDirection: 'row'
    },
    Row2: {
        flexDirection: 'row', 
        marginEnd: 15
    },
    screen: {
        flex: 1, 
        backgroundColor: colors.both, 
        borderTopWidth: 1, 
        borderColor: colors.silver,
    },
    seatingPlanContainer: {
        flex: 0.6, 
        backgroundColor: colors.both, 
        alignItems: 'center'
    },
    screenText: {
        alignSelf: 'center', 
        marginBottom: 15,
        color: colors.black
    },
    seatContainer: {
        flex: 0.4, 
        backgroundColor: colors.white
    },
    seatSubContainer: {
        flex: 0.4, 
        flexDirection: 'row',
        marginStart: 20,
        marginEnd: 20
    },
    seat: {
        height: 12, 
        width: 12, 
        margin: 2
    },
    seathalfContainer: {
        flex: 0.5, 
        justifyContent: 'center'
    },
    seathalf: {
        flexDirection: 'row', 
        lignItems: 'center', 
        marginVertical: 5
    },
    movie: {
        height: 20,
        width: 20,
        marginEnd: 10
    },
    movieText: {
        color: colors.grey, 
        fontWeight: 'bold'
    },
    rowContainer: {
        flex: 0.3,
        justifyContent: 'center', 
        marginStart: 20
    },
    row: {
        height: 32, 
        width: 100,
        backgroundColor: colors.silver, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10,
        flexDirection: 'row'
    },
    buttonContainer: {
        position: 'absolute', 
        justifyContent: 'center', 
        alignSelf: 'center', 
        bottom: 20,
        flexDirection: 'row'
    },
    costButton: {
        height: 55, 
        width: Dimensions.get('window').width * 0.35 - 25,
        backgroundColor: colors.silver, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10,
    },
    payButton: {
        height: 55, 
        width: Dimensions.get('window').width * 0.65 - 25,
        backgroundColor: colors.lightBlue, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10,
        marginStart: 10
    },
    buttonTitle: {
        color: colors.white, 
        fontWeight: '500', 
        fontSize: 16,
    },
    cost: {
        color: colors.black, 
        fontWeight: 'bold', 
        fontSize: 16,
    },
    price: {
        color: colors.black, 
        fontSize: 12,
    },
    closeIcon: {
        height: 12, 
        width: 12, 
        marginStart: 15
    },
    rowText: {
        color: colors.black, 
        fontSize: 14,
        fontWeight: '500'
    },
})

export default TicketDetailScreen;