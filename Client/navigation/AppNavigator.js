/*

Author: Brandon & Tyler

    This uses React and Expo to create a navigation bar allowing users to go to the different screens in the screens folder

*/

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image} from 'react-native';

import UserHomeScreen from '../screens/UserHomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import SignupScreen from '../screens/SignupScreen';
import UserLoginScreen from '../screens/UserLoginScreen';
import EditUserProfileScreen from '../screens/EditUserProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const style =StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            _height: 10,
            get height() {
                return this._height;
            },
            set height(value) {
                this._height = value;
            },
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export function TabNavigator() {
    return (
        <Tab.Navigator 
        screenOptions={{
            tabBarShowLabel: false, 
            tabBarStyle: {
                position: 'absolute',
                bottom: 30,
                left: 40,
                right: 40,
                borderRadius: 35,
                height: '9%',
                backgroundColor: '#05998c',
                elevation: 50,
                borderTopWidth: 0, 
                }
            
    }}
>
        <Tab.Screen name="Home" component={UserHomeScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#FFFFFF' : '#000000', fontsize: 12}}
                        />
                        <Text
                            style={{color: focused ? '#FFFFFF' : '#000000', fontsize: 12}}>
                            Home
                        </Text>
                    </View>
                )
            }}
        />
        <Tab.Screen name="ChatScreen" component={ChatScreen}
             options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/comment-alt.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#FFFFFF' : '#000000', fontsize: 12}}
                        />
                        <Text
                            style={{color: focused ? '#FFFFFF' : '#000000', fontsize: 12}}>
                            Chat
                        </Text>
                    </View>
                )
            }}
        />
        <Tab.Screen name="UserProfile" component={UserProfileScreen}
             options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/user.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#FFFFFF' : '#000000', fontsize: 12}}
                        />
                        <Text
                            style={{color: focused ? '#FFFFFF' : '#000000', fontsize: 12}}>
                            Profile
                        </Text>
                    </View>
                )
            }}
        />
        </Tab.Navigator>
     );
  }

const AppNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={UserLoginScreen}
                                options={{
                                    headerShown: false,
                                    tabBarIcon: ({focused}) => (
                                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                            <Image
                                                source={require('../assets/user.png')}
                                                resizeMode='contain'
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    tintColor: focused ? '#FFFFFF' : '#000000', fontsize: 12}}
                                            />
                                            <Text
                                                style={{color: focused ? '#FFFFFF' : '#000000', fontsize: 12}}>
                                                Login
                                            </Text>
                                        </View>
                                    )
                                }}
                            />
                <Stack.Screen name="Signup" component={SignupScreen}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => (
                                <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                    <Image
                                        source={require('../assets/user.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused ? '#FFFFFF' : '#000000', fontsize: 12}}
                                    />
                                    <Text
                                        style={{color: focused ? '#FFFFFF' : '#000000', fontsize: 12}}>
                                        Signup
                                    </Text>
                                </View>
                            )
                        }}
                    />
                     <Stack.Screen name="EditUserProfile" component={EditUserProfileScreen}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({focused}) => (
                                <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                                    <Image
                                        source={require('../assets/user.png')}
                                        resizeMode='contain'
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused ? '#FFFFFF' : '#000000', fontsize: 12}}
                                    />
                                    <Text
                                        style={{color: focused ? '#FFFFFF' : '#000000', fontsize: 12}}>
                                        Edit profile
                                    </Text>
                                </View>
                            )
                        }}
                    />
             <Tab.Screen name="Home" component={TabNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image
                            source={require('../assets/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#FFFFFF' : '#000000', fontsize: 12}}
                        />
                        <Text
                            style={{color: focused ? '#FFFFFF' : '#000000', fontsize: 12}}>
                            Home
                        </Text>
                    </View>
                )
            }}
        />
        </Stack.Navigator>
    );
}

export default AppNavigator;