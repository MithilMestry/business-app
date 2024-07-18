import { View, Text, Image, StyleSheet,ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection , query, getDocs } from 'firebase/firestore'
import {db} from './../../config/FirebaseConfig'


export default function Slider() {
  const [sliderList,setSliderList]=useState([]);

    useEffect(()=>{
        GetSliderList();
    }, []);

    const GetSliderList=async()=>{
      setSliderList([]);
        const q=query(collection(db,'Slider'));
        const querySnapShot=await getDocs(q);

        querySnapShot.forEach((doc)=>{
            console.log(doc.data());
            setSliderList(prev=>[...prev,doc.data()]);
        })
    }
  return (
    <View>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        paddingLeft:20,
        paddingTop:20,
        marginBottom:-5
      }}>#Special For You</Text>

      <FlatList 
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        padding:20
      }}
      renderItem={({item,index})=>(
        <Image source={{uri:item.imageUrl}} 
        style={{
          width: 300,
          height: 150,
          borderRadius:15,
          marginRight: 20,
        }}
        />
      )}
      />
{/* 
<ScrollView horizontal={true}
             style={styles.scroll}
             showsHorizontalScrollIndicator={false}
             >
            <Image source={require('./../../assets/images/icon.png')} style={styles.image} />
            <Image source={require('./../../assets/images/icon.png')} style={styles.image} />
            <Image source={require('./../../assets/images/icon.png')} style={styles.image} />
            <Image source={require('./../../assets/images/icon.png')} style={styles.image} />
            <Image source={require('./../../assets/images/icon.png')} style={styles.image} />
            <Image source={require('./../../assets/images/icon.png')} style={styles.image} />
        </ScrollView> */}

    </View>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 160,
        marginLeft: 20,
        marginTop:0,
        borderRadius:8
    }
});