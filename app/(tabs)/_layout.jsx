import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Colors } from './../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function TabLayout() {
  return (
   <Tabs screenOptions={{
    headerShown:false,
    tabBarActiveTintColor:Colors.primary

  }}>
     <Tabs.Screen name='home' 
     options={{
      tabBarLabel:'Home',
      tabBarIcon:({color})=><Entypo name="home" size={24} color={color}/>
     }}
     />

     <Tabs.Screen name='explore' options={{
      tabBarLabel:'Explore',
      tabBarIcon:({color})=><AntDesign name="search1" size={24} color={color} />
     }} />

     <Tabs.Screen name='profile' options={{
      tabBarLabel:'Profile',
      tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color} />
     }} />
   </Tabs>
  )
}
