import { View, Text, Image, StyleSheet,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection , query, getDocs, doc } from 'firebase/firestore'
import {db} from './../../config/Config'


export default function Slider() {
  // const [sliderList,setSliderList]=useState([]);

  //   useEffect(()=>{
  //       GetSliderList();
  //   }, []);

  //   const GetSliderList=async()=>{
  //     setSliderList([]);
  //       const q=query(collection(db,'Slider'));
  //       const querySnapShot=await getDocs(q);

  //       querySnapShot.forEach((doc)=>{
  //           console.log(doc.data());
  //           setSliderList(prev=>[...prev,doc.data()])
  //       })
  //   }
  return (
    <View>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        padding:20,
      }}>#Special For You</Text>

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
        </ScrollView>

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