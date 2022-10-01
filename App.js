import React from 'react';
import {NavigationContainer}  from '@react-navigation/native';
import  {createNativeStackNavigator}  from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen'
import { StyleSheet } from 'react-native';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitle: 'Home'
          }}
        />  
      <Stack.Screen
          name="Todo"
          component={DetailsScreen}
          options={{
            title: 'Todo',
            headerTitle:'Todo'
          }}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
