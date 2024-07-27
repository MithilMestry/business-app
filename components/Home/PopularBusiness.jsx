import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, doc, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import PopularBusinessCrad from './PopularBusinessCrad'

export default function PopularBusiness() {

  const [businessList,setBusinessList]=useState([]);
  const [loading,setLoading]=useState(false);
  useEffect (()=>{
    GetBusinessList();
  },[])

    const GetBusinessList=async()=>{
      setLoading(true);
      setBusinessList([]);
      const q=query(collection(db,'BusinessList'), limit(10));

      const querySnapshot=await getDocs(q);

      querySnapshot.forEach((doc)=>{
        // console.log(doc.data());

        setBusinessList(prev=>[...prev,{id:doc.id, ...doc.data()}])
      })
      setLoading(false);
    }

  return (
    <View>
       <View style={{padding:20, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
      }}>PopularBusiness</Text>

    <Text style={{
          marginTop:5,
          color:Colors.primary,
          fontFamily:'outfit'
      }}>View All</Text>
    </View>

    <FlatList 
    data={businessList}
    onRefresh={GetBusinessList}
    refreshing={loading}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    renderItem={({item,index})=>(
      <PopularBusinessCrad
      key={index}
      business={item}
      />
    )}
    />
    </View>
  )
}