import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CategoryItems({category,onCategoryPress}) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
        <View style={{
            padding:15,
            marginRight:15
        }}>
        <Image source={{uri:category.icon}} 
        style={{
            width:60,
            height:60,
            justifyContent:'center',
            alignItems:'center'

        }}
        />
       
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:12,
            textAlign:'center',
            marginTop:8

        }}>{category.name}</Text>
         </View>
    </TouchableOpacity>
  )
}