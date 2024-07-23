import { View, Text } from 'react-native'
import React from 'react'

export default function About({business}) {
  return (
    <View style={{
        backgroundColor:'#fff',
        padding:10,
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:22,
      }}>About</Text>

      <Text style={{
        fontFamily:'outfit'
      }}>{business?.about}</Text>
    </View>
  )
}