import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function PopularBusinessCrad({business}) {

  const router=useRouter();

  return (
    <TouchableOpacity 
      onPress={()=>router.push("/businessdetail/"+business?.id)}    
    style={{
        marginLeft:20,
        padding:10,
        backgroundColor:Colors.primary,
        borderRadius:12,
    }}>
      <Image source={{uri:business?.imageUrl}}
      style={{width:200,
        height:130
      }}
      />

      <View style={{marginTop:8}}>
        <Text style={{
            fontFamily:'outfit',
            color:'#fff',
            fontSize:16
        }}>{business.name}</Text>

<Text style={{
            fontFamily:'outfit',
            color:'#D9D9D9',
            fontSize:14
        }}>{business.address}</Text>

        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{display:'flex', flexDirection:'row', gap:8,marginTop:8 }}>
            <Image source={require('./../../assets/images/star.png')}
             style={{
                width:20,
                height:20,
            }}/>
            <Text style={{fontFamily:'outfit',
                color:'#fff', fontSize:15,
                marginTop:2
            }}>4.5</Text>
        </View>

        <Text style={{fontFamily:'outfit',
            color:'#fff',
            padding:3,
            marginTop:8 
        }}>{business.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}