import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'
import Home from '../screens/Home/Home'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            tabBarIcon: () => <FontAwesome name='home' size={32} color='red' />
        }}
        />
        
    </Tab.Navigator>
  )
}