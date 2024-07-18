import { View, Text, Image  } from 'react-native'
import React from 'react'

export default function BusinessListCard({business}){
  return (
    <View>
      <Image source={{uri:business.imageUrl}}
      style={{
        width:120,
        height:120,
      }}
      />
    </View>
  )
}