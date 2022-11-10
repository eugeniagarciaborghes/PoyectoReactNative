import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'
import Home from '../screens/Home/Home'
import Posts from '../screens/Posts/Posts'
import Perfil from '../screens/Perfil/Perfil'
import ProfileFriends from '../screens/ProfileFriends/ProfileFriends'

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
          name='New Post'
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
        <Tab.Screen
        name='Perfil de Amigos'
        component={ProfileFriends}
        options={{
            tabBarIcon: () => <FontAwesome name='user' size={32} color='black' />
        }}
        />
        
    </Tab.Navigator>
  )
}