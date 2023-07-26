import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { Provider as HomeProvider } from './src/context/Context';
import { createStackNavigator } from '@react-navigation/stack';
import { TabStack } from './src/utils/TabStack';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import VideoControl from './src/screens/VideoControl';
import TicketScreen from './src/screens/TicketScreen';
import TicketDetailScreen from './src/screens/TicketDetailScreen';

const Stack = createStackNavigator();
export const NavigationContext = React.createContext();

export default () => {
  return(
    <HomeProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={() => ({
            headerShown: false,          
          })}>
          <Stack.Screen initialRouteName="TabStack" name="TabStack" component={TabStack} />
          <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
          <Stack.Screen name="VideoControl" component={VideoControl} />
          <Stack.Screen name="TicketScreen" component={TicketScreen} />
          <Stack.Screen name="TicketDetailScreen" component={TicketDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </HomeProvider>
  );
}
