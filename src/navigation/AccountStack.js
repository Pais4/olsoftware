import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

const Stack = createStackNavigator();

export const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="login"
                component={LoginScreen}
                options={{ title: "Login" }}
            />
            <Stack.Screen 
                name="register"
                component={RegisterScreen}
                options={{ title: "Sign In" }}
            />
        </Stack.Navigator>
    )
}

