import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import { AccountStack } from './AccountStack';
import { UserStack } from './UserStack';
import { AddUserStack } from './AddUserStack';

const Tab = createBottomTabNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="account"
                tabBarOptions={{
                  inactiveTintColor: "#646464",
                  activeTintColor: "#F05C3C",
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
                  })}
            >
                <Tab.Screen 
                    name="account"
                    component={AccountStack}
                    options={{ title: "Account" }}
                />
                <Tab.Screen 
                    name="users"
                    component={UserStack}
                    options={{ title: "Users" }}
                />
                <Tab.Screen 
                    name="addUser"
                    component={AddUserStack}
                    options={{ title: "Add User" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case "users":
        iconName = "account-multiple";
        break;

      case "addUser":
        iconName = "plus-box-outline";
        break;

      case "account":
        iconName = "account-circle-outline";
        break;
  
      default:
        break;
    }
  
    return (
      <Icon type="material-community" name={iconName} size={35} color={color} />
    );
  };
