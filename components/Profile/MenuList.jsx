import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React, { useState } from 'react'
import {Colors} from './../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';
import { MaterialIcons } from '@expo/vector-icons';

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
            message:'Download The App at https://www.youtube.com/ '
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
            icon:require('./../../assets/images/store.png'),
            path:'/business/add-business',
        },
        {
            id:2,
            name:'My Business',
            icon:require('./../../assets/images/my-business.png'),
            path:'/business/my-business',
        },
        {
            id:3,
            name:'Favourites',
            icon:require('./../../assets/images/love.png'),
            path:'/business/FavoritesScreen',
        },
        {
            id:4,
            name:'Share App',
            icon:require('./../../assets/images/share.png'),
            path:'share',
        },
        {
          id:5,
          name:'Logout',
          icon:require('./../../assets/images/logout.png'),
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
                gap:15,
                padding:15
            }}>
            <Image source={item.icon} 
            style={{
                width:40,
                height:40,
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