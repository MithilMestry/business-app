import { View, Text, Image,ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router';

export default function BusinessListCard({business}) {

    const router=useRouter();

    if (!business || !business.imageUrl) {
        return (
          <View>
            <Text>No business data available.</Text>
          </View>
        );
      }

      console.log('Image URL:', business.imageUrl);
  return (
    <TouchableOpacity onPress={()=>router.push('/businessdetail/'+business.id)}>
    <ScrollView 
    style={{
        backgroundColor:'#fff',
        borderRadius:15,
        marginTop:20,
    

    }}>
      <Image 
      source={{ uri: business.imageUrl }}
      style={{
        width:'100%',
        height:150,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
      }}
      />

      <View style={{
        padding:10,

      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20,
        }}>{business?.name}</Text>

        <Text style={{
            fontFamily:'outfit',
            color:Colors.gray
        }}>{business?.address}</Text>
      </View>
    </ScrollView>
    </TouchableOpacity>
  )
}

