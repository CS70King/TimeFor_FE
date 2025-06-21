import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
          },
          default: {
            backgroundColor: '#fff',
          },
        }),
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#999',
      }}>
      <Tabs.Screen
        name="bank"
        options={{
          title: 'Bank',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'bank' : 'bank'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'credit-card' : 'credit-card-alt'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'users' : 'users'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'comments' : 'comments-o'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name={focused ? 'bell' : 'bell-o'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}