import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'
import Home from '../screens/Home/Home'
import Posts from '../screens/Posts/Posts'
import Perfil from '../screens/Perfil/Perfil'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            tabBarIcon: () => <FontAwesome name='home' size={32} color='black' />
        }}
        />
        <Tab.Screen
          name='Posts'
          component={Posts}
          options={{
            tabBarIcon: () => <FontAwesome name='image' size={32} color='black' />
          }}
          />
          <Tab.Screen
        name='Perfil'
        component={Perfil}
        options={{
            tabBarIcon: () => <FontAwesome name='user' size={32} color='black' />
        }}
        />
        
    </Tab.Navigator>
  )
}