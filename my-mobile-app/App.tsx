import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import TodoListScreen from './screens/TodoListScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#16213e',
            borderTopColor: '#00d4ff',
            borderTopWidth: 1,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: '#00d4ff',
          tabBarInactiveTintColor: '#666',
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 4,
          },
        }}
      >
        <Tab.Screen
          name="TodoList"
          component={TodoListScreen}
          options={{
            tabBarLabel: '📝 Todos',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 24, color }}>📝</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

