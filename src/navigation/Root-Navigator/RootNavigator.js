import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../containers/Login-Screen/LoginScreen';
import ChatScreen from '../../containers/Chat-Screen/ChatScreen';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="chat"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
          // options={{title: 'Login Page'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
