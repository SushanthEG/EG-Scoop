import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';


import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SplashScreen from 'react-native-splash-screen';
// It’s used to hide the splash screen when the app starts.





const Stack = createNativeStackNavigator();


// App component. Inside it, the useEffect hook is used to hide the splash screen when the component mounts (i.e., when the app starts).
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

// This section defines the structure of your app.NavigationContainer to wrap the entire app, within it, there’s a stack navigator (Stack.Navigator). 
// The stack navigator contains three screens: TabNavigator, DetailsScreen, and PaymentScreen.
// The headerShown: false option hides the header bar for these screens.
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


