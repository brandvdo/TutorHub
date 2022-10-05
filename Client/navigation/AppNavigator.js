/*

Author: Brandon & Tyler

    This uses React and Expo to create a navigation bar allowing users to go to the different screens in the screens folder

*/

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
/*

    Add All Screens Here

*/

const styles = StyleSheet.create({
    navbarStyle: {
        backgroundColor: '#05998c',
    }
});

import UserHomeScreen from '../screens/UserHomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
//TODO Remove Later
import CreateUserScreen from '../screens/CreateUserScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/*
Bug -> Icons not showing for some reason
*/
function AppNavigator(){
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Stack.Screen 
                    name="Home"
                    component={UserHomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="UserProfile"
                    component={UserProfileScreen}
                    options={{
                        headerShown: false
                }}
                />
                
                <Stack.Screen
                    name="AddUser"
                    component={CreateUserScreen}
                    options={{
                        headerShown: false
                }}
                />
        </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;