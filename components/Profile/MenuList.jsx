import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React, { useState } from 'react'
import {Colors} from './../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';

export default function MenuList() {

  const router=useRouter();
  const {signOut}=useAuth();

  onMenuClick=(item)=>{
    if(item.path=='logout')
      {
        signOut();
        return;
      }
      if(item.path=='share')
      {
        Share.share
        (
          {
            message:'Download The App '
          }
        )
        return;
      }
    router.push(item.path)
  }

    const menulist=[
        {
            id:1,
            name:'Add Business',
            icon:require('./../../assets/images/call.png'),
            path:'/business/add-business',
        },
        {
            id:2,
            name:'My Business',
            icon:require('./../../assets/images/call.png'),
            path:'/business/my-business',
        },
        {
            id:3,
            name:'Share App',
            icon:require('./../../assets/images/call.png'),
            path:'share',
        },
        {
            id:4,
            name:'Logout',
            icon:require('./../../assets/images/call.png'),
            path:'logout',
        },
    ]

  return (
    <View style={{
        marginTop:'20%'
    }}>
      <FlatList 
        data={menulist}
        renderItem={({item,index})=>(
            <TouchableOpacity
            onPress={()=>onMenuClick(item)}
            style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                gap:8,
                padding:10
            }}>
            <Image source={item.icon} 
            style={{
                width:50,
                height:50,
            }}
            />
            <Text style={{
                fontFamily:'outfit',
                fontSize:20
            }}>{item.name}</Text>
          </TouchableOpacity>
        )}
          
      />

      <Text style={{
        fontFamily:'outfit',
        textAlign:'center',
        color:Colors.gray,
        marginTop:'20%',
        fontSize:13
      }}>Developed By Mithil Mestry @2024</Text>
    </View>
  )
}