import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthScreen from '../screens/AuthScreen'
import ActiveWorkoutScreen from '../screens/ActiveWorkoutScreen'
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen'

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Main" component={ActiveWorkoutScreen} />
        <Stack.Screen name="History" component={WorkoutHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
