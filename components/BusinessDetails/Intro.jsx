import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Intro({ business }) {

    const router=useRouter();
  // Check if business is defined and has an imageUrl property
  if (!business || !business.imageUrl) {
    return (
      <View>
        <Text>No business data available.</Text>
      </View>
    );
  }

  return (
    <View>
        <View style={{
            position:'absolute',
            zIndex:1,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:'100%',
            padding:25
        }}>
            <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="chevron-back-circle-sharp" size={34} color="black" />
            </TouchableOpacity>

        <Ionicons name="heart-outline" size={35} color="black" />
        </View>
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: '100%',
          height: 310,
        }}
      />
      <View style={{
            padding:20,
            marginTop:-20,
            backgroundColor:'#fff',
            borderTopRightRadius:25,
            borderTopLeftRadius:25,

      }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
      }}>{business.name}</Text>

      <Text style={{
        fontFamily:'outfit',
        fontSize:16,
      }}>{business.address}</Text>
      </View>
      
    </View>
  );
}
