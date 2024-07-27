import { View, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function BusinessListCard({ business }) {

  const router=useRouter();

  return (
    <TouchableOpacity style={{
        padding:10,
        margin:10,
        borderRadius:9,
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
        gap:15,
        alignItems:'center'
    }}  onPress={()=> router.push('/businessdetail/'+business.id)} >
      <Image
        source={{ uri: business.imageUrl }} 
        style={{
          width: 100,
          height: 100,
          borderRadius:5,
        }}
        onError={() => console.error('Error loading image:', business.imageUrl)}
      />
      <View style={{
        flex:1,
        gap:5,
      }}>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:16,
        }}>{business.name}</Text>

        <Text style={{
          fontFamily:'outfit',
          color: Colors.gray
        }}>{business.address}</Text>


        <View style={{display:'flex', flexDirection:'row', gap:8,marginTop:8 }}>
            <Image source={require('./../../assets/images/star.png')}
             style={{
                width:20,
                height:20,
            }}/>
            <Text style={{fontFamily:'outfit',
                color:'black', fontSize:15,
            }}>4.5</Text>
        </View>
      </View>
      
    </TouchableOpacity>
  )
}
