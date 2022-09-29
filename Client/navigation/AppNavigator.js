/*

Author: Brandon

    This uses React and Expo to create a navigation bar allowing users to go to the different screens in the screens folder

*/

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

/*

    Add All Screens Here

*/

import AboutScreen from '../screens/AboutScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import UserLoginScreen from '../screens/UserLoginScreen';
import UserProfileScreen from '../screens/UserProfileScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


//TODO Remove Create User Later
function StackNavigator(){
    return(
        <Tab.Navigator>
            <Stack.Screen
                name="Home"
                component={UserHomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{
                    headerShown: false
            }}
            />
        </Tab.Navigator>
    );
}
/*
Bug -> Icons not showing for some reason
*/
function AppNavigator(){
    return(
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={(route) => ({
                    tabBarIcon: () =>{
                        let iconName;
                        if(route.name=="User") {
                           iconName = "user"
                        }if(route.name=="About") {
                            iconName = "info"
                        }
                        return <Feather name={iconName} size={24} color="black" />
                    },
                    showIcon: true ,
                    headerShown: false,
                    headerBackTitleVisible: true
                })}  
            >
                <Tab.Screen
                    name="User"
                    component={StackNavigator}
                />
                <Tab.Screen
                    name="About"
                    component={AboutScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;