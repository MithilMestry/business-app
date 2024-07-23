import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'


export default function ActionButton({business}) {

    const actionButtonMenu=[
        {
            id:1,
            name:'Call',
            icon: require('./../../assets/images/call.png'),
            url:'tel:'+business?.contact
        },
        {
            id:2,
            name:'Location',
            icon: require('./../../assets/images/loction.png'),
            url:'geo:'+business?.address
        },
        {
            id:3,
            name:'Web',
            icon: require('./../../assets/images/web.png'),
            url:business?.website
        },
        {
            id:4,
            name:'Share',
            icon: require('./../../assets/images/share.png'),
            url: business?.website 
        },
    ]
  return (
    <View style={{
        backgroundColor:'#fff',
        padding:20,

    }}>
      <Text>ActionButton</Text>

<View>
      <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{justifyContent:'space-between'}}
        renderItem={({item,index})=>(
            <TouchableOpacity key={index}
            onPress={()=>Linking.openURL(item.url)}
            >
                <Image source={item?.icon}
                style={{
                    height:40,
                    width:40,
                }}
                />
                <Text style={{
                    fontFamily:'outfit',
                    textAlign:'center',
                    marginTop:5
                }}>{item.name}</Text>
            </TouchableOpacity>
        )}
      />
      </View>
    </View>
  )
}


