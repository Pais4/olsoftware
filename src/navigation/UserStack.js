import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import { UserScreen } from '../screens/UserScreen';
import { UserDetailScreen } from '../screens/UserDetailScreen';

const Stack = createStackNavigator();

export const UserStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="user"
                component={UserScreen}
                options={{ title: "Users" }}
            />
            <Stack.Screen 
                name="userDetail"
                component={UserDetailScreen}
                options={{ title: "User Detail" }}
            />
        </Stack.Navigator>
    )
}

