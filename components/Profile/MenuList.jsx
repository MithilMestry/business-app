import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'

export default function MenuList() {

    const menulist=[
        {
            id:1,
            name:'Add Business',
            icon:require('./../../assets/images/call.png'),
            path:'',
        },
        {
            id:2,
            name:'My Business',
            icon:require('./../../assets/images/call.png'),
            path:'',
        },
        {
            id:3,
            name:'Share App',
            icon:require('./../../assets/images/call.png'),
            path:'',
        },
        {
            id:4,
            name:'Logout',
            icon:require('./../../assets/images/call.png'),
            path:'',
        },
    ]

  return (
    <View style={{
        marginTop:'20%'
    }}>
      <FlatList 
        data={menulist}
        renderItem={({item,index})=>(
            <View style={{
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
          </View>
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