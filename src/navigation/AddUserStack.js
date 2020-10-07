import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import { AddUserScreen } from '../screens/AddUserScreen';

const Stack = createStackNavigator();

export const AddUserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="addUser"
                component={AddUserScreen}
                options={{ title: "Add User" }}
            />
        </Stack.Navigator>
    )
}

