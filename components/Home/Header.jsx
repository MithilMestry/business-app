import { View, Text, Image,TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import {Colors} from './../../constants/Colors'
import { AntDesign } from '@expo/vector-icons';


export default function header() {

    const {user}=useUser();

  return (
    <View style={{
        padding:20,
        paddingTop:40,
        backgroundColor:Colors.primary,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10
      }}>
        <Image source={{uri:user?.imageUrl}} 
        style={{
            width:45,
            height:45,
            borderRadius:99,}}
        />
        <View>
        <Text style={{
            color:'#fff'
        }}>Wellcome, </Text>
        <Text style={{
            fontSize:20,
            fontFamily:'outfit-medium',
            color:'#fff',
        }}>{user?.fullName}</Text>
        </View>
      </View>

      {/* search bar */}

      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:10,
        backgroundColor:'#fff',
        padding:10,
        borderRadius:8,
        marginVertical:10,
      }}>
      <AntDesign name="search1" size={24} color={Colors.primary} style={{marginRight:5}} />
      <TextInput placeholder='Search...' 
        style={{
            fontFamily:'outfit',
            fontSize:15,
            width:260
        }}
      ></TextInput>
      </View>
    </View>
  )
}