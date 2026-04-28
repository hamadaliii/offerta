import { Tabs } from 'expo-router';
import React from 'react';
import { HomeIcon, SettingsIcon } from '../../src/components/Icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          position: 'absolute', 
          backgroundColor: '#0F172A', 
          elevation: 0, 
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.1)',
          height: 80,
          paddingBottom: 20
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <HomeIcon stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <SettingsIcon stroke={color} />,
        }}
      />
    </Tabs>
  );
}
